$('.signup').hide();
$('#signin,#signup').on(
    'click',
    function() {
        $('.signin, .signup').toggle()
    }
)

//  slick slider

$('.autoplay1').slick({
    slidesToShow: 4, //phần tử hiện trên màn hình
    slidesToScroll: 1, //  số phần tử dịch chuyển khi người dùng croll
    autoplay: false, //tự động chạy
    arrows: true, // mũi tên để click
    autoplaySpeed: 900, // tốc độ thời gian nó sẽ di chuyển
    prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-circle-arrow-left ' aria-hidden='true'></i></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-circle-arrow-right' aria-hidden='true'></i></button>"
});


// chi tiết sản phẩm
$(document).ready(function() {
    $("#flip").click(function() {
        $("#panel").slideToggle(500);
    });
    $("#stop").click(function() {
        $("#panel").stop()
    });
});

// ẩn chi tiết sản phẩm
$(document).ready(function() {
    $(".btn1").click(function() {
        $("#panel").hide(500);
    });

});

// timdf kiếm sản phmar
$(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable .product").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

// hiệu ứng bay vào giỏ hàng
$('.add-to-cart').on('click', function() {
    var cart = $('.carrdss');
    var imgtodrag = $(this).parent('.product').find("img").eq(0);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '100'
            })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width': 100,
                'height': 100
            }, 1000, 'easeInOutExpo');

        setTimeout(function() {
            cart.effect("shake", {
                times: 2
            }, 200);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function() {
            $(this).detach()
        });
    }
});


(function($) {
    "use strict";
    $.fn.sliderResponsive = function(settings) {

        var set = $.extend({
                slidePause: 5000,
                fadeSpeed: 800,
                autoPlay: "on",
                showArrows: "off",
                hideDots: "off",
                hoverZoom: "on",
                titleBarTop: "off"
            },
            settings
        );

        var $slider = $(this);
        var size = $slider.find("> div").length; //number of slides
        var position = 0; // current position of carousal
        var sliderIntervalID; // used to clear autoplay

        // Add a Dot for each slide
        $slider.append("<ul></ul>");
        $slider.find("> div").each(function() {
            $slider.find("> ul").append('<li></li>');
        });

        // Put .show on the first Slide
        $slider.find("div:first-of-type").addClass("show");

        // Put .showLi on the first dot
        $slider.find("li:first-of-type").addClass("showli")

        //fadeout all items except .show
        $slider.find("> div").not(".show").fadeOut();

        // If Autoplay is set to 'on' than start it
        if (set.autoPlay === "on") {
            startSlider();
        }

        // If showarrows is set to 'on' then don't hide them
        if (set.showArrows === "on") {
            $slider.addClass('showArrows');
        }

        // If hideDots is set to 'on' then hide them
        if (set.hideDots === "on") {
            $slider.addClass('hideDots');
        }

        // If hoverZoom is set to 'off' then stop it
        if (set.hoverZoom === "off") {
            $slider.addClass('hoverZoomOff');
        }

        // If titleBarTop is set to 'on' then move it up
        if (set.titleBarTop === "on") {
            $slider.addClass('titleBarTop');
        }

        // function to start auto play
        function startSlider() {
            sliderIntervalID = setInterval(function() {
                nextSlide();
            }, set.slidePause);
        }

        // on mouseover stop the autoplay
        $slider.mouseover(function() {
            if (set.autoPlay === "on") {
                clearInterval(sliderIntervalID);
            }
        });

        // on mouseout starts the autoplay
        $slider.mouseout(function() {
            if (set.autoPlay === "on") {
                startSlider();
            }
        });

        //on right arrow click
        $slider.find("> .right").click(nextSlide)

        //on left arrow click
        $slider.find("> .left").click(prevSlide);

        // Go to next slide
        function nextSlide() {
            position = $slider.find(".show").index() + 1;
            if (position > size - 1) position = 0;
            changeCarousel(position);
        }

        // Go to previous slide
        function prevSlide() {
            position = $slider.find(".show").index() - 1;
            if (position < 0) position = size - 1;
            changeCarousel(position);
        }

        //when user clicks slider button
        $slider.find(" > ul > li").click(function() {
            position = $(this).index();
            changeCarousel($(this).index());
        });

        //this changes the image and button selection
        function changeCarousel() {
            $slider.find(".show").removeClass("show").fadeOut();
            $slider
                .find("> div")
                .eq(position)
                .fadeIn(set.fadeSpeed)
                .addClass("show");
            // The Dots
            $slider.find("> ul").find(".showli").removeClass("showli");
            $slider.find("> ul > li").eq(position).addClass("showli");
        }

        return $slider;
    };
})(jQuery);



//////////////////////////////////////////////
// Activate each slider - change options carosale
//////////////////////////////////////////////
$(document).ready(function() {

    $("#slider1").sliderResponsive({
        // Using default everything
        // slidePause: 5000,
        // fadeSpeed: 800,
        // autoPlay: "on",
        // showArrows: "off", 
        // hideDots: "off", 
        // hoverZoom: "on", 
        // titleBarTop: "off"
    });

    $("#slider2").sliderResponsive({
        fadeSpeed: 300,
        autoPlay: "off",
        showArrows: "on",
        hideDots: "on"
    });

    $("#slider3").sliderResponsive({
        hoverZoom: "off",
        hideDots: "on"
    });

});


(function($) {
    $.fn.menumaker = function(options) {
        var cssmenu = $(this),
            settings = $.extend({
                format: "dropdown",
                sticky: false
            }, options);
        return this.each(function() {
            $(this).find(".button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
            resizeFix = function() {
                var mediasize = 1000;
                if ($(window).width() > mediasize) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);
// back to topp
(function($) {
    $(document).ready(function() {
        $("#cssmenu").menumaker({
            format: "multitoggle"
        });
    });
})(jQuery);
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('#back-top').fadeIn();

        } else {
            $('#back-top').fadeOut();

        }
    });
    $("#back-top ").click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 100);
    });
});