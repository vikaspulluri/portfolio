/* @author Vikas Pulluri <vikasiiitn@gmail.com>
   @Date 10/13/2017
*/

global.jQuery = require('jquery');
var $ = jQuery;
var slick = require('slick-carousel');
var scrollTo = require('jquery.scrollto');


//Function to perform operations after the DOM is fully prepared
$(document).ready(function(){
	//Calling calculate_experience(arg) function and adding the return value to div with id='work-experience'
	$('#work-experience').text(calculate_experience("2016/07/28"));

	toggle_nav_menu();
	
	$('.projects-carousel').slick({
		infinite: true,
		dots: false,
		arrows: true,
		speed: 500,
		slidesToScroll: 1,
		slidesToShow: 1
	});

	$.extend($.scrollTo.defaults, {
	  axis: 'y',
	  duration: 1000
	});

	$('.menu-item a').on('click',function(){
		let target_id = $(this).data('target-id');
		scrollto($(target_id).offset().top-jQuery('header').outerHeight(true));

	});

	var lastId,
	    topMenu = $(".menu-items"),
	    topMenuHeight = $('header').outerHeight(true),

	// All list items
	menuItems = topMenu.find("li a"),

	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function () {
		var item = $($(this).data("target-id"));
		if (item.length) {
			return item;
		}
	});

	$(window).scroll(function(){
		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function () {
			if ($(this).offset().top <= fromTop+3) return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems.each(function(){
				$(this).data('target-id') == '#'+id ? $(this).addClass('active') : $(this).removeClass('active');
			});
		}
	});

	var languagesChart = new CanvasJS.Chart("languages-container", {
		animationEnabled: true,
		title: {
			text: "Programming Languages"
		},
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0.00\"%\"",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: 45, label: "JavaScript"},
				{y: 30, label: "PHP"},
				{y: 25, label: "Python"}
			]
		}],
		width: 320
	});

	var frameworksChart = new CanvasJS.Chart("frameworks-container", {
		animationEnabled: true,
		title: {
			text: "Libraries/Frameworks"
		},
		width: 320,
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0.00\"%\"",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: 40, label: "jQuery"},
				{y: 20, label: "Angular-5"},
				{y: 20, label: "Node js"},
				{y: 10, label: "Foundation-6"},
				{y: 10, label: "Express js"}
			]
		}]
	});

	var databaseContainer = new CanvasJS.Chart("database-container", {
		animationEnabled: true,
		title: {
			text: "Databases"
		},
		width: 320,
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0.00\"%\"",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: 50, label: "MongoDB"},
				{y: 50, label: "MySql"}
			]
		}]
	});

	var additionalContainer = new CanvasJS.Chart("additional-container", {
		animationEnabled: true,
		title: {
			text: "Additional Skills"
		},
		width: 320,
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0.00\"%\"",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: 20, label: "HTML"},
				{y: 20, label: "CSS"},
				{y: 20, label: "Sass"},
				{y: 15, label: "Gulp"},
				{y: 10, label: "Webpack"},
				{y: 15, label: "Git"}
			]
		}]
	});

	languagesChart.render();

	frameworksChart.render();

	databaseContainer.render();

	additionalContainer.render();
});

var scrollto = (element) => {
	$.scrollTo(element);
}
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