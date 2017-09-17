$(document).ready(function(){
	calculate_experience("2016/07/28");
	$('#work-experience').text(experienceInPercentage);
	toggle_tabs();
	toggle_accordian();
	toggle_nav_menu();
});
/*  * Function to calculate the experience of a candidate.
	* It will take string format of date as argument("yyyy/mm/dd") and will give experience in decimal value.
	* If the experience is of 11 months, it will give the value (11/12) to make it fit within the scale of 1 year and will display experience as 0.91 years
*/
var calculate_experience = function(joiningDay){
	var today = new Date();
	var startDay = new Date(joiningDay);
	var todayMonth = today.getMonth();
	var startMonth = startDay.getMonth()
	var todayDate = today.getDate();
	var startDate = startDay.getDate();
	var expYear = today.getFullYear() - startDay.getFullYear();

	if(todayMonth-startMonth > 0 || (todayMonth-startMonth == 0 && todayDate-startDate>0)){
		var expMonth = todayMonth-startMonth;
	}if(todayMonth-startMonth > 0 && todayDate<=startDate){
		expMonth--;
	}else if(todayMonth<startMonth ||(todayMonth==startMonth && todayDate<=startDate)){
		expYear--;
		if(todayMonth==startMonth){
			expMonth = 11 - startMonth + todayMonth;
		}else{
			expMonth = 12 - startMonth + todayMonth;
		}
	}
	experienceInPercentage = parseFloat(expYear + (expMonth/12)).toFixed(2);
};

// Function to toggle the tabs in professional skills section
var toggle_tabs = function(){
	$('.projects-tab li').on('click',function(){
		var cur = $(this);
		$('.projects-tab li').each(function(){
			$(this).removeClass('active');
			var divCont = $(this).attr('id').split(' ')[0];
			divCont += '-content';
			$('#'+divCont).removeClass('active');
		}); 
		if(!cur.hasClass('active')){
			cur.addClass('active')
		}
		var divCont = cur.attr('id').split(' ')[0];
		divCont += '-content';
		$('#'+divCont).addClass('active');
	});
}

// Function to display/hide the accordion in programming skills section
var toggle_accordian = function(){
	$('.accordion').each(function(){
		$(this).click(function(){
			$(this).toggleClass("active");
		    var panel = this.nextElementSibling;
		    if (panel.style.maxHeight){
		      panel.style.maxHeight = null;
		    } else {
		      panel.style.maxHeight = panel.scrollHeight + "px";
		    } 	
		});
	});
}

var toggle_nav_menu = function(){
	$('.menu-btn').click(function(){
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			$('nav.nav-desktop').attr("style","display : block !important");
		}else{
			$('nav.nav-desktop').attr("style","display : none !important");
		}
		$('nav.nav-desktop').on('click',function(){
			$('.menu-btn').removeClass('open');
			$(this).hide();
		});
	});
}