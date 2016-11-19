$(function() {
    var swiper6 = new Swiper('#header-swiper', {
        autoplay: 1500,
        speed: 2000,
        autoplayStopOnLast: true,
        slidesPerView: 1,
        effect: 'fade',
    });
    var scrollbanner = $('.homeba-banner-photo').height();
    var bannerValue = 0;
    $(window).scroll(function() {
        bannerValue = $(window).scrollTop();
        // console.log(bannerValue)
        if (bannerValue > scrollbanner) {
            $("#homeba-nav").removeClass('banner-style');
        } else {
            $("#homeba-nav").addClass('banner-style');
        }
    });

    $("#homeba-nav").addClass('banner-style');
    $('#homeba-nav').mouseenter(function() {
        $("#homeba-nav").removeClass('banner-style');
        $("#homeba-nav").css('transition', 'all .2s ease-in-out');
    }).mouseleave(function() {
        console.log(bannerValue)
        if (bannerValue > scrollbanner) {
            $("#homeba-nav").removeClass('banner-style');
        } else {
            $("#homeba-nav").addClass('banner-style');
        }
        // $("#homeba-nav").addClass('banner-style');
    });


    // $("#homeba-nav").slideDown(500);
    // $('#homeba-nav').animate({
    //     top: '0px',
    //     opacity: '1'
    // }, 500);

    // if ($(window).width() > 1184) {
    //     $("#homeba-nav").css('opacity', '0');
    //     $("#homeba-nav").css('top', '-72px');
    //     $(".header-text").css('opacity', '0');
    //     setTimeout(function() {
    //         $("#homeba-nav").animate({
    //             top: '0px',
    //             opacity: '1'
    //         }, 2000);
    //         $(".header-text").animate({
    //             "opacity": 1
    //         }, 3000);
    //     }, 4000)
    // }


    // $("#homeba-nav").addClass('banner-style');
    // $("#homeba-nav").css('border-bottom', '0');
    // $(".shop-search input").css('background', 'rgba(255,255,255,0)')




    var swiper7 = new Swiper('#banner-swiper', {
        autoplay: 4000,
        effect: 'fade',
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '#banner-button-next',
        prevButton: '#banner-button-prev',
        spaceBetween: 30
    });

    var daily = 0;
    $(".dailyDealFigcaption").each(function(i) {
        var dH = $(this).height();
        var $b = $("a", $(this)).eq(0);
        daily = $b.outerHeight();
        // console.log(dH + '======' + $b.outerHeight())
        while ($b.outerHeight() > dH) {
            $b.text($b.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
        };
    });


    // $('#profile-tab').click(function(e) {
    //     e.preventDefault()
    //     $(".dailyNewFigcaption").each(function(i) {
    //         var d = $(this).height();
    //         var $a = $(".dailyadd", $(this)).eq(0);
    //         console.log(d + '+++++' + daily)
    //             // alert(2)
    //         if (parseInt(daily) > parseInt(d)) {
    //             alert(1)
    //             console.log(d + '11111111' + daily)
    //             $a.text($a.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
    //         };
    //     });
    // })
})