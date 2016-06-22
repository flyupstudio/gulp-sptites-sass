$(document).ready(function() {
	$('INPUT[type="text"]').autoClear();
	$('TEXTAREA').autoClear();
		
	if($("#slider-range-max").length>0) {
		$( "#slider-range-max" ).slider({
			range: "max",
			value:200,
			min: 0,
			max: 600,
			step: 100
		});	  
		//	$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
	}	
	
	if($("#slider-range-max2").length>0) {
		$( "#slider-range-max2" ).slider({
			range: "max",
			value:400,
			min: 0,
			max: 600,
			step: 100
		});	  
		//	$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
	}
	
	$('input[type="checkbox"], input[type="radio"], select').styler();
	
});
