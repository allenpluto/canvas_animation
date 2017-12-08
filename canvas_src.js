$(document).ready(function(){
	var canvas = document.getElementById("body_canvas");
	var ctx = canvas.getContext("2d");
	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	var canvasSupported = !!window.HTMLCanvasElement;	// Check browser support
	
	var img = new Image();

	// IE8 and below does not support canvas, use image instead
	if (!canvasSupported)
	{
		$('.canvas_container').html('<img src="love-digital-agency-company-sydney.png" width="'+canvas_width+'" height="'+canvas_height+'" />');
		return false;
	}
	
	var status = 0;
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

	// Attach event listener
	$('#upload').change(function (e){
		status = 2;
		// The user might upload multiple files, we'll take the first
		var file = e.target.files[0];
	
		// Check that there is a file uploaded
		if(file){
			// We need to use a FileReader to actually read the file.
			var reader = new FileReader();
	
			// When it's loaded, we'll assign the read section to a variable (imgData);
			reader.onload = function(event){
				img.src = event.target.result;
			}
	
			// Pass the reader the file to read and give us the DataURL
			reader.readAsDataURL(file);
		}
	});
	
	// Init Spots Array
	ctx.drawImage(img, 0, 0);
	img.onload = function(){
        console.log($(img));
		ctx.drawImage(img,0,0); // Load Image on top left
		var canvas_width_units = canvas_width/spot_size;
		var canvas_height_units = canvas_height/spot_size;
		spots = [];
		spots_init = [];
		for (i=0;i<canvas_height_units;i++ )
		{
			for (j=0;j<canvas_width_units;j++ )
			{
				var pixelData = ctx.getImageData((j+0.5)*spot_size+(i*spot_row_offset)%spot_size, (i+0.5)*spot_size, 1, 1).data;
				//if ((pixelData[3] != 0) && (pixelData[0] != 255 || pixelData[1] != 255 || pixelData[2] != 255))
				if(pixelData[3] != 0)
				{
                    var spot_data = [(j+0.5)*spot_size+(i*spot_row_offset)%spot_size,(i+0.5)*spot_size,'rgba('+pixelData[0]+','+pixelData[1]+','+pixelData[2]+','+Math.round(pixelData[3]/255)+')'];
                    $('#source_points').append('<tr><td>'+pixelData[0]+'</td><td>'+pixelData[1]+'</td><td>'+pixelData[2]+'</td><td>'+pixelData[3]+'</td></tr>');
					spots_init.push(spot_data);
				}
			}
		}

		if(spots_init.length > 0)
		{
			spot_array_size = spots_init.length;
		}
		else
		{
			for(i=0;i<spot_array_size;i++)
			{
				spots_init[i] = new Array(Math.random()*canvas_width*0.9 + canvas_width*0.05, Math.random()*canvas_height*0.9 + canvas_height*0.05,'#000000');
			}
		}
		//console.log(spots_init);
		
		for(i=0;i<spot_array_size;i++)
		{
			spots[i] = new Array(spots_init[i][0], spots_init[i][1], spots_init[i][0], spots_init[i][1], Math.random()*canvas_width*0.9 + canvas_width*0.05, Math.random()*canvas_height*0.9 + canvas_height*0.05, 0, 0, spots_init[i][2]);
		}
		if(location.search.indexOf('debug=1')>-1) $('#body_info_display').html(display);
		
		status = 1;
		draw_canvas();
	};

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
	
		
	
	$(".canvas_container").mousemove(function(event) {
		if(status == 1)
		{
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
		}
			
		//$('#body_info_display').html('Page: '+page_coords+'<br>Client: '+client_coords+'<br>Speed: '+speed+'<br>Average Speed: '+average_speed+' '+(Math.log(average_speed)/Math.LN10+3)+'<br>Spot Position: '+spots+'<br>Spot Distance: '+Math.sqrt((spots[0][0]-page_coords[0])*(spots[0][0]-page_coords[0]) + (spots[0][1]-page_coords[1])*(spots[0][1]-page_coords[1]))+'');
	});
});
