$(document).ready(function(){
	var canvas = document.getElementById("body_canvas");
	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	var ctx = canvas.getContext("2d");
	
	if(canvas && ctx)
	{
		console.log("Canvas Initialized");
	}
	else
	{
		alert("Canvas not supported");
	}	
	
	var spots_init = new Array();		// Random Points Array Now, should be predefinedin future
	var spots = new Array();		// Spots Array (original_position_x, original_position_y, static_position_x, static_position_y, current_position_x, current_position_y, speed_x, speed_y, fillStyle)
	var mouse_radius = 100;
	var spot_radius = 5;
	var spot_gap = 0;
	var spot_size = spot_radius*2 + spot_gap;
	var spot_array_size = 100;		// Array Size will be changed if image load successfully
	var spot_row_offset = 0;
	if(spot_row_offset < 0)
	{
		spot_row_offset += spot_size;
	}
	spot_row_offset = spot_row_offset%spot_size;
	var img = new Image();
	img.src = 'images/love-sydney-digital-agency-company.png';


	var start_time = new Date();
	var end_time = new Date();
	var time_difference = 0;
	var start_time_2 = new Date();
	var end_time_2 = new Date();
	var time_difference_2 = 0;
	var start_page_coords = Array(0,0);
	var page_coords = Array(0,0);
	var speed = 0;
	var speed_steps = 10;
	var speed_constant_hit = 0.5;
	var speed_constant_gravity = 0.005;
	var speed_constant_friction = 0.9;
	var previous_speed = new Array();
	var speed_count = 0;
	var average_speed = 0;
	var display = "";

	// Init Spots Array
	spots_init.push(new Array(95, 105, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 105, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 105, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 105, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 105, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 105, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(85, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 115, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(75, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(85, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(215, 125, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(295, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(305, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(315, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(485, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(495, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(615, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(625, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(635, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(685, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(695, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(705, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 125, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(75, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(85, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(215, 135, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(295, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(305, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(315, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(485, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(495, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(615, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(625, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(635, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(685, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(695, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(705, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 135, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(75, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(85, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(215, 145, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(295, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(305, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(315, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(485, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(495, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(615, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(625, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(635, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(685, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(695, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(705, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 145, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(75, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(85, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(215, 155, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(365, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 155, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(75, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(85, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(215, 165, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(365, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(435, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 165, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(75, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(85, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(215, 175, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(365, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(435, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(735, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(805, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 175, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(85, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 185, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(365, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(435, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(735, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(805, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 185, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(85, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(95, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(205, 195, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(365, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(435, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(735, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(805, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 195, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(95, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(105, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(195, 205, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(365, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(725, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(735, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(805, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(815, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 205, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(105, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(115, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(185, 215, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(295, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(305, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(315, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(355, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(445, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(485, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(495, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(725, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(735, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(755, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(765, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(775, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(785, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(805, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(815, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(885, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(895, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(905, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(915, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(925, 215, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(115, 225, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(125, 225, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 225, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 225, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 225, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 225, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(175, 225, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(295, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(305, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(315, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(345, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(455, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(485, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(495, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(515, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(725, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(735, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(805, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(815, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(885, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(895, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(905, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(915, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(925, 225, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(125, 235, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(135, 235, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 235, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 235, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(165, 235, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(265, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(275, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(285, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(295, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(305, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(315, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(325, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(335, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(385, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(395, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(405, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(415, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(465, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(475, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(485, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(495, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(505, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(525, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(535, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(565, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(575, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(585, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(595, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(645, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(655, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(665, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(675, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(715, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(725, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(735, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(745, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(795, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(805, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(815, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(825, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(845, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(855, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(865, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(875, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(885, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(895, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(905, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(915, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(925, 235, 'rgba(0,0,0,1)'));
	spots_init.push(new Array(135, 245, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 245, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(155, 245, 'rgba(204,0,0,1)'));
	spots_init.push(new Array(145, 255, 'rgba(204,0,0,1)'));

	spot_array_size = spots_init.length;

	for(i=0;i<spot_array_size;i++)
	{
		spots[i] = new Array(spots_init[i][0], spots_init[i][1], spots_init[i][0], spots_init[i][1], Math.random()*canvas_width*0.9 + canvas_width*0.05, Math.random()*canvas_height*0.9 + canvas_height*0.05, 0, 0, spots_init[i][2]);
	}
	
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	function draw_canvas()
	{
		end_time = new Date();
		time_difference = end_time - start_time;
		start_time = end_time;
		
		ctx.clearRect(0, 0, canvas_width, canvas_height);
		ctx.font = "bold "+spot_radius*4+"px Arial";
		for(i=0;i<spot_array_size;i++)
		{
			// Change Current Position according to velocity (speed)
			if(((spots[i][4]-spots[i][2])*(spots[i][4]-spots[i][2]) + (spots[i][5]-spots[i][3])*(spots[i][5]-spots[i][2])) < 1 && (spots[i][6]*spots[i][6] + spots[i][7]*spots[i][7]) < 0.1 )
			{
				spots[i][4] = spots[i][2];
				spots[i][5] = spots[i][3];
				spots[i][6] = 0;
				spots[i][7] = 0;				
			}
			else
			{				
				spots[i][4] = spots[i][4] + spots[i][6];			
				spots[i][5] = spots[i][5] + spots[i][7];
			}

			// Fix spot to static statue if error happens
			if(isNaN(spots[i][4]))
			{
				spots[i][4] = canvas_width*(Math.round(Math.random()));
				spots[i][6] = 0;
			}
			if(isNaN(spots[i][5]))
			{
				spots[i][5] = canvas_height*(Math.round(Math.random()));
				spots[i][7] = 0;				
			}

			// Change Speed if spot inside cursor circle
			k = Math.sqrt(((spots[i][4]-page_coords[0])*(spots[i][4]-page_coords[0]) + (spots[i][5]-page_coords[1])*(spots[i][5]-page_coords[1])) / ((mouse_radius+spot_radius)*(mouse_radius+spot_radius)));
			if( k < 1 ) // Hit Happens for Spot i
			{
				// Set Speed
				spots[i][6] = spots[i][6] + speed_constant_hit*(1-k)/k * (spots[i][4] - page_coords[0]);
				spots[i][7] = spots[i][7] + speed_constant_hit*(1-k)/k * (spots[i][5] - page_coords[1]);
				
			}
				
			// Change Speed according to current position
			spots[i][6] += speed_constant_gravity*(spots[i][2]-spots[i][4]);
			spots[i][7] += speed_constant_gravity*(spots[i][3]-spots[i][5]);

			// Change Speed according to ground friction
			if(spots[i][6]*spots[i][6] + spots[i][7]*spots[i][7] > 0.01)
			{
				spots[i][6] *= speed_constant_friction;
				spots[i][7] *= speed_constant_friction;
			}
			
			
			// Draw spot
			ctx.beginPath();
			ctx.fillStyle = spots[i][8];
			ctx.fillText("+",spots[i][4],spots[i][5]);
			//ctx.arc(spots[i][4],spots[i][5],spot_radius,0,2*Math.PI);			
			ctx.fill();
		}
		/*ctx.beginPath();
		ctx.arc(page_coords[0],page_coords[1],mouse_radius,0,2*Math.PI);
		ctx.stroke();*/
		
		
		
		requestAnimFrame(function() {
			draw_canvas();
		});
	}
	
	draw_canvas();		
	
	$(".canvas_container").mousemove(function(event) {
		page_coords = Array(event.pageX - $("#body_canvas").offset().left, event.pageY - $("#body_canvas").offset().top);
		client_coords = Array(event.clientX, event.clientY);
		end_time_2 = new Date();
		time_difference_2 = end_time_2 - start_time_2;
		distance_difference = Math.sqrt((page_coords[0]-start_page_coords[0])*(page_coords[0]-start_page_coords[0]) + (page_coords[1]-start_page_coords[1])*(page_coords[1]-start_page_coords[1]));
		speed = distance_difference / time_difference_2;
		if(!isNaN(speed))
		{			
			start_time_2 = end_time_2;
			start_page_coords = page_coords;
			
			speed_count++;
			if(speed_count >= speed_steps)
			{
				speed_count -= speed_steps;
			}
			
			previous_speed[speed_count] = speed;
			
			average_speed = 0;
			for(i=0;i<speed_steps;i++)
			{
				average_speed += previous_speed[i];
			}
			average_speed = average_speed / speed_steps;
			
			// Check Spot Hit
			for(i=0;i<spot_array_size;i++)
			{
				/*k = Math.sqrt(((spots[i][4]-page_coords[0])*(spots[i][4]-page_coords[0]) + (spots[i][5]-page_coords[1])*(spots[i][5]-page_coords[1])) / ((mouse_radius+spot_radius)*(mouse_radius+spot_radius)));
				if( k < 1 ) // Hit Happens for Spot i
				{
					// Set Speed
					spots[i][6] = spots[i][6] + (1-k)/k * (spots[i][4] - page_coords[0]);
					spots[i][7] = spots[i][7] + (1-k)/k * (spots[i][5] - page_coords[1]);
					
				}*/
				
				k1 = Math.sqrt(((spots[i][0]-page_coords[0])*(spots[i][0]-page_coords[0]) + (spots[i][1]-page_coords[1])*(spots[i][1]-page_coords[1])) / ((mouse_radius+spot_radius)*(mouse_radius+spot_radius)));
				if( k1 < 1 ) // Change Static Position
				{
					// Set Static Position
					spots[i][2] = (spots[i][0] - page_coords[0])/k1 + page_coords[0];
					spots[i][3] = (spots[i][1] - page_coords[1])/k1 + page_coords[1];
					
				}
				else
				{
					spots[i][2] = spots[i][0];
					spots[i][3] = spots[i][1];
				}
			}
		}
		else
		{
			javascript: console.log(Array(time_difference_2, distance_difference, speed));
		}
			
		//$('#body_info_display').html('Page: '+page_coords+'<br>Client: '+client_coords+'<br>Speed: '+speed+'<br>Average Speed: '+average_speed+' '+(Math.log(average_speed)/Math.LN10+3)+'<br>Spot Position: '+spots+'<br>Spot Distance: '+Math.sqrt((spots[0][0]-page_coords[0])*(spots[0][0]-page_coords[0]) + (spots[0][1]-page_coords[1])*(spots[0][1]-page_coords[1]))+'');
	});
});
