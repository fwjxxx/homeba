$('docuemnt').ready(function() {

    if ($(".figcaption").length > 0) {
        $(".figcaption").each(function(i) {
            var divH = $(this).height();
            var $p = $("a", $(this)).eq(0);
            // console.log(divH + '======' + $p.outerHeight())
            while ($p.outerHeight() > divH) {
                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            };
        });
    }

    //点击任何地方关闭手机导航
    $('body').on('click', function() {
        var phone = $('#menu-phone').attr('class');
        if (phone == 'navbar-collapse collapse in') {
            $('#menu-phone').collapse('hide');
        }
    });

    $('.scenes .swiper-container').each(function() {
        var scenesid = $(this).attr('id')
            // console.log(scenesid)
        var swiper5 = new Swiper('#' + scenesid + '', {
            initialSlide: 0,
            centeredSlides: true,
            effect: 'flip',
        });

        if ($('#scenes-sm').css("display") == 'none') {
            $('#' + scenesid + '').mouseenter(function() {
                swiper5.slideNext();
            }).mouseleave(function() {
                swiper5.slidePrev();
            });
        }
    });


    var timecart = null;
    if ($('.menu-cart li').length > 0) {
        $('#dropcart').mouseenter(function() {
            clearTimeout(timecart);
            $('.cartlist-out').stop();
            $('.cartlist-out').fadeIn(300);
            $('#icon-top').show();
        }).mouseleave(function() {
            $('.cartlist-out').stop();
            timecart = setTimeout(function() {
                $('.cartlist-out').fadeOut(300);
            }, 500);
            $('#icon-top').hide();
        });
    }

    var timehub = null;
    $('#userhub').mouseenter(function() {
        clearTimeout(timehub)
        $('.menu-list').stop();
        $('.menu-list').fadeIn(500);
    }).mouseleave(function() {
        $('.menu-list').stop();
        timehub = setTimeout(function() {
            $('.menu-list').fadeOut(200);
        }, 500);
    });

    cartcount();

    function cartcount() {
        var cartcount = parseInt($('#dropcart1 b').text());
        if (cartcount > 0) {
            $('#dropcart1 b').show();
        } else {
            $('#dropcart1 b').hide();
        }
    }

    $('#cart-small').on('click', function() {
        $('.cartlist-out').stop();
        $('.cartlist-out').fadeOut(200);
        $('#icon-top').hide();
    })

    $('#goodses .goodses-dl dd').each(function() {
        var num = 70;
        var strnum = $(this).find("a").text().length;
        var str = $(this).find("a").text();
        if (strnum > num) {
            $(this).find("a").text(str.substring(0, num) + '...');
        }

    })

    //顶导返回按钮
    var displayH = document.documentElement.clientHeight;
    showScroll();

    function showScroll() {
        $(window).scroll(function() {
            var scrollValue = $(window).scrollTop();
            scrollValue > displayH ? $('div[class=scroll]').fadeIn() : $('div[class=scroll]').fadeOut();
        });
        $('#scroll').click(function() {
            $("html,body").animate({
                scrollTop: 0
            }, 200);
        });
    };

    //选择Scene Recommended商品
    if ($(window).width() > 768) {
        $('#goodses dl').on('mouseover', function() {
            $('#goodses dl').each(function(i) {
                var pic = $('dd .goodsesprice').eq(i).attr('value');
                $(this).find("strong").show();
                $(this).find("dd .goodsesprice").removeClass('addcart');
                $(this).find("strong").text(pic);
            });
            var pic = $(this).find("strong").text();
            $(this).find("dd .goodsesprice").addClass('addcart');
            $(this).find("strong").hide();
            $(this).find("p").show();
        }).on('mouseout', function() {
            $('#goodses dl').each(function(i) {
                var pic = $('dd .goodsesprice').eq(i).attr('value');
                $(this).find("strong").show();
                $(this).find("dd .goodsesprice").removeClass('addcart');
                $(this).find("strong").text(pic);
            });
        });
    }

    //图片滚动切换功能
    if ($("#keytobuy").length > 0) {
        if ($('#keytobuy .swiper-slide').length < 6) {
            $('#keytobuy-next').hide();
            $('#keytobuy-prev').hide();
        }
        var swiper = new Swiper('#keytobuy', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 20,
            freeMode: true,
            nextButton: '#keytobuy-next',
            prevButton: '#keytobuy-prev',
            paginationType: 'progress'
        });
    }
    if ($("#otherscenes").length > 0) {
        //图片滚动切换功能
        if ($('#otherscenes .swiper-slide').length < 4) {
            $('#otherscenes-next').hide();
            $('#otherscenes-prev').hide();
        }
        var swiper1 = new Swiper('#otherscenes', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true,
            nextButton: '#otherscenes-next',
            prevButton: '#otherscenes-prev',
            paginationType: 'progress'
        });
    }
    if ($("#shop-img").length > 0) {
        //图片滚动切换功能
        var swiper2 = new Swiper('#shop-img', {
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
        });
    }
    if ($("#shop-color").length > 0) {
        //图片滚动切换功能
        var swiper3 = new Swiper('#shop-color', {
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 10,
            nextButton: '.shop-color-left',
            prevButton: '.shop-color-right',
        });
    }

    $('#sign-in').on('click', function() {
        if ($('#user').val() == '' || $('#pass').val() == '') {
            if ($('#user').val() == '') {
                $('.homeba-login strong').eq(0).text('This field may not be blank');
            }
            if ($('#pass').val() == '') {
                $('.homeba-login strong').eq(1).text('This field may not be blank');
            }
            return false;
        }
    });
    $(".homeba-login").find(".form-control").each(function(i) {
        $(this).keyup(function() {
            if ($(this).parent().hasClass("login-user")) {
                if ($('#user').val() == '') {
                    $('.homeba-login strong').eq(0).text('This field may not be blank')
                } else {
                    $('.homeba-login strong').eq(0).text('')
                }
            } else if ($(this).parent().hasClass("login-pass")) {
                if ($('#pass').val() == '') {
                    $('.homeba-login strong').eq(1).text('This field may not be blank');
                } else {
                    $('.homeba-login strong').eq(1).text('');
                }
            }
        });
    });
});