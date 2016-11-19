function ordercancel(ordersn, orderid) {
    var str = '<div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="order-verify"><h4>Cancel Order</h4><p>Would you like to cancel this order？</p><div class="modal-btn"><div class="check-but1"><button type="button" id="orderss" class="btn modal-black btn-block" onclick="orderajax(' + ordersn + ',' + orderid + ')">YES</button></div><div class="check-but2"><button type="button" class="btn modal-black btn-block" data-dismiss="modal">NO</button></div></div></div></div>';
    $('.ordercancel').html(str);
}

function ordercancel2(ordersn, orderid) {
    var str = '<div class="modal fade" id="orderModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="order-verify-small"><h4>Cancel Order</h4><p>Would you like to cancel this order？</p><div class="modal-btn"><div class="check-but1"><button type="button" id="ordersn" class="btn modal-black btn-block modal-black-height" onclick="orderajax(' + ordersn + ',' + orderid + ')">YES</button></div><div class="check-but2"><button type="button" class="btn modal-black btn-block modal-black-height" data-dismiss="modal">NO</button></div></div></div></div>';
    $('.ordercancel').html(str);
}

function orderajax(ordersn, orderid) {
    $.ajax({
        url: '/api/order/' + ordersn + '/cancel/',
        type: 'POST',
        success: function(data) {
            var str = '<li><a href="/account/order/' + ordersn + '/" class="order-view">View details</a></li>';
            var btnstr = '<a href="/account/order/' + ordersn + '/"  class="btn btn-green-big">View details</a>';
            $('#view_' + orderid).html(str)
            $('#btn_' + orderid).html(btnstr)
            $('#orderModal').modal('hide')
            $('#orderModal2').modal('hide')
        },
        error: function(data) {}
    })
}

$(function() {

    $('#order-list .order-box').each(function() {
        var total = parseInt($(this).find("#order-total").text());
        var money = 0;
        var dd = $(this).find("#order-box-dd");

        $.ajax({
            type: 'GET',
            url: '/api/specialgift/',
            success: function(json) {
                // console.log(json.count)
                var cartlist = '';
                $.each(json.results, function(i, item) {
                    // console.log(item.image + '==' + item.title + '==' + item.min_money)
                    // console.log(item.min_money + '==' + total)
                    money = parseInt(item.min_money);
                    if (total > money) {
                        // alert(1)
                        // console.log('<div class="col-md-4 col-xs-4 order-box-top"><img src="' + item.image + '" alt="' + item.title + '"></div>')
                        cartlist = '<img src="' + item.image + '" alt="' + item.title + '"><div class="order-tag"><img src="http://10.1.2.140:8000/static/shop/i/homeba-photo/specialgift.png"></div>';
                        dd.html(cartlist);
                    }
                });
            },
            error: function() {}
        });
    })

    orderTotal();

    function orderTotal() {
        var ordertotal = parseInt($("#order-total").text());
        var money = 0;
        $.ajax({
            type: 'GET',
            url: '/api/specialgift/',
            success: function(json) {
                // console.log(json.count)
                var cartlist = '';
                $.each(json.results, function(i, item) {
                    money = parseInt(item.min_money);
                    if (ordertotal > money) {
                        cartlist = '<div class="col-sm-3 col-xs-3 items-img"><img src="' + item.image + '" alt="' + item.title + '"><div class="order-tag"><img src="http://10.1.2.140:8000/static/shop/i/homeba-photo/specialgift.png"></div></div><div class="col-sm-6 col-xs-6 padding-lr"><h4>' + item.title + '</h4><p><em>x 1</em><strong></strong></p></div><div class="col-sm-3 col-xs-3 orderinfo-top"><span>$ 0.00</span></div>';
                        $('#order-box-aa').html(cartlist);
                    }
                });
            },
            error: function() {}
        });
    }

    if ($("#order-address1").length > 0) {
        var address1 = $("#order-address1").attr('value');
        var arr1 = address1.split("\n");
        $("#order-address1").text(arr1[0]);
        $("#order-address2").text(arr1[1]);
    }

    $('.btn-white').on('click', function() {
        $('body').css('padding-right', '0px');
        $('#myModal').css('padding-right', '0px');
        $('#myModal2').css('padding-right', '0px');
    })
    $('.modal-close').on('click', function() {
        $('.navbar-padding').css('padding-right', '0px');
    })

    $('#orderss').on('click', function() {
        var ss = $('#orderss').attr('value')
        ordersn(ss)
    })
    $('#ordersn').on('click', function() {
        var sn = $('#ordersn').attr('value')
        ordersn(sn)
    })

    function ordersn(ordersn) {
        $.ajax({
            url: '/api/order/' + ordersn + '/cancel/',
            type: 'POST',
            success: function(data) {
                var str = '<div class="check-full"><a href="mailto:support@homeba.in" class="btn btn-green btn-block">Contact Us</a></div>';
                var btnstr = '<a href="mailto:support@homeba.in" class="btn btn-green btn-lg btn-block">Contact Us</a>';
                $('#btn-ordersn').html(str)
                $('#btn-orderss').html(btnstr)
                $('#pay-orderss').empty()
                if ($('#myModal2').attr('class') == 'modal fade in') {
                    $('#myModal2').modal('hide')
                    $('.navbar-padding').css('padding-right', '0px');
                } else {
                    $('#myModal').modal('hide')
                    $('.navbar-padding').css('padding-right', '0px');
                }
            },
            error: function(data) {}
        })
    }
})