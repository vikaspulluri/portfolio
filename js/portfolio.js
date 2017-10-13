/* @author Vikas Pulluri <vikasiiitn@gmail.com>
   @Date 10/13/2017
*/

//Function to perform operations after the DOM is fully prepared
$(document).ready(function(){
	//Calling calculate_experience(arg) function and adding the return value to div with id='work-experience'
	$('#work-experience').text(calculate_experience("2016/07/28"));
	
	//Initializing events(click) on project tabs
	toggle_tabs();

	//Initializing events(click) on programming skills project accordian
	toggle_accordian();

	//Initializing events(click) on nav menu for mobile screens
	toggle_nav_menu();
});
/*  * Function to calculate the experience of a candidate.
	* @params : {string} joiningDay
	*
	* @variable : {date object} today
	* @variable : {date object} startDay
	* @variable : {int} startMonth
	* @variable : {int} todayDate
	* @variable : {int} startDate
	* @variable : {int} todayMonth
	* @variable : {int} expYear 
	*
	* @return {float}
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
	return parseFloat(expYear + (expMonth/12)).toFixed(2);
};

/*  Function to toggle the tabs in professional skills section
	* @params - {}
	*
	* @variable - {object} cur
	* @variable - {string} divCont
	*
	* @return	- {}
*/
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

/*  Function to display/hide the accordion in programming skills section
	* @params  - {}
	*
	* @variable - {object} panel
	*
	* @return -	{}
*/
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
/*	Function for toggle nav bar menu in mobile screens.
	* @params	- {}
	* @variables	- {}
	* @return	- {}
*/
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