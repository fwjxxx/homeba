$(function() {
    var goodsid = '';
    var dataurl = '';
    $("#landingpage-list #goods-ga").each(function(i) {
        $(this).on('click', function(event) {
            goodsid = $(this).attr('name');
            dataurl = $(this).attr('data-url');
            console.log(goodsid)
            if (navigator.userAgent.indexOf("neutron") >= 0) {
                window.location = 'HomeBA://action=goodsDetail?id=' + goodsid + '';
            } else {
                window.location = dataurl;
            }
        })
    })
})