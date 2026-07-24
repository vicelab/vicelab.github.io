#!/usr/bin/env python3
"""Validate the CSV-to-asset contracts used by the VICE Lab static site."""

from __future__ import annotations

import csv
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_SCHEMAS = {
    "news.csv": ["ID", "NAME", "AUTHOR", "DATE", "TEXT"],
    "projects.csv": ["ID", "NAME", "AUTHOR", "DATE", "TEXT", "TAGS", "LOCATION"],
    "people.csv": ["ID", "NAME", "TITLE", "EMAIL", "TWITTER", "GITHUB", "BIOGRAPHY"],
    "collaborators.csv": ["ID", "NAME", "AUTHOR", "LINK", "TEXT"],
    "publications.csv": ["ID", "NAME", "AUTHOR", "LINK", "CITATION", "ABSTRACT", "DATE", "TAGS", "LOCATION"],
}
SECTION_IDS = {"RESEARCHERS", "AFFILIATES", "ALUMNI", "READ MORE"}
SAFE_ID = re.compile(r"^[A-Za-z0-9][A-Za-z0-9-]*$")
errors: list[str] = []
warnings: list[str] = []
tables: dict[str, list[dict[str, str]]] = {}
tracked_result = subprocess.run(
    ["git", "ls-files", "-z"],
    cwd=ROOT,
    check=True,
    capture_output=True,
    text=True,
)
tracked_files = {path for path in tracked_result.stdout.split("\0") if path}


def error(message: str) -> None:
    errors.append(message)


def warn(message: str) -> None:
    warnings.append(message)


def authors(value: str) -> list[str]:
    return [author.strip() for author in (value or "").split(";") if author.strip()]


for filename, expected_header in CSV_SCHEMAS.items():
    path = ROOT / filename
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != expected_header:
            error(f"{filename}: expected header {expected_header}, found {reader.fieldnames}")
        rows = list(reader)
    tables[filename] = rows
    ids = [row.get("ID", "").strip() for row in rows]
    for duplicate, count in Counter(ids).items():
        if duplicate and count > 1:
            error(f"{filename}: duplicate ID {duplicate!r}")
    for line, row in enumerate(rows, 2):
        if row.get(None):
            error(f"{filename}:{line}: too many CSV columns")
        item_id = row.get("ID", "").strip()
        if not item_id:
            error(f"{filename}:{line}: missing ID")
        elif item_id not in SECTION_IDS and not SAFE_ID.fullmatch(item_id):
            error(f"{filename}:{line}: unsafe ID {item_id!r}")

for line, row in enumerate(tables["news.csv"], 2):
    expected = f"images/news/{row['ID']}.jpg"
    if expected not in tracked_files:
        error(f"news.csv:{line}: missing exact-case image {expected}")

for line, row in enumerate(tables["projects.csv"], 2):
    if row["ID"] == "READ MORE":
        continue
    candidates = [f"images/projects/{row['ID']}.jpg", f"images/projects/{row['ID']}.svg"]
    if not any(candidate in tracked_files for candidate in candidates):
        error(f"projects.csv:{line}: missing exact-case image; expected one of {candidates}")
    for author in authors(row.get("AUTHOR", "")):
        portrait = f"images/people/{author}.jpg"
        if portrait not in tracked_files:
            warn(f"projects.csv:{line}: missing portrait {portrait}; site will use no-picture.jpg")

for line, row in enumerate(tables["people.csv"], 2):
    if row["ID"] in SECTION_IDS:
        continue
    portrait = f"images/people/{row['ID']}.jpg"
    if portrait not in tracked_files:
        warn(f"people.csv:{line}: missing portrait {portrait}; site will use no-picture.jpg")

collaborator_image_aliases = {"josue-medellin": "josue-medellin-azuara"}
for line, row in enumerate(tables["collaborators.csv"], 2):
    author = row.get("AUTHOR", "").strip()
    if not author:
        continue
    image_id = collaborator_image_aliases.get(author, author)
    portrait = f"images/people/{image_id}.jpg"
    if portrait not in tracked_files:
        warn(f"collaborators.csv:{line}: missing portrait {portrait}; site will use no-picture.jpg")

if "images/people/no-picture.jpg" not in tracked_files:
    error("missing required fallback image images/people/no-picture.jpg")

for path in ROOT.rglob("*"):
    if (
        path.is_file()
        and path.relative_to(ROOT).as_posix() in tracked_files
        and path.stat().st_size > 2_000_000
    ):
        warn(f"large file ({path.stat().st_size / 1_000_000:.1f} MB): {path.relative_to(ROOT).as_posix()}")

for message in warnings:
    print(f"WARNING: {message}")
for message in errors:
    print(f"ERROR: {message}", file=sys.stderr)
print(f"Validated {sum(len(rows) for rows in tables.values())} CSV records: {len(errors)} error(s), {len(warnings)} warning(s).")
sys.exit(1 if errors else 0)