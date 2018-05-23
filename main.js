/* @author Vikas Pulluri <vikasiiitn@gmail.com>
   @Date 05/19/2018
*/
/* I am using "browserify" to make NodeJs syntax work in the browser side. I can directly
	use node_modules libraries by directly opening a script tag in html and pointing to 
	respective CDN url. But each <script> tag open a connection to server, download the js
	file to browser context, then close the connection. And sometimes, time taken to open
	and close the connection will be more than actual file download and will end up in a
	low script loading. It is one of the reason for me to avoid many <script> tags in html.
	Also, i wanted to leverage the features of node_modules and some of the popular js libraries.
	Since, require() is NodeJs syntax and browser engines cannot interpret it, so I am 
	leverating the features of browserify which is lightweight and pretty easy to use.
*/

//Defining required libraries for the site
global.jQuery = require('jquery');
var $ = jQuery;
var slick = require('slick-carousel');
var scrollTo = require('jquery.scrollto');


//Function to initiate slick-carousel for professional skills section
var initiate_slick_carousel = () => {
	$('.projects-carousel').slick({
		infinite: true,
		dots: false,
		arrows: true,
		speed: 500,
		slidesToScroll: 1,
		slidesToShow: 1
	});
}

//Function to change the default config settings for scrollTo library
var config_scrollto_defaults = () => {
	$.extend($.scrollTo.defaults, {
	  axis: 'y',
	  duration: 1000
	});
}

//Function to highlight menu links depends upon section showing.
var highlight_menu_onscroll = () => {
	var lastId;
	let topMenu = $(".menu-items");
	let topMenuHeight = $('header').outerHeight(true);

	//getting the <a> tags in menu
	let menuItems = topMenu.find("li a");

	// creating an array of target section ids from menu links
	let scrollItems = menuItems.map(function () {
		let item = $($(this).data("target-id"));
		if (item.length) {
			return item;
		}
	});

	//While scrolling the page, need to check which section is in the visible portion
	$(window).scroll(function(){
		// Get container scroll position
		let fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		let current_id = scrollItems.map(function () {
			if ($(this).offset().top <= fromTop+3) return this;
		});
		// Get the id of the current element
		current_id = current_id[current_id.length - 1];
		let id = current_id && current_id.length ? current_id[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems.each(function(){
				$(this).data('target-id') == '#'+id ? $(this).addClass('active') : $(this).removeClass('active');
			});
		}
	});
}

/*Function to render the charts in programming skills section
	@param - container --- String indicates the div id
	@param - title     --- String indicates the title of chart
	@param - data  	   --- Array of objects containing the data points
*/
var render_chart = (container,title,data) => {
	let chartContainer = new CanvasJS.Chart(container, {
		animationEnabled: true,
		title: {
			text: title
		},
		width: 300,
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0.00\"%\"",
			indexLabel: "{label} {y}",
			dataPoints: data
		}]
	});

	chartContainer.render();
}

//Function to scroll the page to specified element
var scrollto = (element) => {
	$.scrollTo(element);
}

/*  * Function to calculate the experience of a candidate.
	* @params : {string} joiningDay
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

//Function to perform operations after the DOM is fully prepared
$(document).ready(function(){
	//Calling calculate_experience(arg) function and adding the return value to div with id='work-experience'
	$('#work-experience').text(calculate_experience("2016/07/28"));

	//Initiating toggle menu click events for mobile screens
	toggle_nav_menu();

	//Initiating slick carousel in professional skills section
	initiate_slick_carousel();

	//Changing the default configuration settings for scrollTo library
	config_scrollto_defaults();

	/*  Adding click event handler to header menu links
		By using scrollTo library, we can smooth-scroll the page to multiple sections in the page
		scrollTo function expects target section id or distance to scroll as argument to 
		smoothly scroll the page. Since header is fixed, top portion of target section will
		hide under it, so reducint the header height to make properly scroll. 
	*/
	$('.menu-item a').on('click',function(){
		let target_id = $(this).data('target-id');
		scrollto($(target_id).offset().top-jQuery('header').outerHeight(true));

	});

	//We need to highlight the menu link depends on which section is in visible part.
	highlight_menu_onscroll();


	//Using canvasJs to render the charts in programming skills section.
	let languagesData = [{y: 45, label: "JavaScript"},{y: 30, label: "PHP"},{y: 25, label: "Python"}];
	let frameworksData = [{y: 35, label: "jQuery"},{y: 25, label:"Drupal-8"},{y: 15, label: "Angular-5"},{y: 15, label: "Node js"},{y: 5, label: "Foundation-6"},{y: 5, label: "Express js"}];
	let databasesData = [{y: 50, label: "MongoDB"},{y: 50, label: "MySql"}];
	let additionalData = [{y: 20, label: "HTML"},{y: 20, label: "CSS"},{y: 20, label: "Sass"},{y: 15, label: "Gulp"},{y: 10, label: "Webpack"},{y: 15, label: "Git"}];
	render_chart('languages-container','Programming Languages',languagesData);
	render_chart('frameworks-container','Libraries/Frameworks',frameworksData);	
	render_chart('database-container','Databases',databasesData);
	render_chart('additional-container','Additional SKills',additionalData);

});