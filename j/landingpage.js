$(function() {
    var goodsid = '';
    var dataurl = '';
    var gbsid = '';
    var dburl = '';

    if (navigator.userAgent.indexOf("neutron") >= 0) {
        // alert(1)
        $('#homeba-nav').hide();
        $('.container-top').css('padding', '0px');
        $('.breadcrumb').hide();
        $('.body-newsletter').hide();
        $('.main-footer').hide();
        $('.landingpage-picture').hide();
        $('.landingpage-navlist').hide();
    }

    $("#landingpage-list #goods-ga").each(function(i) {
        $(this).on('click', function(event) {
            goodsid = $(this).attr('name');
            dataurl = $(this).attr('data-url');
            // console.log(goodsid)
            if (navigator.userAgent.indexOf("neutron") >= 0) {
                self.location = 'HomeBA://action=goodsDetail?id=' + goodsid + '';
            } else {
                window.open(dataurl);
            }
        })
    })

    $("#landingpage-list #goods-gb").each(function(i) {
        $(this).on('click', function(event) {
            gbsid = $(this).attr('name');
            dburl = $(this).attr('data-url');
            // console.log(gbsid)
            if (navigator.userAgent.indexOf("neutron") >= 0) {
                self.location = 'HomeBA://action=goodsDetail?id=' + gbsid + '';
            } else {
                window.open(dburl);
            }
        })
    })
})