$(function() {
    var num = 1;
    var dd = 0;
    var sum = parseFloat(dd).toFixed(2);
    var add = 0;
    var dd = '';
    var goodsnum1 = 0;
    var goodsnum2 = 0;
    var discount = 0;
    var discountprice = 0;

    purchase();

    function purchase() {
        $.ajax({
            type: 'GET',
            url: '/api/specialgift/',
            success: function(json) {
                // console.log(json.count)
                var cartlist = '';
                $.each(json.results, function(i, item) {
                    // console.log(item.image + '==' + item.title + '==' + item.min_money)
                    cartlist = '<div class="container purchase"><div class="row margin-lr"><div class="col-xs-10 col-md-10 padding-lr"><i>!</i><p>' + item.title + '</p></div><div class="col-xs-2 col-md-2 padding-lr"><span id="purchase">X</span></div></div></div>';
                    $('.purchase-box').html(cartlist);

                    $('#purchase').on('click', function() {
                        $('.purchase-box').hide();
                    })
                });
            },
            error: function() {}
        });
    }

    $('#cartCoupon').hide();

    $('#promotionbut').on('click', function() {
        if ($('#promotioncode').attr('disabled') == "disabled") {
            inviteCode()
        } else {
            var code = $('#promotioncode').val();
            var subtotal = parseFloat($('#shoptotal').text()).toFixed(2);
            // console.log(subtotal)
            promotion(code, subtotal)
        }
    })

    $('#promotioncode').keyup(function() {
        if ($('#promotioncode').val() == '') {
            $('.promotion-code p').text('This field may not be blank')
        } else {
            $('.promotion-code p').text('')
        }
    })

    function promotion(code, subtotal) {
        $.ajax({
            url: '/api/cart/coupon/',
            type: 'post',
            data: {
                coupon_code: code,
                subtotal: subtotal
            },
            success: function(json) {
                // console.log(json.invite_discount_min)
                // console.log(json)
                discountprice = json.discount_price;
                discount = json.invite_discount_min;
                var shoptotal = $('#total').text();
                var total = (parseFloat(shoptotal) - parseFloat(json.discount_price)).toFixed(2);
                $('#cartCoupon').show();
                var coupon = '<span class="">Coupon</span><span>- $ <em>' + parseFloat(json.discount_price).toFixed(2) + '</em></span>';
                $('#promotioncode').attr('disabled', 'disabled');
                $('#cartCoupon').html(coupon);
                $('[id=total]').html(total)
                $('#promotionbut').text("Remove");
                $('#promotioncoupon').val(code);
                $('.promotion-code p').text('')
            },
            error: function(json) {
                // console.log(json)
                var obj = $.parseJSON(json.responseText);
                // console.log(obj)
                $('.promotion-code p').html(obj.detail);
            }
        });
    }

    function inviteCode() {
        var shoptotal = (parseFloat($('#total').text()) + parseFloat(discountprice)).toFixed(2);
        $('#cartCoupon').hide();
        $('#promotioncode').removeAttr('disabled');
        $('#promotioncode').val("");
        $('#promotionbut').text("Add");
        $('[id=total]').html(shoptotal)
        $('#promotioncoupon').val("");
    }

    function cartnumber(itemsid, goodsnum) {
        $.ajax({
            url: '/api/cartitem/' + itemsid + '/',
            method: 'PATCH',
            data: 'qty=' + goodsnum,
            success: function(json) {
                var sum = parseFloat(json.cart_total).toFixed(2);
                var total = parseFloat(json.cart_amount).toFixed(2);
                $("#subtotal" + itemsid).html(parseFloat(json.subtotal).toFixed(2));
                // $('.cartitems-list span').each(function(i) {
                //     sum = (parseFloat(sum) + parseFloat($(this).text())).toFixed(2);
                //     // console.log()
                // })
                // inviteDiscount(sum)

                if (discount > sum) {
                    total = (parseFloat(total) - 0).toFixed(2);
                    inviteCode()
                } else {
                    if ($('#cartCoupon').css('display') == 'none') {
                        total = (parseFloat(total) - 0).toFixed(2);
                    } else {
                        total = (parseFloat(total) - parseFloat($('#cartCoupon em').text())).toFixed(2);
                    }
                }
                // console(json)
                $('#shopsave').html(parseFloat(json.cart_money_off_total).toFixed(2));

                if (json.cart_money_off_total == 0) {
                    $('#ordertotal-save').css('display', 'none');
                } else {
                    $('#ordertotal-save').css('display', 'block');
                }

                // console.log(total)
                // $('#shoptotal').html(sum);
                // $('#total').html(total);

                // console.log('111' + total)

                $('#shoptotal').html(sum);
                $('[id=total]').html(total);
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
            goodsnum1 = parseInt($(this).parent().find("input").val());
            // console.log(goodsnum2)
            if (goodsnum1 <= num) {
                return false;
            } else {
                goodsnum1 = goodsnum1 - num;
                $(this).parent().find("input").val(goodsnum1);
                cartnumber(itemsid, goodsnum1);
                // console.log(goodsnum1)
            }
        });

        $(this).parent().find(".add").on('click', function() {
            itemsid = $(this).parent().parent().parent().find("u").attr('value');
            goodsnum2 = parseInt($(this).parent().find("input").val());
            goodsnum2 = goodsnum2 + num;
            $(this).parent().find("input").val(goodsnum2);
            cartnumber(itemsid, goodsnum2);
            // console.log(goodsnum2)
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

        // $(this).parent().find("input").attr("checked", true);

        if ($(this).parent().find("input").attr("checked") == 'checked') {
            // alert(1)
            $(this).parent().find("label").addClass('regular-checked');
        } else {
            $(this).parent().find("label").addClass('regular-label');
        }
        // add = parseFloat($(this).parent().parent().parent().find("span").text()).toFixed(2);
        // sum = (parseFloat(sum) + parseFloat(add)).toFixed(2);
        // console.log(sum)
        // console.log($(this).parent().find("input").attr('value'))
        $(this).parent().parent().parent().find("u").on("click", function() {
            // console.log('radio---' + $(this).parent().parent().parent().parent().parent().parent().parent().find(".regular-radio").attr('checked'));
            var itemsid = parseInt($(this).attr('value'));
            var items = '#items' + itemsid;
            var total = 0;
            // if ($(this).parent().parent().parent().parent().parent().parent().parent().find(".regular-radio").attr('checked') == 'checked') {
            //     add1 = parseFloat($(this).parent().parent().parent().find("span").text()).toFixed(2);
            // } else {
            //     add1 = 0;
            // }
            // var dd2 = parseFloat($('#total').text()).toFixed(2);
            // var dd3 = parseFloat($('#shoptotal').text()).toFixed(2);
            // console.log(dd3 + '---' + add1)

            $.ajax({
                url: '/api/cartitem/' + itemsid + '/',
                method: 'DELETE',
                success: function(json) {
                    console.log(json)
                    var sum = parseFloat(json.cart_total).toFixed(2);
                    var total = parseFloat(json.cart_amount).toFixed(2);
                    $('' + items + '').remove();

                    $('#dropcart1 b').html(json.item_count);
                    $('[id=cart-count] b').html(json.item_count);

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
                    // sum = (parseFloat(dd3) - parseFloat(add1)).toFixed(2);
                    // alert(dd2 + '===' + add1)
                    if (discount > sum) {
                        total = (parseFloat(total) - 0).toFixed(2);
                        inviteCode()
                    } else {
                        if ($('#cartCoupon').css('display') == 'none') {
                            total = (parseFloat(total) - 0).toFixed(2);
                        } else {
                            total = (parseFloat(total) - parseFloat($('#cartCoupon em').text())).toFixed(2);
                        }
                    }

                    $('#shopsave').html(parseFloat(json.cart_money_off_total).toFixed(2));
                    if (json.cart_money_off_total == 0) {
                        $('#ordertotal-save').css('display', 'none');
                    } else {
                        $('#ordertotal-save').css('display', 'block');
                    }

                    // console.log('第二次sum：' + sum)
                    // console.log('第二次add1：' + add1)

                    $('#shoptotal').html(sum);
                    $('[id=total]').html(total);

                    if ($('.cartitems-list .cart-radio').length < 1) {
                        $('.purchase').hide();
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
            var selected = '';
            var selectedid = $(this).parent().find("input").attr("value");
            if ($(this).parent().find("input").attr("checked") == 'checked') {
                $(this).parent().find("input").attr("checked", false);
                $(this).parent().find("label").removeClass('regular-checked');
                $(this).parent().find("label").addClass('regular-label');
                // alert($(this).parent().find("input").attr("checked"));

                selected = 'false';
                cartselected(selectedid, selected);
                // dd = parseFloat($(this).parent().parent().parent().parent().find("span").text()).toFixed(2);
                // sum = (parseFloat($('#shoptotal').text()) - parseFloat(dd)).toFixed(2);
                // console.log(sum + '>' + dd)

                // $('#shoptotal').html(sum);
                // if (discount > sum) {
                //     sum = (parseFloat(sum) - 0).toFixed(2);
                //     inviteCode()
                // } else {
                //     if ($('#cartCoupon').css('display') == 'none') {
                //         sum = (parseFloat(sum) - 0).toFixed(2);
                //     } else {
                //         sum = (parseFloat(sum) - parseFloat($('#cartCoupon em').text())).toFixed(2);
                //     }
                // }
                // console.log('111' + parseFloat(sum));
            } else {
                $(this).parent().find("input").attr("checked", true);
                $(this).parent().find("label").removeClass('regular-label');
                $(this).parent().find("label").addClass('regular-checked');
                // alert($(this).parent().find("input").attr("checked"))
                selected = 'true';
                cartselected(selectedid, selected);
                // dd = parseFloat($(this).parent().parent().parent().parent().find("span").text()).toFixed(2);
                // sum = (parseFloat($('#shoptotal').text()) + parseFloat(dd)).toFixed(2);

                // $('#shoptotal').html(sum);

                // if ($('#cartCoupon').css('display') == 'none') {
                //     sum = (parseFloat(sum) - 0).toFixed(2);
                // } else {
                //     sum = (parseFloat(sum) - parseFloat($('#cartCoupon em').text())).toFixed(2);
                // }
                // console.log('222' + parseFloat(sum));
            }
            // $('#total').html(sum);

        });
        // console.log(sum);
    });

    function cartselected(selectedid, selected) {
        $.ajax({
            url: '/api/cartitem/' + selectedid + '/',
            method: 'PATCH',
            data: {
                selected: selected
            },
            success: function(json) {
                // console.log(json)
                var sum = parseFloat(json.cart_total).toFixed(2);
                var total = parseFloat(json.cart_amount).toFixed(2);
                // var sum = json.cart_amount;
                if (discount > sum) {
                    total = (parseFloat(total) - 0).toFixed(2);
                    inviteCode()
                } else {
                    if ($('#cartCoupon').css('display') == 'none') {
                        total = (parseFloat(total) - 0).toFixed(2);
                    } else {
                        total = (parseFloat(total) - parseFloat($('#cartCoupon em').text())).toFixed(2);
                    }
                }
                $('#shoptotal').html(sum);
                $('[id=total]').html(total);
            }
        });
    }

    // $('#shoptotal').html(sum);
    // $('#total').html(sum);

});