$(function() {
    var id = 0;
    var taddress = "";
    var taddress2 = "";
    var allvalue = $("#form-info").find("input[type='text']");

    specialgift();

    function specialgift() {
        var total = parseInt($('#reviewtotal').text());
        var money = 0;

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
                        cartlist = '<div class="row margin-lr row-line"><div class="col-xs-4 col-sm-4 order-img padding-l"><img src="' + item.image + '" alt="' + item.title + '"><div class="order-tag"><img src="http://10.1.2.140:8000/static/shop/i/homeba-photo/specialgift.png"></div></div><div class="col-xs-8 col-sm-8"><div class="row margin-lr order-title"><div class="col-sm-12 padding-lr order-h4"><h4 class="order-h4">' + item.title + '</h4></div></div><div class="row margin-lr order-price"><div class="col-xs-5 col-sm-5 padding-lr"></div><div class="col-xs-2 col-sm-2 padding-lr"><em class="order-em">x1</em></div><div class="col-xs-5 col-sm-5 padding-lr order-span"><span>$ 0.00</span></div></div></div></div>';
                        $('#specialgift').html(cartlist);
                    }
                });
            },
            error: function() {}
        });
    }

    function reviewEdit() {
        var firstname = $(".firstname").text();
        var lastname = $(".lastname").text();
        var address1 = $(".address").text();
        var address2 = $(".address2").text();
        var city = $(".city").text();
        var province = $(".province").text();
        var postcode = $(".postcode").text();
        var country = $(".country").text();
        var mobile = $(".mobile").text();
        var email = $(".shop-info-text .email").text();
        // console.log(email)
        $("#form-info input[name='firstname']").val(firstname);
        $("#form-info input[name='lastname']").val(lastname);
        $("#form-info input[name='city']").val(city);
        $("#form-info input[name='province']").val(province);
        $("#form-info input[name='postcode']").val(postcode);
        $("#form-info input[name='mobile']").val(mobile);
        $("#form-info input[name='email']").val(email);
        // console.log($("#form-info input[name='email']").val())
        // alert(address1 + '\n' + address2)
        $('#country span').text(country);
        $('#country-list li a').each(function(i) {
            if ($(this).text() == $.trim(country)) {
                var dd = $(this).attr('value');
                $("#form-info input[name='country']").val(dd);
            }
        });
        taddress = address1;
        taddress2 = address2;
        $("#form-info input[name='address1']").val(address1);
        $("#form-info input[name='address2']").val(address2);
        $("#form-info input[name='address']").val(address1 + '\n' + address2);
    }

    var address = $(".address").attr('value');
    var arr = address.split("\n");
    $(".address").text(arr[0]);
    $(".address2").text(arr[1]);

    var sum = $('.ordersummary .row-line').length;
    var num = 3;
    var countryList = '';
    var shoptext = '<button type="submit" id="ordercheck1" class="btn btn-orange btn-lg btn-block">Place Order</button>';
    // console.log(sum)
    if (sum > num) {
        $('.btn-hide').css('display', 'block')
        $('.ordersummary .row-line').each(function(i) {
            i++;
            if (num <= i) {
                $('.ordersummary .row-line').eq(i).hide();
            }
            // console.log(i)
        })
        $('.btn-hide').on('click', function() {
            $('.ordersummary .row-line').each(function(i) {
                $('.ordersummary .row-line').eq(i).show();
            })
            $('.btn-hide').css('display', 'none')
        })
    }
    if (!$('.shop-info-text').hasClass("hidden")) {
        $('.placeorder').html(shoptext);
        $('body').on('click', '#ordercheck1', function() {
            $('#orderSummary').submit();
        })
    }

    $('body').on('click', '#reviewedit', function() {
        $('.shop-info-text').addClass('hidden');
        $('#form-info').removeClass('hidden');
        $('#ordercheck').attr('disabled', 'disabled');
        $('.placeorder').html("");
        $(".reviewedit").html('')
            // $('#form-info').css('display', 'block');
        id = $(this).attr('name')
        reviewEdit()
    })

    // alert(addressid)
    $('#form-info').submit(function() {
        if (id == 0) {
            // alert(id)
            var options = {
                beforeSubmit: addresssub,
                type: 'POST',
                dataType: "json",
                complete: function() {
                    //让登陆按钮重新有效
                    $('#reviewcheck').removeAttr('disabled');
                },
                success: function(data) {
                    var str = null;
                    var edit = null;
                    var country = '';

                    // $("#form-info").hide();

                    $("#country-list li a").each(function() {
                        if ($(this).attr('value') == data.country) {
                            country = $(this).text()
                        }
                    })
                    var address = data.address;
                    console.log(address)
                    var arr = address.split("\n");
                    if (arr[1] == undefined) {
                        arr[1] = '';
                    }

                    edit = '<span id="reviewedit" name="' + data.id + '">Edit</span>';

                    str = '<div class="form-group margin-lr"><span class="firstname">' + data.firstname + '</span> <span class="lastname">' + data.lastname + '</span></div><div class="form-group margin-lr"><span class="address" value="' + data.address + '">' + arr[0] + '</span></div><div class="form-group margin-lr"><span class="address2">' + arr[1] + '</span></div><div class="form-group margin-lr"><span class="city">' + data.city + '</span>, <span class="province">' + data.province + '</span> <span class="postcode">' + data.postcode + '</span></div><div class="form-group margin-lr"><span class="country">' + country + '</span></div><div class="form-group margin-lr"><span class="mobile">' + data.mobile + '</span></div><div class="form-group margin-lr"><span class="email">' + data.email + '</span></div>';

                    $(".reviewedit").html(edit);
                    $(".shop-info-text").html(str);
                    $("#orderSummary input[name='address']").val(data.id);
                    $("#orderSummary input[name='bill_address']").val(data.id);
                    $('#ordercheck').removeAttr("disabled");
                    $('.placeorder').html(shoptext);
                    $('.shop-info-text').removeClass('hidden');
                    $('#form-info').addClass('hidden');

                },
                error: function(data) {
                    // console.log(data.responseText)
                    var obj = $.parseJSON(data.responseText);
                    for (name in obj) {
                        // console.log(name)
                        $("#form-info").find("input[type='text']").each(function(i) {
                            if ($("#form-info").find("input[type='text']").eq(i).attr("name") == name || $("#form-info").find("input[type='text']").eq(i).attr("name") == name + '1') {
                                for (var k = 0; k < obj[name].length; k++) {
                                    $(this).next().show();
                                    $(this).next().text(obj[name][k])
                                }
                            }
                        });
                    }

                }
            }
            $(this).ajaxSubmit(options);
        } else {
            // alert(id)
            var options1 = {
                beforeSubmit: addresssub,
                url: "/api/address/" + id + "/",
                type: 'PATCH',
                dataType: "json",
                complete: function() {
                    //让登陆按钮重新有效
                    $('#reviewcheck').removeAttr('disabled');
                },
                success: function(data) {
                    var str = null;
                    var country = '';

                    $("#country-list li a").each(function() {
                        if ($(this).attr('value') == data.country) {
                            country = $(this).text()
                        }
                    })
                    var address = data.address;
                    var arr = address.split("\n");
                    if (arr[1] == undefined) {
                        arr[1] = '';
                    }

                    edit = '<span id="reviewedit" name="' + data.id + '">Edit</span>';

                    str = '<div class="form-group margin-lr"><span class="firstname">' + data.firstname + '</span> <span class="lastname">' + data.lastname + '</span></div><div class="form-group margin-lr"><span class="address" value="' + data.address + '">' + arr[0] + '</span></div><div class="form-group margin-lr"><span class="address2">' + arr[1] + '</span></div><div class="form-group margin-lr"><span class="city">' + data.city + '</span>, <span class="province">' + data.province + '</span> <span class="postcode">' + data.postcode + '</span></div><div class="form-group margin-lr"><span class="country">' + country + '</span></div><div class="form-group margin-lr"><span class="mobile">' + data.mobile + '</span></div><div class="form-group margin-lr"><span class="email">' + data.email + '</span></div>';

                    $(".reviewedit").html(edit);
                    $(".shop-info-text").html(str);
                    $("#orderSummary input[name='address']").val(data.id);
                    $("#orderSummary input[name='bill_address']").val(data.id);
                    $('#ordercheck').removeAttr("disabled");
                    $('.placeorder').html(shoptext);
                    $('.shop-info-text').removeClass('hidden');
                    $('#form-info').addClass('hidden');

                },
                error: function(data) {
                    // console.log(data.responseText)
                    var obj = $.parseJSON(data.responseText);
                    for (name in obj) {
                        // console.log(name)
                        $("#form-info").find("input[type='text']").each(function(i) {
                            if ($("#form-info").find("input[type='text']").eq(i).attr("name") == name || $("#form-info").find("input[type='text']").eq(i).attr("name") == name + '1') {
                                for (var k = 0; k < obj[name].length; k++) {
                                    $(this).next().show();
                                    $(this).next().text(obj[name][k])
                                }
                            }
                        });
                    }

                }
            }
            $(this).ajaxSubmit(options1);
        }
        return false;
    });

    var options2 = {
        dataType: "json",
        beforeSubmit: function() {
            //让提交按钮失效，以实现防止按钮重复点击
            $('#ordercheck').attr('disabled', 'disabled');
        },
        complete: function() {
            //让按钮重新有效
            $('#ordercheck').removeAttr('disabled');
        },
        success: function(data) {
            window.location.href = '/payment/' + data.sn;
        },
        error: function(data) {
            var obj = $.parseJSON(data.responseText);

            // alert(obj.detail)
        }

    }

    $('#orderSummary').ajaxForm(options2);

    $('#country-list a').each(function(i) {
        $(this).on('click', function() {
            var index = $(this).index() + i;
            countryList = $(this).text();
            country = $(this).attr('value');
            $('#country span').html(countryList);
            $("#form-info").parent().find("strong").eq(3).hide()
            $("#form-info input[name='country']").val(country);
        })
    })

    $("#form-info").parent().find("strong").hide()

    $("input[name='address1']").blur(function() {
        taddress = $(this).val();
        $("#form-info input[name='address']").val(taddress + '\n' + taddress2);
    });
    $("input[name='address2']").blur(function() {
        taddress2 = $(this).val();
        $("#form-info input[name='address']").val(taddress + '\n' + taddress2);
    });
    $("#form-info input[name='address']").val(taddress + '\n' + taddress2);


    function addresssub() {
        if ($('#country span').text() == 'Country' || allvalue.eq(0).val() == "" || allvalue.eq(1).val() == "" || allvalue.eq(2).val() == "" || allvalue.eq(4).val() == "" || allvalue.eq(5).val() == "" || allvalue.eq(6).val() == "" || allvalue.eq(7).val() == "") {
            if ($('#country span').text() == 'Country') {
                $("#form-info").parent().find("strong").eq(3).show()
            }
            if (allvalue.eq(0).val() == "" || allvalue.eq(1).val() == "") {
                $("#form-info").parent().find("strong").eq(0).show()
            }
            if (allvalue.eq(2).val() == "") {
                $("#form-info").parent().find("strong").eq(1).show()
            }
            if (allvalue.eq(4).val() == "" || allvalue.eq(5).val() == "") {
                $("#form-info").parent().find("strong").eq(2).show()
            }
            if (allvalue.eq(6).val() == "") {
                $("#form-info").parent().find("strong").eq(4).show()
            }
            if (allvalue.eq(7).val() == "") {
                $("#form-info").parent().find("strong").eq(5).show()
            }
            return false;
        }
        //让提交按钮失效，以实现防止按钮重复点击
        $('#reviewcheck').attr('disabled', 'disabled');
    }

    if ($(window).width() > 767) {
        $('.placeorder').removeClass('addblock');
    }

    $("#form-info").find("input[type='text']").each(function(i) {
        // console.log($('#firstname').val() + '----' + $('#lastname').val())
        $(this).keyup(function() {
            // console.log($(this).parent().parent().find("input").val())
            // console.log($('#firstname').val() + '----' + $('#lastname').val())
            if ($(this).parent().parent().find("input").length == 2) {
                if ($(this).parent().parent().hasClass("one")) {
                    if ($.trim($('#firstname').val()) != "" && $.trim($('#lastname').val()) != "") {
                        $("#form-info").parent().find("strong").eq(0).hide();
                    } else {
                        $("#form-info").parent().find("strong").eq(0).show();
                    }
                } else if ($(this).parent().parent().hasClass("four")) {
                    if ($.trim($('#city').val()) != "" && $.trim($('#state').val()) != "") {
                        $("#form-info").parent().find("strong").eq(2).hide()
                    } else {
                        $("#form-info").parent().find("strong").eq(2).show()
                    }
                } else if ($(this).parent().hasClass("post")) {
                    if ($.trim($('#post').val()) == '') {
                        $("#form-info").parent().find("strong").eq(4).show()
                    } else {
                        $("#form-info").parent().find("strong").eq(4).hide()
                    }
                } else if ($(this).parent().hasClass("email")) {
                    if ($.trim($('#email').val()) == '') {
                        $("#form-info").parent().find("strong").eq(5).show()
                    } else {
                        $("#form-info").parent().find("strong").eq(5).hide()
                    }
                }
            } else {
                if ($(this).parent().hasClass("address1")) {
                    if ($.trim($('#address1').val()) == '') {
                        $("#form-info").parent().find("strong").eq(1).show()
                    } else {
                        $("#form-info").parent().find("strong").eq(1).hide()
                    }
                }
            }
        })
    })
})