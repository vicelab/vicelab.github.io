jQuery(document).ready(function($) {
  $('.sub-menu').prepend("<span class='sub-arrow'></span>");
})

jQuery(document).ready(function($) {

	$(document).bind( "mousedown", function(e){
    var container1 = $("#pp-advSearchArea");
	var container2 = $("#pp-advSearchMenu");
	var container3 = $(".flatpickr-calendar");

    if (!container1.is(e.target) // if the target of the click isn't the container...
        && container1.has(e.target).length === 0
		&& !container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0 // ... nor a descendant of the container
		&& !container3.is(e.target) // if the target of the click isn't the container...
        && container3.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container1.hide();
    }
});
})

jQuery(document).ready(function($){
	$("#pp-advSearchMenu").click(function () {
    	$( "#pp-advSearchArea" ).toggle();
		if ($("#searchForm input[name=SearchTerm]").val() != '') $("#pp-advSearchArea input[name=SearchTerm]").val($("#searchForm input[name=SearchTerm]").val());
		$("#searchForm input[name=SearchTerm]").val('');
	});
	
	
	$('#pp-advSearchArea input[type=radio][name=Dates]').change(function() {
        $("#pp-advSearchArea input[name=DateTo]").val('');
		$("#pp-advSearchArea input[name=DateFrom]").val('');
    });
	
	
	$("#advSearchForm").on("input", "#pp-advSearchArea  #advDateFrom", function(){
        $("#advSearchForm input[name=Dates][value=Custom]").prop('checked', true);
    });
	$("#advSearchForm").on("input", "#pp-advSearchArea #advDateTo", function(){
        $("#advSearchForm input[name=Dates][value=Custom]").prop('checked', true);
    });
	$("#pp-advClearAll").click(function () {
    	$("#pp-advSearchArea input:checkbox").prop('checked', false);
		$("#pp-advSearchArea input[name=Dates][value='']").prop('checked', true);
		$("#pp-advSearchArea input[name=DateTo]").val('');
		$("#pp-advSearchArea input[name=DateFrom]").val('');
		$("#pp-advSearchArea input[name=SearchTerm]").val('');
		$("#pp-advSearchArea input.flatpickr-input").val('');
	});
	$("#pp-advSubmit").click(function () {
    	$("#advSearchForm").submit();
	});
	
});




jQuery(document).ready(function($) {
	$('.box').mouseenter(function(){
			$('.caption').stop().animate({height: "90%"});
		
		
    });	
    
    $('.box').mouseleave(function(){
			$('.caption').stop().animate({height: "15%"},  1000, function() {
            });
		
    });
});
	
jQuery(function($) {
	$('#ppic-submenu').smartmenus({
	showTimeout: 0
	});
});

function fwp_redirect() {
    FWP.parse_facets();
    FWP.set_hash();
    var query = FWP.build_query_string();
    window.location.href = '/search/?' + query;
}

function set_checked() {
	var a = [];
    var cboxes = jQuery('input[name="content-type[]"]:checked');
    var len = cboxes.length;
    for (var i = 0; i < len; i++) {
      a[i] = cboxes[i].value;
    }
	if (typeof a !== 'undefined' && a.length > 0) {
		jQuery("#fwp_content-types").val(a);
	} else {
		jQuery("#fwp_content-types").prop('disabled', true);
	}

	var a2 = [];
    var cboxes2 = jQuery('input[name="topic[]"]:checked');
    var len2 = cboxes2.length;
    for (var i2 = 0; i2 < len2; i2++) {
      a2[i2] = cboxes2[i2].value;
    }
	if (typeof a2 !== 'undefined' && a2.length > 0) {
			jQuery("#fwp_topics").val(a2);
	}	else {
		jQuery("#fwp_topics").prop('disabled', true);
	}
	
	var today = new Date();
	
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var mp = today.getMonth(); //January is 0!
	
	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	}
	var stoday = yyyy+'-'+mm+'-'+dd;
	
	
	var lastmonth = new Date();
	lastmonth.setDate(lastmonth.getDate()-30);
	
	var dd1 = lastmonth.getDate();
	var mm1 = lastmonth.getMonth()+1; //January is 0!
	var yyyy1 = lastmonth.getFullYear();
	if(dd1<10){
		dd='0'+dd;
	} 
	if(mm1<10){
		mm1='0'+mm1;
	}
	var slastmonth = yyyy1+'-'+mm1+'-'+dd1;
	
	
	var last6month = new Date();
	last6month.setDate(last6month.getDate()-183);
	
	var dd2 = last6month.getDate();
	var mm2 = last6month.getMonth()+1; //January is 0!
	var yyyy2 = last6month.getFullYear();
	if(dd2<10){
		dd2='0'+dd2;
	} 
	if(mm2<10){
		mm2='0'+mm2;
	}
	var slast6month = yyyy2+'-'+mm2+'-'+dd2;
	
	
	var lastyear = new Date();
	lastyear.setDate(lastyear.getDate()-365);
	
	var dd3 = lastyear.getDate();
	var mm3 = lastyear.getMonth()+1; //January is 0!
	var yyyy3 = lastyear.getFullYear();
	if(dd3<10){
		dd3='0'+dd3;
	} 
	if(mm3<10){
		mm3='0'+mm3;
	}
	var slastyear = yyyy3+'-'+mm3+'-'+dd3;

	var dateval = jQuery('input[name="Dates"]:checked').val();
	
	if (dateval == 'LastMonth')  {
		jQuery("#fwp_date-range").val(slastmonth + ',' + stoday);
	}
	else if (dateval == 'Last6Months')  {
		jQuery("#fwp_date-range").val(slast6month + ',' + stoday);
	}
	else if (dateval == 'LastYear')  {
		jQuery("#fwp_date-range").val(slastyear + ',' + stoday);
	}
	else if (dateval == 'Custom')  {
		jQuery("#fwp_date-range").val(jQuery('#advDateFrom').val() + ',' + jQuery('#advDateTo').val());
	} else {
		jQuery("#fwp_date-range").prop('disabled', true);
	}
	
jQuery('input[name="Dates"]').prop('disabled', true);
jQuery('#advDateFrom').prop('disabled', true);
jQuery('#advDateTo').prop('disabled', true);
}

jQuery(document).ready(function($) {
	 var flatpickr_opts = {
            altInput: true,
            altInputClass: 'flatpickr-alt',
            altFormat: 'Y-m-d',
            disableMobile: true,
			onChange:  function(){
				$("#pp-advSearchArea input[name=Dates][value=Custom]").prop('checked', true);
            },
        };
  $("#advDateFrom").flatpickr(flatpickr_opts);
  $("#advDateTo").flatpickr(flatpickr_opts);
  

})


jQuery(document).ready(function($) {
$(window).load(function(){
var toggle_hash = window.location.hash;
if(window.location.hash) {
$( '.vc_toggle' + toggle_hash )
.removeClass('vc_toggle_active')
.addClass('vc_toggle_active')
}
});
})

jQuery(document).ready(function($) {
	$(".ppic-author-line-extra").hide();
	
	$(document).on('click', '.ppic-caret', function() {
   $(".ppic-author-line-extra").toggle();
   $(this).toggleClass('fa-angle-up fa-angle-down');
})
});

/*
var _gaq = _gaq || [];
  var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
  _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
  _gaq.push(['_setAccount', 'UA-5157468-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  */