<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 8/12/2017
 * Time: 9:43 AM
 */
$dbLocation = 'mysql:dbname=canvas_animation;host=localhost';
$dbUser = 'root';
$dbPass = '';
$db = new PDO($dbLocation, $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'utf8\''));

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    switch ($_POST['method'])
    {
        case 'submit_canvas':
            $tbl_canvas_fields = ['name','width','height','spot_radius','spot_gap','spot_text','mouse_radius'];
            break;
        case 'get_spots':
            break;
    }
    exit;
}

$sql = 'SELECT * FROM tbl_entity_canvas';

$query = $db->prepare($sql);
$query->execute();
$canvas_fetch = $query->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Canvas Animation Constructor</title>
    <script src="jquery-1.9.1.min.js" type="application/javascript"></script>
    <style>
        body {display:block;width:100%;height:100%;}
        .clear {clear: both;}
        .source_image_container,
        .canvas_container
        {display:inline-block;margin:0 1em 1em 0;background:#ffffff;border:2px solid #cccccc;}
        .edit_mode canvas {cursor: pointer;}
        #body_info_display {display:block;width:1000px;min-height:50px;margin:0 auto;}
        .input_row_container {display: block;padding: 5px 0;}
        .input_row_container label {display:inline-block;width:200px;padding-right: 10px;}
        .form_container,
        .point_editor_container {display: inline-block; padding: 0 10px; vertical-align: top;}
        .hidden_container {display: none;}
    </style>
</head>

<body>
<div class="source_image_container"></div>
<div class="canvas_container"></div>
<div class="clear"></div>
<div class="form_container">
    <form action="" method="post">
        <input type="hidden" id="canvas_id" name="id" value="">
        <div class="input_row_container">
            <label for="canvas_name">Canvas Name</label><input type="text" id="canvas_name" name="name" placeholder="Canvas Name" value="">
        </div>
        <div class="input_row_container">
            <label for="spot_radius">Spot Radius</label><input type="text" id="spot_radius" name="spot_radius" placeholder="Spot Radius" value="5">
        </div>
        <div class="input_row_container">
            <label for="spot_gap">Spot Gap</label><input type="text" id="spot_gap" name="spot_gap" placeholder="Spot Gap" value="0">
        </div>
        <div class="input_row_container">
            <label for="spot_text">Spot Text</label><input type="text" id="spot_text" name="spot_text" placeholder="Spot Text" value="+">
        </div>
        <div class="input_row_container">
            <label for="mouse_radius">Mouse Radius</label><input type="text" id="mouse_radius" name="mouse_radius" placeholder="Mouse Radius" value="100">
        </div>
        <div class="input_row_container">
            <label for="transfer_transparent">Transfer Half Transparent Points</label><input type="checkbox" id="transfer_transparent" name="transfer_transparent" value="1" checked>
        </div>
    </form>
    <div class="input_row_container">
        <label for="edit_mode">Edit Mode</label><input type="checkbox" id="edit_mode" checked>
    </div>
    <div class="input_row_container">
        <input type='file' id='upload'>
    </div>
</div>
<div class="point_editor_container hidden_container">
    <div class="input_row_container">
        <label for="point_opacity">Opacity (0 to remove point)</label><input type="text" id="point_opacity" placeholder="Point Opacity" value="1">
    </div>
    <div class="input_row_container">
        <label for="point_x">X</label><input type="text" id="point_x" placeholder="Point Location X" value="">
    </div>
    <div class="input_row_container">
        <label for="point_y">Y</label><input type="text" id="point_y" placeholder="Point Location Y" value="">
    </div>
    <div class="input_row_container">
        <label for="point_r">R</label><input type="text" id="point_r" placeholder="Point Color Red" value="">
    </div>
    <div class="input_row_container">
        <label for="point_g">G</label><input type="text" id="point_g" placeholder="Point Color Green" value="">
    </div>
    <div class="input_row_container">
        <label for="point_b">B</label><input type="text" id="point_b" placeholder="Point Color Blue" value="">
    </div>
    <div class="input_row_container">
        <input type="button" id="point_submit" value="Submit Changes">
    </div>
</div>
<div id="body_info_display">
    <table id="source_points"></table>
</div>
<script type="application/javascript">
    $(document).ready(function(){
        var canvasSupported = !!window.HTMLCanvasElement;	// Check browser support

        var canvas;
        var ctx;
        var canvas_width;
        var canvas_height;
        var img = new Image();

        // IE8 and below does not support canvas, use image instead
        if (!canvasSupported)
        {
            $('.canvas_container').html('Canvas is not supported by this browser');
            return false;
        }

        var status = 0;
        $('#edit_mode').on('change',function(){
            if($('#edit_mode').prop('checked'))
            {
                status = 2;
                $('.canvas_container').addClass('edit_mode');
            }
            else
            {
                status = 1;
                $('.canvas_container').removeClass('edit_mode');
                $('.point_editor_container').addClass('hidden_container');
            }
        });
        var spots_init = new Array();		// Random Points Array Now, should be predefinedin future
        var spots = new Array();		// Spots Array (original_position_x, original_position_y, static_position_x, static_position_y, current_position_x, current_position_y, speed_x, speed_y, fillStyle)
        var mouse_radius = parseFloat($('#mouse_radius').val());
        $('#mouse_radius').on('change',function(){
            mouse_radius = parseFloat($(this).val());
        });
        var spot_radius = parseFloat($('#spot_radius').val());
        var spot_gap = parseFloat($('#spot_gap').val());;
        var spot_size = spot_radius*2 + spot_gap;
        $('#spot_radius').on('change',function(){
            spot_radius = parseFloat($(this).val());
            $('.canvas_container').trigger('generate_animation');
        });
        $('#spot_gap').on('change',function(){
            spot_gap = parseFloat($(this).val());
            $('.canvas_container').trigger('generate_animation');
        });
        var spot_text = String($('#spot_text').val());
        $('#spot_text').on('change',function(){
            spot_text = String($(this).val());
        });
        var spot_array_size = 100;		// Array Size will be changed if image load successfully
        var spot_row_offset = 0;
//        if(spot_row_offset < 0)
//        {
//            spot_row_offset += spot_size;
//        }
//        spot_row_offset = spot_row_offset%spot_size;
        var image_width_max = 1200;
        var image_width_min = 300;

        var edit_point_index;
        var edit_point;

        // Attach event listener
        $('#upload').change(function (e){
            // The user might upload multiple files, we'll take the first
            var file = e.target.files[0];

            // Check that there is a file uploaded
            if(file){
                // We need to use a FileReader to actually read the file.
                var reader = new FileReader();

                // When it's loaded, we'll assign the read section to a variable (imgData);
                reader.onload = function(event){
                    img.src = event.target.result;
                    $('.source_image_container').html('');
                    $('.source_image_container').append(img);
                }

                // Pass the reader the file to read and give us the DataURL
                reader.readAsDataURL(file);
            }
        });

        // Init Spots Array
        img.onload = function(){
            $('.canvas_container').trigger('generate_animation');
        };

        $('.canvas_container').on('generate_animation',function(event){
            var image_width = $(img).width();
            var image_height = $(img).height();
            if (!image_height)
            {
                return false;
            }
            var image_ratio = image_width/image_height;
            $('.canvas_container').html('<canvas width="'+image_width+'" height="'+image_height+'" />');

            canvas = $('.canvas_container canvas');
            ctx = canvas[0].getContext("2d");
            canvas_width = canvas.width();
            canvas_height = canvas.height();


            spot_size = spot_radius*2 + spot_gap;

            var canvas_width_units = canvas_width/spot_size;
            var canvas_height_units = canvas_height/spot_size;
            spots = [];
            spots_init = [];
            ctx.drawImage(img,0,0); // Load Image on top left
            $('#source_points').html('');
            for (i=0;i<canvas_height_units;i++ )
            {
                for (j=0;j<canvas_width_units;j++ )
                {
                    var pixelData = ctx.getImageData((j+0.5)*spot_size+(i*spot_row_offset)%spot_size, (i+0.5)*spot_size, 1, 1).data;
//console.log(pixelData);

                    pixelData[3] = (pixelData[3]/255).toFixed(2);
                    if ($('#transfer_transparent').prop('checked'))
                    {
                        pixelData[3] = Math.round(pixelData[3]);
                    }

                    if(pixelData[3] != 0)
                    {
                        var spot_data = [(j+0.5)*spot_size+(i*spot_row_offset)%spot_size,(i+0.5)*spot_size,pixelData[0],pixelData[1],pixelData[2],pixelData[3]];
                        $('#source_points').append('<tr><td>'+spot_data.join('</td><td>')+'</td></tr>');
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
                    spots_init[i] = new Array(Math.random()*canvas_width*0.9 + canvas_width*0.05, Math.random()*canvas_height*0.9 + canvas_height*0.05,0,0,0,1);
                }
            }
            //console.log(spots_init);

            for(i=0;i<spot_array_size;i++)
            {
                spots[i] = new Array(spots_init[i][0], spots_init[i][1], spots_init[i][0], spots_init[i][1], Math.random()*canvas_width*0.9 + canvas_width*0.05, Math.random()*canvas_height*0.9 + canvas_height*0.05, 0, 0, 'rgba('+spots_init[i][2]+','+spots_init[i][3]+','+spots_init[i][4]+','+spots_init[i][5]+')');
            }
            if(location.search.indexOf('debug=1')>-1) $('#body_info_display').html(display);


            if($('#edit_mode').prop('checked'))
            {
                status = 2;
                $('.canvas_container').addClass('edit_mode');
            }
            else
            {
                status = 1;
                $('.canvas_container').removeClass('edit_mode');
            }
            draw_canvas();
        });



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
            if (status == 1)
            {
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
                    ctx.fillText(spot_text,spots[i][4]-spot_radius*1.1,spots[i][5]+spot_radius*1.4);
                    //ctx.arc(spots[i][4],spots[i][5],spot_radius,0,2*Math.PI);
                    ctx.fill();
                }
            }
            if (status == 2)
            {
                for(i=0;i<spot_array_size;i++)
                {
                    // Draw spot
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba('+spots_init[i][2]+','+spots_init[i][3]+','+spots_init[i][4]+','+spots_init[i][5]+')';
                    ctx.fillText(spot_text,spots_init[i][0]-spot_radius*1.1,spots_init[i][1]+spot_radius*1.4);
                    //ctx.arc(spots[i][4],spots[i][5],spot_radius,0,2*Math.PI);
                    ctx.fill();

                }
                ctx.beginPath();
                ctx.arc((Math.floor(page_coords[0]/spot_size)+0.5)*spot_size, (Math.floor(page_coords[1]/spot_size)+0.5)*spot_size, spot_size/2, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#333333';
                ctx.stroke();
            }
            /*ctx.beginPath();
             ctx.arc(page_coords[0],page_coords[1],mouse_radius,0,2*Math.PI);
             ctx.stroke();*/





            requestAnimFrame(function() {
                draw_canvas();
            });
        }



        $('.canvas_container').mousemove(function(event) {
            page_coords = Array(event.pageX - $(".canvas_container canvas").offset().left, event.pageY - $(".canvas_container canvas").offset().top);
            if(status == 1)
            {
//                client_coords = Array(event.clientX, event.clientY);
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
            if (status == 2)
            {

            }

            //$('#body_info_display').html('Page: '+page_coords+'<br>Client: '+client_coords+'<br>Speed: '+speed+'<br>Average Speed: '+average_speed+' '+(Math.log(average_speed)/Math.LN10+3)+'<br>Spot Position: '+spots+'<br>Spot Distance: '+Math.sqrt((spots[0][0]-page_coords[0])*(spots[0][0]-page_coords[0]) + (spots[0][1]-page_coords[1])*(spots[0][1]-page_coords[1]))+'');
        });
        $('.canvas_container').click(function(event){
            if(status == 2)
            {
                $('.point_editor_container').removeClass('hidden_container');
                var x = (Math.floor(page_coords[0]/spot_size)+0.5)*spot_size;
                var y = (Math.floor(page_coords[1]/spot_size)+0.5)*spot_size;
                $('#point_x').val(x);
                $('#point_y').val(y);

                for(i=0;i<spot_array_size;i++)
                {
                    if (spots_init[i][0]>=x && spots_init[i][1]>=y)
                    {
                        if (spots_init[i][0]==x && spots_init[i][1]==y)
                        {
                            edit_point = spots_init[i];
                        }
                        else
                        {
                            if (i > 0)
                            {
                                edit_point = [x,y,spots_init[i-1][2],spots_init[i-1][3],spots_init[i-1][4],0];
                            }
                            else
                            {
                                edit_point = [x,y,spots_init[i][2],spots_init[i][3],spots_init[i][4],0];
                            }
                        }
                        $('#point_r').val(edit_point[2]);
                        $('#point_g').val(edit_point[3]);
                        $('#point_b').val(edit_point[4]);
                        $('#point_opacity').val(edit_point[5]);
                        break;
                    }
                }
            }
        })
        $('.point_editor_container').on('change','input',function(){
            if ($(this).attr('id') == 'point_x' || $(this).attr('id') == 'point_y')
            {
                $(this).val((Math.floor($(this).val()/spot_size)+0.5)*spot_size);
            }
            edit_point = [parseInt($('#point_x').val()),parseInt($('#point_y').val()),parseInt($('#point_r').val()),parseInt($('#point_g').val()),parseInt($('#point_b').val()),parseInt($('#point_opacity').val())];

        });
        $('#point_submit').click(function(){
            if(status == 2)
            {
                for(i=0;i<spot_array_size;i++)
                {
                    if (spots_init[i][0]>=$('#point_x').val() && spots_init[i][1]>=$('#point_y').val())
                    {

                        if (spots_init[i][0]==$('#point_x').val() && spots_init[i][1]==$('#point_y').val())
                        {
                            if (edit_point[5] > 0)
                            {
                                spots_init[i] = edit_point;
                            }
                            else
                            {
                                spots_init.splice(i,1);
                            }
                        }
                        else
                        {
                            if (edit_point[5] > 0)
                            {
                                edit_point_index = i;
                                spots_init.splice(i,0,edit_point);
                            }
                        }
                        break;
                    }
                }
                if (i == spot_array_size)
                {
                    spots_init.splice(i,0,edit_point);
                }
                if(spots_init.length > 0)
                {
                    spot_array_size = spots_init.length;
                }
                //console.log(spots_init);

                spots = [];
                $('#source_points').html('');
                for(i=0;i<spot_array_size;i++)
                {
                    spots[i] = new Array(spots_init[i][0], spots_init[i][1], spots_init[i][0], spots_init[i][1], Math.random()*canvas_width*0.9 + canvas_width*0.05, Math.random()*canvas_height*0.9 + canvas_height*0.05, 0, 0, 'rgba('+spots_init[i][2]+','+spots_init[i][3]+','+spots_init[i][4]+','+spots_init[i][5]+')');
                    $('#source_points').append('<tr><td>'+spots_init[i].join('</td><td>')+'</td></tr>');
                }
                draw_canvas();
            }
        });
    });
</script>
</body>
</html>
