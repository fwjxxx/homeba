$(function() {
    var num = 1;
    var dd = 0;
    var sum = parseFloat(dd).toFixed(2);
    var add = 0;
    var dd = '';

    function cartnumber(itemsid, goodsnum) {
        $.ajax({
            url: '/api/cartitem/' + itemsid + '/',
            method: 'PUT',
            data: 'qty=' + goodsnum,
            success: function(json) {
                var sum = 0;
                $("#subtotal" + itemsid).html(parseFloat(json.subtotal).toFixed(2));
                $('.cartitems-list span').each(function(i) {
                    sum = (parseFloat(sum) + parseFloat($(this).text())).toFixed(2);
                    // console.log()
                })
                $('#shoptotal').html(sum);
            },
            error: function() {}
        });
    }

    $('.cartitems-list .input-group').each(function(i) {
        var goodsnum = parseInt($(this).parent().find("input").val());
        var itemsid;

        $(this).parent().find("input").keyup(function() {
            var tmptxt = $(this).val();
            itemsid = parseInt($(this).parent().find("input").attr('data-id'));
            $(this).val(tmptxt.replace(/\D|^0/g, ''));
            if ($(this).parent().find("input").val() == '') {
                $(this).parent().find("input").val(1);
                goodsnum = 1;
                cartnumber(itemsid, goodsnum);
            } else {
                goodsnum = parseInt($(this).parent().find("input").val());
                cartnumber(itemsid, goodsnum);
            }
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            itemsid = parseInt($(this).parent().find("input").attr('data-id'));
            $(this).val(tmptxt.replace(/\D|^0/g, ''));
            if ($(this).parent().find("input").val() == '') {
                $(this).parent().find("input").val(1);
                goodsnum = 1;
                cartnumber(itemsid, goodsnum);
            } else {
                goodsnum = parseInt($(this).parent().find("input").val());
                cartnumber(itemsid, goodsnum);
            }
        });

        $(this).parent().find(".cut").on('click', function() {
            itemsid = $(this).parent().parent().parent().find("u").attr('value');
            if (goodsnum <= num) {
                return false;
            } else {
                goodsnum = goodsnum - num;
                $(this).parent().find("input").val(goodsnum);
                cartnumber(itemsid, goodsnum);
            }
        });

        $(this).parent().find(".add").on('click', function() {
            itemsid = $(this).parent().parent().parent().find("u").attr('value');
            goodsnum = goodsnum + num;
            $(this).parent().find("input").val(goodsnum);
            cartnumber(itemsid, goodsnum);
        });
    });

    function cartnull() {
        if ($('.menu-cart li').length > 0) {
            $('#dropcart').mouseover(function() {
                $(this).addClass('open');
                $('#icon-top').show();
            }).mouseout(function() {
                $(this).removeClass('open');
                $('#icon-top').hide();
            });
        }
    }

    function cartnew() {
        $.ajax({
            type: 'GET',
            url: '/api/cart/',
            success: function(json) {
                var cartlist = '';
                $.each(json, function(i, item) {
                    $.each(item.items, function(j, val) {
                        // console.log(val.goods.price)
                        cartlist += '<li><dl class="clear"><dt><a href="/goods/' + val.goods.brow + '.html"><img src="' + val.goods.picture.phone + '"></a></dt><dd><h4><a href="{/goods/' + val.goods.brow + '.html">' + val.goods.title + '</a></h4><p><span>X' + val.qty + '</span><strong>$ ' + val.goods.price + '</strong></p></dd></dl></li>';
                    });
                });
                $('.menu-cart').html(cartlist);

                cartnull();

            },
            error: function() {}
        });
    }

    cartcount();

    function cartcount() {
        var cartcount = $('#dropcart1 b').text();
        if (cartcount < 1) {
            $('#dropcart1 b').hide();
        }
    }

    $('.cartitems-list .cart-radio').each(function(i) {
        if ($(window).width() == 768) {
            if ($('.cartitems-list .cart-radio').length < 2) {
                $('#cartitems-list').css('padding-bottom', '200px');
            }
        } else {
            if ($('.cartitems-list .cart-radio').length < 2) {
                $('#cartitems-list').css('padding-bottom', '110px');
            }
        }
        $(this).parent().find("input").attr("checked", true);
        $(this).parent().find("label").addClass('regular-checked');
        add = parseFloat($(this).parent().parent().parent().find("span").text()).toFixed(2);
        sum = (parseFloat(sum) + parseFloat(add)).toFixed(2);
        // console.log($(this).parent().find("input").attr('value'))
        $(this).parent().parent().parent().find("u").on("click", function() {
            // console.log('radio---' + $(this).parent().parent().parent().parent().parent().parent().parent().find(".regular-radio").attr('checked'));
            var itemsid = parseInt($(this).attr('value'));
            var items = '#items' + itemsid;
            if ($(this).parent().parent().parent().parent().parent().parent().parent().find(".regular-radio").attr('checked') == 'checked') {
                add1 = parseFloat($(this).parent().parent().parent().find("span").text()).toFixed(2);
            } else {
                add1 = 0;
            }
            $.ajax({
                url: '/api/cartitem/' + itemsid + '/',
                method: 'DELETE',
                success: function(json) {
                    $('' + items + '').remove();

                    $('#dropcart1 b').html(json.item_count);
                    $('#cart-count b').html(json.item_count);

                    cartcount();

                    if ($(window).width() == 768) {
                        if ($('.cartitems-list .cart-radio').length < 2) {
                            $('#cartitems-list').css('padding-bottom', '200px');
                        }
                    } else {
                        if ($('.cartitems-list .cart-radio').length < 2) {
                            $('#cartitems-list').css('padding-bottom', '110px');
                        }
                    }
                    // console.log('第一次sum：' + sum)
                    // console.log('第一次add1：' + add1)
                    sum = (parseFloat(sum) - parseFloat(add1)).toFixed(2);
                    // console.log('第二次sum：' + sum)
                    // console.log('第二次add1：' + add1)
                    $('#shoptotal').html(sum);

                    if ($('.cartitems-list .cart-radio').length < 1) {
                        $('.cart-checkout').remove();
                        var cartempty = '<div class="container-fluid body-gray collect padding-lr"><div class="collect-blank"><i class="icon-homebaicon_-29"></i><h3>You shopping cart is empty</h3><a href="">Start Shopping</a></div></div>';
                        $('#cart-review').html(cartempty);
                        $('.cartlist-out').hide();
                        $('#icon-top').hide();
                    }

                    cartnew();

                }
            });
        });

        $(this).parent().find("label").on("click", function() {
            if ($(this).parent().find("input").attr("checked") == 'checked') {
                $(this).parent().find("input").attr("checked", false);
                $(this).parent().find("label").removeClass('regular-checked');
                $(this).parent().find("label").addClass('regular-label');
                dd = parseFloat($(this).parent().parent().parent().parent().find("span").text()).toFixed(2);
                sum = (parseFloat(sum) - parseFloat(dd)).toFixed(2);
                // console.log(parseFloat(sum));
            } else {
                $(this).parent().find("input").attr("checked", true);
                $(this).parent().find("label").removeClass('regular-label');
                $(this).parent().find("label").addClass('regular-checked');
                dd = parseFloat($(this).parent().parent().parent().parent().find("span").text()).toFixed(2);
                sum = (parseFloat(sum) + parseFloat(dd)).toFixed(2);
                // console.log(parseFloat(sum));
            }
            $('#shoptotal').html(sum);

        });
        // console.log(sum);
    });
    $('#shoptotal').html(sum);

});