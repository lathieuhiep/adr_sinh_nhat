(function ($) {

    "use strict";

    var seconds = 60,
        counter = 0,
        random = 0,
        time_delay = 0,
        point = 0,
        point_total = 0,
        play_total_score = 0,
        turn_point_arr = [],
        play_turn = $( '#play-turn' ),
        play_cake = $('.cake-candle-main');

    var myArray = [
        "images/nen-box-big.png",
        "images/nen-sao-big.png",
        "images/nen-3-big.png"
    ];

    $(document).ready( function () {

        count_time_play();

        makeDiv();

        click_point_total();

        var popup_play_btn_continue =   $( '.popup-play-btn-continue' );
        popup_play_btn_continue.on( 'click', function () {

            var play_turn_value = play_turn.text();

            if ( play_turn_value > 0 ) {

                $( '.adr-birthday-play__popup' ).fadeOut();

                $('#play-point').text(0);

                // Push turn point
                turn_point_arr.push(point_total);

                // Reset point total
                point_total = 0;

                $('#countdown-time-play span').text(seconds);

                count_time_play();

                makeDiv();

            }

        } );


    } );

    /* Function count time */
    function count_time_play() {

        var sec = seconds,
            timer = setInterval( function() {

            $('#countdown-time-play span').text(--sec);

            if ( sec === 0 ) {
                clearInterval (timer );
            }

        }, 1000 );

    }

    function elements (e_random, e_time_delay, point ) {

        var elements = $();

        for( var x = 0; x < e_random; x++ ) {

            var divsize = 200,
                posx = ( Math.random() * ( play_cake.width() - divsize ) ).toFixed(),
                posy = ( Math.random() * ( play_cake.height() - divsize ) ).toFixed(),
                random_myarr = Math.floor(Math.random()*myArray.length),
                randomItem = myArray[random_myarr];

            var $newdiv = $('<div class="candle-item candle-item__'+random_myarr+'" data-point="'+point+'"><div class="candle-fire"><div class="flame"><div class="shadows"></div><div class="top"></div><div class="middle"></div></div></div><img class="candle-item__img" src="'+randomItem+'" alt="candle"></div>');

            elements = elements.add($newdiv);

        }

        play_cake.append(elements);

        setTimeout(setRandomPos($(".candle-item")), 2);

        setTimeout( function() {

            play_cake.empty();

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

            var play_point_lv = $('#play-point').text(),
                play_turn_value = play_turn.text();

                if ( play_turn_value > 0 ) {
                    play_turn.text(--play_turn_value);

                }

                $( '.popup-play-point' ).text( play_point_lv );
                $( '.adr-birthday-play__popup' ).fadeIn(500);
        }

    }

    /* function point total */
    function click_point_total() {

        $(document).on('click', '.candle-item', function() {

            var has_active =  $(this).hasClass( 'active' );

            if ( has_active === false ) {

                $(this).addClass( 'active' );

                var point_item =   $(this).data('point'),
                    play_total_score_get = $( '#play-total-score' );

                play_total_score = play_total_score_get.text();

                point_total = parseInt( point_total ) + parseInt( point_item );
                play_total_score = parseInt( play_total_score ) + parseInt( point_item );

                $('#play-point').text( point_total );
                play_total_score_get.text( play_total_score );

            }

        });

    }

    var boxDims = [];
    var notAllowboxDims = [];
    var offset = 0;
    var offset_height = -50;

    var mainBoxWidth = play_cake.width();
    var mainBoxHeight = play_cake.height();
    var itemWidth = 180;
    var itemHeight = 180;

    if (window.matchMedia('(max-width: 991px)').matches) {
        itemWidth = 70;
        itemHeight = 70;
        offset_height = -15;
    }

    function deleteBoxPosition(position){
        for(var i = boxDims.length - 1; i >= 0; i--) {
            if(boxDims[i] === position) {
                boxDims.splice(i, 1);
            }
        }
    }

    function randomInRange(min, max) {
        return(Math.floor((Math.random() * (max - min) + 1) + min));
    }

    var stt = 0, position= 0, fixLeft = 0, fixTop = 0, validatePosition = false;

    function setRandomPos(elements) {

        $( window ).on( 'load resize', function () {

            var $width_screen =  $(window).width();

            mainBoxWidth = play_cake.width();
            mainBoxHeight = play_cake.height();

            if ( $width_screen < 991 ) {
                itemWidth = 70;
                itemHeight = 70;
                offset_height = -15;
            }

        } );

        var columns = Math.round(mainBoxWidth/(itemWidth + offset));
        var rows = Math.round(mainBoxHeight/(itemHeight + offset));
        var totalBoxs = columns * rows;

        boxDims = [];
        for( var i=0; i<totalBoxs;i++ ){
            boxDims.push(i);
        }

        elements.each(function(){

            stt = randomInRange(0, boxDims.length -1);
            position = boxDims[stt];
            $(this).attr('data-position', position);
            deleteBoxPosition(position);
            fixLeft = play_cake.offset().left + ((position-1) % columns) * (itemWidth + offset);
            fixTop = play_cake.offset().top + Math.floor((position-1)/columns) * (itemHeight + offset_height);
            $(this).offset({
                left: fixLeft,
                top: fixTop
            });
            var $c =parseInt( $(this).attr('data-position') );

            if (  $c === 5 || $c === 6 || $c === 7 || $c === 8 || $c === 9 || $c === 10 || $c === 11 ) {

                $(this).css( 'z-index', 2 );
            }

        });

    }

})(jQuery);