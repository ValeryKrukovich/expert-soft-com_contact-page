$(document).ready(function() {
    /**
    * Form Validation
    * @see  http://jqueryvalidation.org/validate/
    */
    $('.js-validation-form').each(function() {
        var $form = $(this);
        $form.validate({
            errorPlacement: function(error, element) {
                if ($(element).is(':checkbox') || $(element).is(':radio')) {
                    error.insertAfter($(element).closest('label'));
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: $(form).attr('action'),
                    data: $(form).serialize(),
                    dataType: 'json',
                }).done(function(data) {
                    form.reset();
                    var $message = $(form).find('.form__message');

                    $message.addClass('is-success').text('Thank you! Your message has been sent.');

                    if($(window).width() < 768){
                        if($message.closest('.contact-popup').length){
                            $('.contact-popup').animate({scrollTop: $message.offset().top - $('.contact-popup').offset().top + $('.contact-popup').scrollTop() - 10}, 700);
                        } else {
                            $('html, body').animate({scrollTop: $message.offset().top - $('.header__mob').outerHeight() - 10}, 700);
                        }
                    }


                });
            }
        });
    });
    
    /**
    * Slick
    * @see  http://kenwheeler.github.io/slick/
    */
    $('.gallery').each(function(i){
        var $gallery = $(this),
        $gallerySlider =  $gallery.find('.gallery__slider');
        $gallerySlider.addClass('gallery__slider_' + i);

        if($gallerySlider.children().length > 1){
            var $galleryThumbs = $('<div class="gallery__thumbs gallery__thumbs_'+ i +'" />');

            $gallerySlider.children().each(function(){
                $galleryThumbs.append($('<div class="gallery__thumbs-item"><span class="gallery__thumbs-item-inner"><img src="'+ ($(this).data('thumb') || $(this).find('img').attr('src')) +'" /></span></div>'));
            });

            $gallery.prepend($galleryThumbs);

            $gallerySlider.slick({
                fade: true,
                asNavFor: '.gallery__thumbs_' + i,
            });

            $galleryThumbs.slick({
                centerMode: true,
                centerPadding: 0,
                arrows: false,
                slidesToShow: 5,
                focusOnSelect: true,
                swipeToSlide: true,
                asNavFor: '.gallery__slider_' + i
            });
        }
    });

    $('.main__slider').slick({
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 10000,
        cssEase: 'linear',
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: 1000
    });

    $('.main__slider').find('[data-slick-index="0"]').addClass('custom-animation');

    $('.main__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var $currentSlide = nextSlide,
        $previousSlide, $nextSlide;

        if ($currentSlide === (slick.slideCount - 1)) $nextSlide = 0;
        else $nextSlide = ($currentSlide + 1);

        if ($currentSlide === 0) $previousSlide = (slick.slideCount - 1);
        else $previousSlide = ($currentSlide - 1);

        if($('.main__slider').find('[data-slick-index="' + $currentSlide + '"]').find('.main__slider-item').hasClass('is-dark')){
            $('.main').addClass('is-dark');
        } else {
            $('.main').removeClass('is-dark');
        }

        $('.main__slider').find('[data-slick-index="' + $currentSlide + '"]').addClass('custom-animation');
        setTimeout(function(){
            $('.main__slider').find('[data-slick-index="' + $previousSlide + '"]').removeClass('custom-animation');
            $('.main__slider').find('[data-slick-index="' + $nextSlide + '"]').removeClass('custom-animation');
        },1500);
    });

    if (!navigator.userAgent.match (/iPhone/i)) {
        $(document).on('click', 'a[href^="tel:"]', function(e){
            $(this).attr('href', $(this).attr('href').replace(/^tel:/, 'callto:'));
        });
    }

    $(document).on('click', '.menu-btn', function(e){
        if($('html').hasClass('is-menu-open')){
            $('html').removeClass('is-menu-open');
            noscrollFinish();
        } else {
            noscrollStart();
            $('html').addClass('is-menu-open');
        }
    });

    $(document).on('click', '.menu-popup__close, .menu-popup__bg', function(e){
        $('html').removeClass('is-menu-open');
        noscrollFinish();
    });

    setTimeout(function(){
        $('html').addClass('is-contact-main-visible');
    },1000);

    $('.contact-main__header').on('click', function(e){
        e.preventDefault();
        $('html').addClass('is-contact-open');
    });

    $('.contact-main').on('click', function(e){
        if($(window).width() < 768){
            $('html').addClass('is-contact-open');
        }
    });

    $('.contact-main__close').on('click', function(e){
        $('html').addClass('is-contact-main-hidden is-contact-main-temp-hidden');
    });

    $('.contact-main').on('mouseenter', function(e){
        $('html').removeClass('is-contact-main-temp-hidden');
    });

    $('.contact-main__img').on('click', function(e){
        $('html').removeClass('is-contact-main-temp-hidden');
    });

    $('.contact-bg, .contact-popup__close').on('click', function(e){
        $('html').removeClass('is-contact-open');
        $('html').addClass('is-contact-main-hidden');
    });

    // $('.nav__link').on('click', function(e) {
    //     e.preventDefault();

    //     if($('html').hasClass('is-menu-open')){
    //         $('html').removeClass('is-contact-open');
    //         $('html').removeClass('is-menu-open');
    //         noscrollFinish();
    //         $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - $('.header__mob').outerHeight()}, 700);
    //     } else {
    //         $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - $('.header').outerHeight()}, 700);
    //     }
    // });

    $('.nav__link_anchor').on('click', function(e) {
        e.preventDefault();

        if($('html').hasClass('is-menu-open')){
            $('html').removeClass('is-contact-open');
            $('html').removeClass('is-menu-open');
            noscrollFinish();
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 700);
        } else {
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 700);
        }
    });

    $('.footer__message-btn').on('click', function(e){
        if(!$('html').hasClass('is-footer-contact-open')){
            e.preventDefault();
            $('html').addClass('is-footer-contact-open');
        }
    });

    $('.footer__contact-popup-close').on('click', function(e){
        $('html').removeClass('is-footer-contact-open');
    });

    
});

$(window).scroll(function(){
    if($(document).scrollTop() + $(window).height() > $('.footer').offset().top){
        $('html').addClass('is-footer-visible');
    } else {
        $('html').removeClass('is-footer-visible');
    }
});

/**
* Mobile Scroll Prevent
*/
var noscrollY = 0;

function noscrollStart(){
    noscrollY = $(document).scrollTop();
    $('body').css('top', - noscrollY + 'px');
    $('html').addClass('is-noscroll');
}

function noscrollFinish(){
    $('html').removeClass('is-noscroll');
    $(document).scrollTop(noscrollY);
    $('body').css('top', 'auto');
}