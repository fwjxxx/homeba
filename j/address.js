var id = 0;

var taddress = "";
var taddress2 = "";

//删除地址
function deladdress(delid) {
    var addressimg = $('#address-img').attr('value');
    $.ajax({
        url: '/api/address/' + delid + '/',
        type: 'DELETE',
        success: function(data) {
            $("#address_" + delid).remove();
            if ($(".address-top .address-info").length < 1) {
                var str = '<div class="row margin-lr address-null"><img src="' + addressimg + '"><h3>No shipping address has been added.</h3></div>';
                $(".address-top").html(str);
            }
        },
        error: function(data) {}
    });
}
//更改地址
function alteraddress(alterid) {
    id = alterid;
    addressid = $('#address_' + alterid);
    var firstname = addressid.find(".firstname").text();
    var lastname = addressid.find(".lastname").text();
    var address1 = addressid.find("#address-f1").text();
    var address2 = addressid.find("#address-f2").text();
    var city = addressid.find(".city").text();
    var province = addressid.find(".province").text();
    var postcode = addressid.find(".postcode").text();
    var country = addressid.find(".country").text();
    var mobile = addressid.find(".mobile").text();
    var email = addressid.find(".email").text();

    // console.log(firstname+'--'+lastname+'--'+address+'--'+city+'--'+province+'--'+postcode+'--'+country+'--'+mobile+'--'+email)
    // $('#form-info').resetForm();
    $("#form-info input[name='firstname']").val(firstname);
    $("#form-info input[name='lastname']").val(lastname);
    $("#form-info input[name='city']").val(city);
    $("#form-info input[name='province']").val(province);
    $("#form-info input[name='postcode']").val(postcode);
    $("#form-info input[name='mobile']").val(mobile);
    $("#form-info input[name='email']").val(email);


    $("#form-info input[name='address1']").val(address1);
    $("#form-info input[name='address2']").val(address2);
    $("#form-info input[name='address']").val(address1 + '\n' + address2);
    taddress = address1;
    taddress2 = address2;
    // console.log($("#form-info input[name='address']").val())

    $('#country span').text(country);
    $('#country-list li a').each(function(i) {
        if ($(this).text() == $.trim(country)) {
            var dd = $(this).attr('value');
            $("#form-info input[name='country']").val(dd);
        }
    });
    // console.log($('#address-sm').css("display"))
    if ($('#address-sm').css("display") == 'block') {
        $('body').animate({
            scrollTop: $('.shop-info').offset().top
        }, 1500);
    }
    $('.review-h3').text('Edit address');
    $('.form-bottom').hide();
    $('.form-top').hide();

}

//选中默认地址
function radiotrue(addid) {
    $.ajax({
        url: '/api/address/' + addid + '/',
        type: 'PATCH',
        data: {
            is_default: true
        },
        success: function(data) {
            var is_default = null;
            // console.log($(".address-top").find(".address-info").length)
            $('.address-top label').each(function() {
                var id = $(this).attr("id");
                is_default = '<input type="checkbox" class="regular-radio"/><label class="regular-label" id="' + id + '" onclick="radiotrue(' + id + ')"></label>';
                $('#address_' + id + '  .address-radio').html(is_default);
            })

            if (data.is_default == true) {
                is_default = '<input type="checkbox" class="regular-radio" checked="checked"/><label id="' + data.id + '" class="regular-checked"></label>';
                $('#address_' + data.id + '  .address-radio').html(is_default);
            }
        },
        error: function(data) {}
    })
}

