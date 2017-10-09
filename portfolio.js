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
	* @arguments : String formatted date. It will take string format of date as argument("yyyy/mm/dd")
	* @variables : 
		- today 	 =	Date object for present date
		- startDay   =	Date object for joining date
		- startMonth =  int value holds starting month
		- todayDate  =  int value holds present day
		- startDate  =  int value holds starting day
		- todayMonth =  int value holds present month
		- expYear	 =  int value holds expereince years
	* @return float value
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
	@arguments - no arguments
	@variables -
		- cur 	= 	click event object
		- divCont 	= 	 string for holding the 'cur' id
	@return	- no return value
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
	@arguments  - no arguments
	@variables	-
		- panel	=	object for holding the html element
	@return 	- 	no return value
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
	@arguments	- 	no arguments
	@variables	-	no variables
	@return		-	no return value
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