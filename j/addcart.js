//添加购物车
$(function() {
    // console.log($("#addcartlist #addcart").length);
    var qtynumber = '';
    var goodsid = '';
    var goodsnum = '';
    var timecart1 = null;

    function cartnew() {
        $.ajax({
            type: 'GET',
            url: '/api/cart/',
            success: function(json) {
                var cartlist = '';
                $.each(json, function(i, item) {
                    $.each(item.items, function(j, val) {
                        // console.log(val)
                        cartlist += '<li><dl class="clear"><dt><input type="hidden" name="item" value="' + val.id + '"><a href="/goods/' + val.goods.brow + '.html"><img src="' + val.goods.picture.phone + '"></a></dt><dd><h4><a href="{/goods/' + val.goods.brow + '.html">' + val.goods.title + '</a></h4><p><span>X' + val.qty + '</span><strong>$ ' + val.goods.amount + '</strong><input type="hidden" name="qty_' + val.id + '" value="{{ ci.qty }}"></p></dd></dl></li>';
                    });
                });
                $('.menu-cart').html(cartlist);
                $('.cartlist-out').fadeIn(300);
                if ($('.menu-cart li').length > 0) {
                    $('#dropcart').mouseenter(function() {
                        // $(this).addClass('open');
                        // $('.cartlist-out').slideDown(500);
                        clearTimeout(timecart1);
                        $('.cartlist-out').stop();
                        $('.cartlist-out').fadeIn(300);
                        $('#icon-top').show();
                    }).mouseleave(function() {
                        // $(this).removeClass('open');
                        $('.cartlist-out').stop();
                        timecart1 = setTimeout(function() {
                            $('.cartlist-out').fadeOut(300);
                        }, 500);
                        $('#icon-top').hide();
                    });
                }
            },
            error: function() {}
        });
    }

    function addcart(qty, id, gasku, gaprice, ganame, gacategory, gaposition, galist) {
        $.ajax({
            type: 'post',
            url: '/api/cartitem/',
            data: {
                qty: qty,
                goods: id
            },
            beforeSubmit: function() {
                //让提交按钮失效，以实现防止按钮重复点击
                $('#addcart').attr('disabled', 'disabled');
            },
            complete: function() {
                //让按钮重新有效
                $('#addcart').removeAttr('disabled');
            },
            success: function(json) {
                $('#dropcart1 b').show();
                // console.log(json.item_count)
                $('#dropcart1 b').text(json.item_count);
                cartnew();
                $('#icon-top').show();
                // console.log(qty+'++++'+id+'++++'+gasku+'++++'+gaprice)
                fbq('track', 'AddToCart', {
                    content_ids: gasku,
                    content_type: 'product',
                    value: gaprice,
                    currency: 'USD'
                });
                ga('ec:addProduct', {
                    'id': gasku,
                    'name': ganame,
                    'category': gacategory,
                    'price': gaprice,
                    'quantity': 1,
                });
                ga('ec:setAction', 'add');
                ga('send', 'event', 'UX', 'click', 'add to cart');
                setTimeout(function() {
                    $('.cartlist-out').fadeOut(300);
                    $('#icon-top').hide();
                }, 5000);
            },
            error: function() {}
        });
    }

    $("#addcartlist #addcart").each(function(i) {
        if ($(window).width() > 768) {
            $(this).on('click', function() {
                // console.log($(this).parent().parent().find('#goods-ga').attr('data-id'))
                var gasku = $(this).parent().parent().find('#goods-ga').attr('data-sku');
                var ganame = $(this).parent().parent().find('#goods-ga').attr('data-name');
                var gacategory = $(this).parent().parent().find('#goods-ga').attr('data-category');
                var gaposition = $(this).parent().parent().find('#goods-ga').attr('data-position');
                var galist = $(this).parent().parent().find('#goods-ga').attr('data-list');
                var gaprice = $(this).parent().parent().find('#goods-ga').attr('data-price');
                goodsnum = $('#goodsnum').val();
                // console.log(goodsnum);
                if (goodsnum == '' || goodsnum == undefined) {
                    qtynumber = 1;
                } else {
                    qtynumber = parseInt(goodsnum);
                }
                // console.log(goodsnum)
                goodsid = parseInt($(this).attr('name'));
                // console.log(qtynumber + ',' + goodsid + ',' + gasku + ',' + gaprice + ',' + ganame + ',' + gacategory + ',' + gaposition + ',' + galist)
                // if (navigator.userAgent.indexOf("neutron") >= 0) {
                //     window.location = 'HomeBA://action=addtocart?id=' + goodsid + '';
                // } else {
                addcart(qtynumber, goodsid, gasku, gaprice, ganame, gacategory, gaposition, galist);
                // }
            });
        } else {
            return false;
        }
    });
    if ($("#addbuylist").length > 0) {
        $("#addbuylist #addbuy").each(function(i) {
            $(this).on('click', function() {
                // console.log($(this).parent().parent().parent().parent().find('#goods-ga').attr('data-sku'))
                var gasku = $(this).parent().parent().parent().parent().find('#goods-ga').attr('data-sku');
                var ganame = $(this).parent().parent().parent().parent().find('#goods-ga').attr('data-name');
                var gacategory = $(this).parent().parent().parent().parent().find('#goods-ga').attr('data-category');
                var gaposition = $(this).parent().parent().parent().parent().find('#goods-ga').attr('data-position');
                var galist = $(this).parent().parent().parent().parent().find('#goods-ga').attr('data-list');
                var gaprice = $(this).parent().parent().parent().parent().find('#goods-ga').attr('data-price');
                goodsnum = $('#goodsnum').val();
                // console.log(goodsnum);
                if (goodsnum == '' || goodsnum == undefined) {
                    qtynumber = 1;
                } else {
                    qtynumber = parseInt(goodsnum);
                }
                // console.log(goodsnum)
                goodsid = parseInt($(this).attr('name'));
                console.log(qtynumber + ',' + goodsid + ',' + gasku + ',' + gaprice + ',' + ganame + ',' + gacategory + ',' + gaposition + ',' + galist)
                addcart(qtynumber, goodsid, gasku, gaprice, ganame, gacategory, gaposition, galist);
            });
        });
    }
    $("#addcartlist #goods-ga").each(function(i) {
        $(this).on('click', function(event) {
            event.preventDefault();
            var gasku = $(this).attr('data-sku');
            var ganame = $(this).attr('data-name');
            var gacategory = $(this).attr('data-category');
            var gaposition = $(this).attr('data-position');
            var galist = $(this).attr('data-list');
            goodsga(gasku, ganame, gacategory, gaposition, galist);
            var href = $(this).attr('href');
            ga('send', 'event', 'UX', 'click', 'Results', {
                hitCallback: function() {
                    document.location = href;
                }
            });
            return !ga.loaded;
        });
    });
    $("#addcartlist #goods-title").each(function(i) {
        $(this).on('click', function(event) {
            event.preventDefault();
            var gasku = $(this).parent().parent().find('#goods-ga').attr('data-sku');
            var ganame = $(this).parent().parent().find('#goods-ga').attr('data-name');
            var gacategory = $(this).parent().parent().find('#goods-ga').attr('data-category');
            var gaposition = $(this).parent().parent().find('#goods-ga').attr('data-position');
            var galist = $(this).parent().parent().find('#goods-ga').attr('data-list');
            goodsga(gasku, ganame, gacategory, gaposition, galist);
            var href = $(this).attr('href');
            ga('send', 'event', 'UX', 'click', 'Results', {
                hitCallback: function() {
                    document.location = href;
                }
            });
            return !ga.loaded;
        });
    });

    function goodsga(gasku, ganame, gacategory, gaposition, galist) {
        // console.log(gaid+','+ganame+','+gacategory+','+gaposition+','+galist)
        ga('ec:addProduct', {
            'id': gasku,
            'name': ganame,
            'category': gacategory,
            'position': gaposition
        });
        ga('ec:setAction', 'click', {
            'list': galist
        });
    }
    $("#goods-addcart #addcart").each(function(i) {
        $(this).on('click', function() {
            var gasku = $(this).attr('data-sku');
            var ganame = $(this).attr('data-name');
            var gacategory = $(this).attr('data-category');
            var gaposition = $(this).attr('data-position');
            var galist = $(this).attr('data-list');
            var gaprice = $(this).attr('data-price');
            goodsnum = $('#goodsnum').val();
            // console.log(goodsnum);
            if (goodsnum == '' || goodsnum == undefined) {
                qtynumber = 1;
            } else {
                qtynumber = parseInt(goodsnum);
            }
            // console.log(goodsnum)
            goodsid = parseInt($(this).attr('name'));
            var gasku = $(this).attr('data-sku');
            var gaprice = $(this).attr('data-price');
            // console.log(gasku+'++++'+gaprice)
            if (navigator.userAgent.indexOf("neutron") >= 0) {
                // alert(1)
                window.location = 'HomeBA://action=addtocart?id=' + goodsid + '';
            } else {
                // alert(2)
                addcart(qtynumber, goodsid, gasku, gaprice, ganame, gacategory, gaposition, galist);
            }
        });
    });
    $('#but-keytobuy').on('click', function() {
        var brands = '';
        var goodscount = 1;
        var goodsid = "";
        var a = 0;
        var j = $("#keytobuy .swiper-slide").length - 1;
        $("#keytobuy .swiper-slide input[name='keytobuy_cart']").each(function(i) {
            var gasku = $(this).parent().find('#goods-ga').attr('data-sku');
            var gaprice = $(this).parent().find('#goods-ga').attr('data-price');
            var ganame = $(this).parent().find('#goods-ga').attr('data-name');
            var gacategory = $(this).parent().find('#goods-ga').attr('data-category');
            var gaposition = $(this).parent().find('#goods-ga').attr('data-position');
            var galist = $(this).parent().find('#goods-ga').attr('data-list');
            // console.log(gasku+'++++'+gaprice)
            a = i + 1;
            goodsid = $(this).val();

            if (a == j) {
                brands = brands + goodsid;
            } else {
                brands = brands + goodsid + ','
            }
            // console.log(a + '==' + j)
            addga(gasku, gaprice, ganame, gacategory, gaposition, galist);
        });
        // console.log(brands)
        addBuyAllCart(goodscount, brands);
    });

    function addga(gasku, gaprice, ganame, gacategory, gaposition, galist) {
        fbq('track', 'AddToCart', {
            content_ids: gasku,
            content_type: 'product',
            value: gaprice,
            currency: 'USD'
        });
        ga('ec:addProduct', {
            'id': gasku,
            'name': ganame,
            'category': gacategory,
            'price': gaprice,
            'quantity': 1,
        });
        ga('ec:setAction', 'add');
        ga('send', 'event', 'UX', 'click', 'add to cart');
    }

    function addBuyAllCart(qty, id) {
        $.ajax({
            type: 'post',
            url: '/api/cartitem/',
            data: {
                qty: qty,
                goods: id
            },
            beforeSubmit: function() {
                //让提交按钮失效，以实现防止按钮重复点击
                $('#addcart').attr('disabled', 'disabled');
            },
            complete: function() {
                //让按钮重新有效
                $('#addcart').removeAttr('disabled');
            },
            success: function(json) {
                $('#dropcart1 b').show();
                // console.log(json.item_count)
                $('#dropcart1 b').text(json.item_count);
                cartnew();
                $('#icon-top').show();
                setTimeout(function() {
                    $('.cartlist-out').fadeOut(300);
                    $('#icon-top').hide();
                }, 5000);
            },
            error: function() {}
        });
    }
});