(function ($) {

    "use strict";

    var counter = 0,
        random = 0,
        time_delay = 0,
        point = 0,
        play_cake = $('.adr-birthday-play__cake-candle');


    var myArray = [
        "images/nen-box-big.png",
        "images/nen-sao-big.png",
        "images/nen-3-big.png"
    ];


    // var filled_areas = new Array();

    $(document).ready( function () {

        var sec = 60;
        var timer = setInterval( function() {

            $('#countdown-time-play span').text(--sec);

            if ( sec === 0 ) {
                clearInterval (timer );
            }

        }, 1000 );

        makeDiv();

        // test();

        click_point_total();



        // $('.candle-item').each(function() {
        //     var min_x = 0;
        //
        //     var min_y = 0;
        //
        //     var rand_x=0;
        //     var rand_y=0;
        //     var area;
        //
        //     // random_lv1      =   Math.floor(Math.random() * (8 - 6 + 1) + 6),
        //     do {
        //         var max_x = play_cake.width();
        //         var max_y = play_cake.height();
        //         rand_x = Math.floor( Math.random() * ( max_x - min_x + 1 ) + min_x );
        //         rand_y = Math.floor( Math.random() * ( max_y - min_y + 1 ) + min_y );
        //         area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
        //     } while(check_overlap(area));
        //
        //     filled_areas.push(area);
        //
        //     $(this).css({left:rand_x, top: rand_y});
        // });


    } );



    function elements (e_random, e_time_delay, point ) {

        var elements = $(),
            test_x_y  = [];

        for( var x = 0; x < e_random; x++ ) {

            var divsize = 200,
                posx = ( Math.random() * ( play_cake.width() - divsize ) ).toFixed(),
                posy = ( Math.random() * ( play_cake.height() - divsize ) ).toFixed(),
                // random_class = grid_arr[Math.floor(Math.random()*myArray.length)],
                random_myarr = Math.floor(Math.random()*myArray.length),
                randomItem = myArray[random_myarr];

                var $newdiv = $('<div class="candle-item candle-item__'+random_myarr+'" data-point="'+point+'"><div class="candle-fire"><img src="images/fire-candle.png" alt="fire"></div><img class="candle-item__img" src="'+randomItem+'" alt="candle"></div>').css({
                    'left': posx + 'px',
                    'top': posy + 'px'
                });

            // var $newdiv = $('<div class="candle-item candle-item__'+random_myarr+'" data-point="'+point+'"><div class="candle-fire"><img src="images/fire-candle.png" alt="fire"></div><img class="candle-item__img" src="'+randomItem+'" alt="candle"></div>');


            elements = elements.add($newdiv);

            // $('.adr-birthday-play__cake-candle').append($newdiv);

        }

        $('.adr-birthday-play__cake-candle').append(elements);

        // setTimeout(test, 2);

        setTimeout( function() {

            $('.adr-birthday-play__cake-candle').empty();

            }, e_time_delay
        );

    }



    function makeDiv() {

        var time_delay_lv1  =   3000,
            time_delay_lv2  =   2000,
            time_delay_lv3  =   1000,
            point_lv1       =   1,
            point_lv2       =   2,
            point_lv3       =   3,
            random_lv1      =   Math.floor(Math.random() * (8 - 6 + 1) + 6),
            random_lv2      =   Math.floor(Math.random() * (7 - 5 + 1) + 5),
            random_lv3      =   Math.floor(Math.random() * (5 - 2 + 1) + 2);

        var get_time_count =  parseInt( $('#countdown-time-play span').text() );

        if ( 40 <= get_time_count && get_time_count <= 60 ) {
            random      =   random_lv1;
            time_delay  =   time_delay_lv1;
            point       =   point_lv1;

            elements(random, time_delay, point);

        }else if ( 20 <= get_time_count && get_time_count < 40 ) {
            random      =   random_lv2;
            time_delay  =   time_delay_lv2;
            point       =   point_lv2;

            elements(random, time_delay, point);

        }else {
            random      =   random_lv3;
            time_delay  =   time_delay_lv3;
            point       =   point_lv3;

            elements(random, time_delay, point );
        }

        if ( get_time_count !== 0 ) {
            setTimeout( makeDiv, time_delay );
        }else {
            var play_point_lv = $('#play-point').text();
            $( '.popup-play-point' ).text( play_point_lv );
            $( '.adr-birthday-play__popup' ).fadeIn(500);
        }

    }

    /* function point total */
    function click_point_total() {

        var point_total = 0;
        $(document).on('click', '.candle-item', function() {

            var has_active =  $(this).hasClass( 'active' );

            if ( has_active === false ) {

                $(this).addClass( 'active' );
                var point_item =   $(this).data('point');

                point_total = parseInt( point_total ) + parseInt( point_item );
                $('#play-point').text( point_total );

            }

        });

    }

    // function test() {
    //     var containerW = 700;
    //     var containerH = 600;
    //     var positions = [];
    //
    //     $('.candle-item').each(function() {
    //
    //         var coords = {
    //             w: $(this).outerWidth(true),
    //             h: $(this).outerHeight(true)
    //         };
    //
    //         var success = false;
    //
    //         while (!success)
    //         {
    //             coords.x = ( Math.random() * ( play_cake.width() - coords.w ) ).toFixed();
    //             coords.y = ( Math.random() * ( play_cake.height() - coords.h ) ).toFixed();
    //             // coords.x = parseInt(Math.random() * (play_cake.width()-coords.w));
    //             // coords.y = parseInt(Math.random() * (play_cake.height()-coords.h));
    //
    //
    //             success = true;
    //             $.each(positions, function(){
    //
    //                 if (
    //                     coords.x <= (this.x + this.w) &&
    //                     (coords.x + coords.w) >= this.x &&
    //                     coords.y <= (this.y + this.h) &&
    //                     (coords.y + coords.h) >= this.y
    //                 )
    //
    //                 // if ( success < 50000 )
    //                 // {
    //                 //     return false;
    //                 // }
    //
    //                 {
    //                     success = false;
    //                 }
    //             });
    //         }
    //
    //         positions.push(coords);
    //
    //         $(this).css({
    //             top: coords.y + 'px',
    //             left: coords.x + 'px'
    //         });
    //     });
    //
    // }

    // function check_overlap(area) {
    //     for (var i = 0; i < filled_areas.length; i++) {
    //         console.log( filled_areas );
    //         var check_area = filled_areas[i];
    //
    //         var bottom1 = area.y + area.height;
    //         var bottom2 = check_area.y + check_area.height;
    //         var top1 = area.y;
    //         var top2 = check_area.y;
    //         var left1 = area.x;
    //         var left2 = check_area.x;
    //         var right1 = area.x + area.width;
    //         var right2 = check_area.x + check_area.width;
    //         if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
    //             continue;
    //         }
    //         return true;
    //     }
    //     return false;
    // }

})(jQuery);