$(function() {
    var num = 1;
    var sum = parseInt(num)
    var add = 0;
    var goodsnum = parseInt($('#goodsnum').val());

    if (navigator.userAgent.indexOf("neutron") >= 0) {
        // alert(1)
        $('#homeba-nav').hide();
        $('.container-top').hide();
        $('.body-newsletter').hide();
        $('.main-footer').hide();
    }

    $("input[name='goodsnum']").keyup(function() {
        var tmptxt = $(this).val();
        $(this).val(tmptxt.replace(/\D|^0/g, ''));
        if ($('#goodsnum').val() == '') {
            $('#goodsnum').val(1)
        } else {
            goodsnum = parseInt($('#goodsnum').val());
        }
    }).bind("paste", function() {
        var tmptxt = $(this).val();
        $(this).val(tmptxt.replace(/\D|^0/g, ''));
        if ($('#goodsnum').val() == '') {
            $('#goodsnum').val(1)
        } else {
            goodsnum = parseInt($('#goodsnum').val());
        }
    });
    // var goodsnum = parseInt($('#goodsnum').val());
    $('#press-cut').on('click', function() {
        if (goodsnum <= num) {
            return false;
        } else {
            goodsnum = goodsnum - num;
            $('#goodsnum').val(goodsnum);
            console.log(goodsnum)
        }
    })
    $('#press-add').on('click', function() {
        goodsnum = goodsnum + num;
        $('#goodsnum').val(goodsnum);
        console.log(goodsnum)
    })
    var goodswishimg = $('#goodswish-img').attr('value')
    var goodswishurl = $('#goodswish-img').attr('name')
    $('#wish').on('click', function() {
        var wishid = $('#wish').attr('value');
        var time = null;
        var time1 = null;
        if ($('#wish').attr('class') == 'btn btn-desc') {
            $.ajax({
                type: 'post',
                url: '/api/goods/' + wishid + '/desire/',
                success: function(json) {
                    $('#wish').addClass('btn-orange');
                    var str = '<i class="icon-homebaicon-10"></i><span>Wish</span>';
                    var str1 = '<i class="glyphicon glyphicon-triangle-top arrow-top"></i><h4><img src="' + goodswishimg + '" /><strong>Added</strong></h4><p><a href="' + goodswishurl + '">Go to My WishList</a></p>';
                    $('#wish').html(str);
                    $('.wish-box').html(str1);
                    $('.wish-box').show();
                    time = setTimeout(function() {
                        $('.wish-box').hide();
                    }, 2000);
                },
                error: function() {}
            });
        } else {
            $.ajax({
                type: 'DELETE',
                url: '/api/goods/' + wishid + '/desire/',
                success: function(json) {
                    $('#wish').removeClass('btn-orange');
                    var str = '<i class="icon-homebaicon-10"></i><span>Wish</span>';
                    var str1 = '<i class="glyphicon glyphicon-triangle-top arrow-top"></i><h4 class="h4-top"><b class="icon-homebaicon-10"></b><strong>Canceled</strong></h4>';
                    $('#wish').html(str);
                    $('.wish-box').html(str1);
                    $('.wish-box').show();
                    time1 = setTimeout(function() {
                        $('.wish-box').hide();
                    }, 2000);
                },
                error: function() {}
            });
        }
        clearTimeout(time)
        clearTimeout(time1)
    })
})