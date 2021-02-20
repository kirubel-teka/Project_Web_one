/*/*
 Project Name : Brickpress
 Author Company : themecanyon
 Project Date: 23 November, 2016
 Author Website : http://demo.themecanyon.org
 Project Developer : sufyan319@outlook.com
 */


/* Table of Content
 ==================================================
 1.Parrallax
 2.Header
 3.Count Function
 4.Testimonoials
 5.Tooltip
 6.Services Slider
*/

jQuery(function($) {

    "use strict";
    //============================================
    //Parrallex
    //=============================================
    $('.parallax').parallax("50%", 0.1);
    $('.parallax1').parallax("100%", 0.1);
    $('.parallax2').parallax("100%", 0.1);
    $('.parallax3').parallax("100%", 0.1);
    $('.parallax4').parallax("100%", 0.1);

    //============================================
    //Header
    //=============================================
    $("header.header-transparent").closest("body").addClass("header-transparent");

    //offCanvas menu
    $('div.offcanvas-inner').find('ul.menu').attr('id', 'offcanvas-inner-menu');

    $('ul#offcanvas-inner-menu').find('li.parent >a').append('<i class="fa fa-angle-down menu-toggler"></i>');

    $(document).ready(function() {
        $('a').each(function() {
            if ($(this).attr('target') !== undefined) {
                $('a').attr('target', '_parent');
            }
        });
    });

    $('input').removeAttr("alt");

    var $body = $('body'),
        $wrapper = $('.body-innerwrapper'),
        $toggler = $('#offcanvas-toggler'),
        $close = $('.close-offcanvas'),
        $offCanvas = $('.offcanvas-menu');

    $toggler.on('click', function(event) {
        event.preventDefault();
        stopBubble(event);
        setTimeout(offCanvasShow, 50);
    });

    $close.on('click', function(event) {
        event.preventDefault();
        offCanvasClose();
    });

    var offCanvasShow = function() {
        $body.addClass('offcanvas');
        $wrapper.on('click', offCanvasClose);
        $close.on('click', offCanvasClose);
        $offCanvas.on('click', stopBubble);

    };

    var offCanvasClose = function() {
        $body.removeClass('offcanvas');
        $wrapper.off('click', offCanvasClose);
        $close.off('click', offCanvasClose);
        $offCanvas.off('click', stopBubble);
    };

    var stopBubble = function(e) {
        e.stopPropagation();
        return true;
    };
    //========================================
    // count function
    //======================================
    $('.count').each(function() {
        jQuery(this).appear(function() {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
    });
    /* ---------------------------------------------------------------------- */
    /*  Contact Form
     /* ---------------------------------------------------------------------- */

    var submitContact = $('#submit_contact'),
        message = $('#msg');

    submitContact.on('click', function(e) {
        e.preventDefault();

        var $this = $(this);

        $.ajax({
            type: "POST",
            url: 'contact.php',
            dataType: 'json',
            cache: false,
            data: $('#contact-form').serialize(),
            success: function(data) {

                if (data.info !== 'error') {
                    $this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
                    message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                } else {
                    message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                }
            }
        });
    });
    //================================================
    //Testimonials
    //=================================================
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
        singleItem: true,
        slideSpeed: 1000,
        navigation: false,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
        autoPlay: 6000
    });

    sync2.owlCarousel({
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 3],
        itemsMobile: [479, 3],
        pagination: false,
        responsiveRefreshRate: 100,
        afterInit: function(el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }

    }

    //============================================
    //tooltip
    //=============================================
    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //============================================
    //Services Slider
    //=============================================
    // Has carousel
    if ($('#carousel').is('.flexslider')) {

        // Thumb Gallery
        var $sppbTgOptions = $('.sppb-tg-slider');

        // Autoplay
        var $autoplay = $sppbTgOptions.data('sppb-tg-autoplay');
        //if ($autoplay == 'true') { var $autoplay = true; } else { var $autoplay = false};

        // arrows
        var $arrows = $sppbTgOptions.data('sppb-tg-arrows');
        //if ($arrows == 'true') { var $arrows = true; } else { var $arrows = false};

        $(window).load(function() {
            $('#carousel').flexslider({
                animation: 'slide',
                controlNav: false,
                directionNav: $arrows,
                animationLoop: false,
                slideshow: $autoplay,
                minItems: 5,
                move: 1,
                itemWidth: 129,
                itemMargin: 15,
                asNavFor: '#slider'
            });

            $('#slider').flexslider({
                animation: "fade",
                controlNav: false,
                directionNav: $arrows,
                animationLoop: false,
                slideshow: $autoplay,
                sync: "#carousel"
            });
        });

    }; // END:: has carousel

});
*/