$(function() {
    var catalogTop = $(".catalog-scroll").offset().top;
    var catalogtag = $('.catalog-scroll').height();
    var homebanav = $('#homeba-nav').height();
    var aa = catalogtag + homebanav;
    console.log(catalogTop)
    if ($(window).width() > 1184) {
        $(document).on('scroll', function() {
            var varscroll = parseInt($(document).scrollTop());
            // console.log(varscroll)
            if (catalogTop < varscroll) {
                $(".catalog-scroll").addClass('catalog-top')
            } else {
                $('.catalog-scroll').removeClass('catalog-top');
            }
        })
    }
    $('.catalog-scrollspy a').each(function() {
        $(this).on('click', function() {
            $('.catalog-scrollspy a').removeClass('catalog-a')
            $(this).addClass('catalog-a')
            var tag = $(this).attr('title')
            $('html,body').animate({
                scrollTop: $('#' + tag).offset().top - aa - 50
            }, 500);
        })
    })
})