//初始化
$(function() {

    $("#form-info").find("strong").hide();

    var allvalue = $("#form-info").find("input[type='text']");
    var countryList = '';
    var country = '';
    var addid = id;
    var addressup = '';
    var addressarr = '';
    $('#address-img #address-all').each(function(i) {
        addressup = $(this).attr('value');
        addressarr = addressup.split("\n");
        $("#address-all #address-f1").eq(i).text(addressarr[0]);
        $("#address-all #address-f2").eq(i).text(addressarr[1]);
    })

    $('.address-radio #selectpay').on("click", function() {
        if ($(this).find("input").attr("checked") == 'checked') {
            return false;
        } else {
            $('.paypal-radio input').attr("checked", false);
            $('.paypal-radio label').removeClass('regular-checked');
            $('.paypal-radio label').addClass('regular-label');
            $(this).find("input").attr("checked", true);
            $(this).find("label").removeClass('regular-label');
            $(this).find("label").addClass('regular-checked');
        }
    });

    $('#form-info').submit(function() {
        if (id == 0) {
            var options = {
                beforeSubmit: addresssub,
                type: 'POST',
                dataType: "json",
                complete: function() {
                    //让按钮重新有效
                    $('#reviewcheck').removeAttr('disabled');
                },
                success: function(data) {
                    var str = null;
                    var country = '';
                    // console.log('城市输出后：'+data.country)
                    $("#country-list li a").each(function() {
                        if ($(this).attr('value') == data.country) {
                            country = $(this).text();
                            // console.log(country);
                        }
                    });
                    // console.log('country:'+data.country)
                    var address = data.address;
                    var arr = address.split("\n");
                    if (arr[1] == undefined) {
                        arr[1] = '';
                    }
                    str = '<div class="row margin-lr address-info" id="address_' + data.id + '"><div class="col-md-2 col-xs-2"></div><ul class="col-md-10 col-xs-10"><li><span class="firstname">' + data.firstname + '</span> <span class="lastname">' + data.lastname + '</span></li><li id="address-all" value="' + data.address + '"><p id="address-f1">' + arr[0] + '</p><p id="address-f2">' + arr[1] + '</p></li><li><span class="city">' + data.city + '</span>, <span class="province">' + data.province + '</span> <span class="postcode">' + data.postcode + '</span></li><li><span class="country">' + country + '</span></li><li><span class="mobile">' + data.mobile + '</span></li><li><span class="email">' + data.email + '</span></li></ul><div class="address-radio"><input type="checkbox" class="regular-radio"/><label class="regular-label" id="' + data.id + '" onclick="radiotrue(' + data.id + ')"></label></div><div class="address-operating"><i class="icon-homebaicon_-23" onclick="alteraddress(' + data.id + ')"></i><i class="icon-homebaicon_-25" onclick="deladdress(' + data.id + ')"></i></div></div>';
                    if ($(".address-top .address-null").length > 0) {
                        $(".address-top").html('');
                        $(".address-top").html(str);
                    } else {
                        $(".address-top").prepend(str);
                    }
                    $('#country span').text('Country');
                    $('#form-info').resetForm();
                },
                error: function(data) {
                    // console.log(data.responseText)
                    var obj = $.parseJSON(data.responseText);
                    for (name in obj) {
                        console.log(name)
                        $("#form-info").find("input[type='text']").each(function(i) {
                            if ($("#form-info").find("input[type='text']").eq(i).attr("name") == name || $("#form-info").find("input[type='text']").eq(i).attr("name") == name + '1') {
                                for (var k = 0; k < obj[name].length; k++) {
                                    $(this).next().show();
                                    $(this).next().text(obj[name][k]);
                                }
                            }
                        });
                    }

                }
            }
            $(this).ajaxSubmit(options);
        } else {
            console.log(id)
            var options1 = {
                beforeSubmit: addresssub,
                url: "/api/address/" + id + "/",
                type: 'PATCH',
                dataType: "json",
                complete: function() {
                    //让按钮重新有效
                    $('#reviewcheck').removeAttr('disabled');
                },
                success: function(data) {
                    var str = null;
                    var country = '';
                    var is_default = null;
                    if (data.is_default == true) {
                        is_default = '<input type="checkbox" class="regular-radio" checked="checked"/><label id="' + data.id + '" class="regular-checked"></label>';
                    } else {
                        is_default = '<input type="checkbox" class="regular-radio"/><label class="regular-label" id="' + data.id + '" onclick="radiotrue(' + data.id + ')"></label>';
                    }
                    $("#country-list li a").each(function() {
                        if ($(this).attr('value') == data.country) {
                            country = $(this).text();
                            // console.log(country)
                        }
                    });

                    var address = data.address;
                    console.log('address:' + address)
                    var arr = address.split("\n");
                    if (arr[1] == undefined) {
                        arr[1] = '';
                    }
                    str = '<div class="col-md-2 col-xs-2"></div><ul class="col-md-10 col-xs-10"><li><span class="firstname">' + data.firstname + '</span> <span class="lastname">' + data.lastname + '</span></li><li id="address-all" value="' + data.address + '"><p id="address-f1">' + arr[0] + '</p><p id="address-f2">' + arr[1] + '</p></li><li><span class="city">' + data.city + '</span>, <span class="province">' + data.province + '</span> <span class="postcode">' + data.postcode + '</span></li><li><span class="country">' + country + '</span></li><li><span class="mobile">' + data.mobile + '</span></li><li><span class="email">' + data.email + '</span></li></ul><div class="address-radio">' + is_default + '</div><div class="address-operating"><i class="icon-homebaicon_-23" onclick="alteraddress(' + data.id + ')"></i><i class="icon-homebaicon_-25" onclick="deladdress(' + data.id + ')"></i></div>';
                    $('#address_' + data.id).html(str);
                    $('#country span').text('Country');
                    $('.review-h3').text('Add an address');
                    $('#form-info').resetForm();
                    id = 0;
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
                                    $(this).next().text(obj[name][k]);
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

    // $('#country-list a').each(function(i) {
    //     $(this).on('click', function() {
    //         var index=$(this).index()+i;
    //         $("#selectlist option").removeAttr("selected");
    //         $('#selectlist').find("option:selected").text('')
    //         countryList = $(this).text();
    //         $("#selectlist option").eq(index).attr("selected",true);
    //         console.log('111：'+$('#selectlist').find("option:selected").text())
    //         $('#country span').html(countryList);
    //         $("#form-info").parent().find("strong").eq(3).hide()
    //         console.log(index)
    //         var dd = $("#selectlist option").eq(index).val()
    //         $("#selectlist").val(dd);
    //         console.log('222：'+dd)
    //     })
    // })

    $('#country-list a').each(function(i) {
        $(this).on('click', function() {
            var index = $(this).index() + i;
            countryList = $(this).text();
            country = $(this).attr('value');
            $('#country span').html(countryList);
            $("#form-info").parent().find("strong").eq(3).hide();
            $("#form-info input[name='country']").val(country);
            // console.log(country);
        });
    });

    $("input[name='address1']").blur(function() {
        taddress = $(this).val();
        $("#form-info input[name='address']").val(taddress + '\n' + taddress2);
    });
    $("input[name='address2']").blur(function() {
        taddress2 = $(this).val();
        $("#form-info input[name='address']").val(taddress + '\n' + taddress2);
    });
    // console.log(taddress + '-' + taddress2)
    $("#form-info input[name='address']").val(taddress + '\n' + taddress2);

    function addresssub() {
        if ($('#country span').text() == 'Country' || allvalue.eq(0).val() == "" || allvalue.eq(1).val() == "" || allvalue.eq(2).val() == "" || allvalue.eq(4).val() == "" || allvalue.eq(5).val() == "" || allvalue.eq(6).val() == "" || allvalue.eq(7).val() == "") {
            if ($('#country span').text() == 'Country') {
                $("#form-info").parent().find("strong").eq(3).show();
            }
            if (allvalue.eq(0).val() == "" || allvalue.eq(1).val() == "") {
                $("#form-info").parent().find("strong").eq(0).show();
            }
            if (allvalue.eq(2).val() == "") {
                $("#form-info").parent().find("strong").eq(1).show();
            }
            if (allvalue.eq(4).val() == "" || allvalue.eq(5).val() == "") {
                $("#form-info").parent().find("strong").eq(2).show();
            }
            if (allvalue.eq(6).val() == "") {
                $("#form-info").parent().find("strong").eq(4).show();
            }
            if (allvalue.eq(7).val() == "") {
                $("#form-info").parent().find("strong").eq(5).show();
            }
            return false;
        }
        //让提交按钮失效，以实现防止按钮重复点击
        $('#reviewcheck').attr('disabled', 'disabled');
        // console.log('城市输出前：'+$('#phone').val())
    }


    if ($(window).width() > 767) {
        $('.placeorder').removeClass('addblock');
    }

    $("#form-info").find("input[type='text']").each(function(i) {
        $(this).keyup(function() {
            if ($(this).parent().parent().find("input").length == 2) {
                if ($(this).parent().parent().hasClass("one")) {
                    if ($.trim($('#firstname').val()) != "" && $.trim($('#lastname').val()) != "") {
                        $("#form-info").parent().find("strong").eq(0).hide();
                    } else {
                        $("#form-info").parent().find("strong").eq(0).show();
                    }
                } else if ($(this).parent().parent().hasClass("four")) {
                    if ($.trim($('#city').val()) != "" && $.trim($('#state').val()) != "") {
                        $("#form-info").parent().find("strong").eq(2).hide();
                    } else {
                        $("#form-info").parent().find("strong").eq(2).show();
                    }
                } else if ($(this).parent().hasClass("post")) {
                    if ($.trim($('#post').val()) == '') {
                        $("#form-info").parent().find("strong").eq(4).show();
                    } else {
                        $("#form-info").parent().find("strong").eq(4).hide();
                    }
                } else if ($(this).parent().hasClass("email")) {
                    if ($.trim($('#email').val()) == '') {
                        $("#form-info").parent().find("strong").eq(5).show();
                    } else {
                        $("#form-info").parent().find("strong").eq(5).hide();
                    }
                }
            } else {
                if ($(this).parent().hasClass("address1")) {
                    if ($.trim($('#address1').val()) == '') {
                        $("#form-info").parent().find("strong").eq(1).show();
                    } else {
                        $("#form-info").parent().find("strong").eq(1).hide();
                    }
                }
            }
        });
    });

});