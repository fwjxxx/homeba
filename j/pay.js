$(function() {
    paykep();
    var radionum = 1;
    var allinput = $(".form-paylist input");

    var orderamount = $('#orderAmount').attr('data-amount')
    var creditpoint = $('#creditPoint').attr('data-credit')
    var totalpoints = (parseFloat(orderamount) - parseFloat(creditpoint)).toFixed(2);
    if (totalpoints < 0) {
        $('#totalPoints').text('$ 0.00');
        // alert($('.paypal-radio img').length)
        $('.paypal-radio img').each(function(i) {
            $('.paypal-radio img').eq(i).addClass('photogray');
        })
        $('#creditCheck').prop('checked', true);
        $('.paypal-radio label').addClass('regular-gray');
        $('.paypal-credit strong').addClass('paypal-checked');
        $('.paypal-credit i').show();

        $('.paypal-credit').on("click", function() {
            if ($('#creditCheck').prop('checked')) {
                $('.paypal-radio img').each(function(i) {
                    $('.paypal-radio img').eq(i).removeClass('photogray');
                })
                $('#creditCheck').prop("checked", false);
                $('.paypal-credit strong').removeClass('paypal-checked');
                $('.paypal-credit i').hide();
                $('.paypal-credit strong').addClass('paypal-label');
                $('.paypal-radio label').removeClass('regular-gray');
                $('#totalPoints').text('$ ' + orderamount);
                $('#creditUse').attr('disabled', 'disabled')
                paypalradio(1);
            } else {
                $('.paypal-radio img').each(function(i) {
                    $('.paypal-radio img').eq(i).addClass('photogray');
                })
                $('#creditUse').attr("disabled", false)
                $('#creditCheck').prop("checked", true);
                $('.paypal-credit strong').removeClass('paypal-label');
                $('.paypal-credit strong').addClass('paypal-checked');
                $('.paypal-credit i').show();
                $('.form-paylist').hide();
                $('.paypal-radio label').addClass('regular-gray');
                $('#totalPoints').text('$ 0.00');
                paypalradio(2);
            }
        })
    } else {
        $('#totalPoints').text('$ ' + totalpoints);
        if (creditpoint == '0.00') {
            // alert(1)
            // $('#creditCheck').prop('checked', true);
            // $('.paypal-credit strong').removeClass('paypal-label');
            $('.paypal-credit strong').addClass('paypal-gray');
            $('.paypal-credit i').hide();
            paypalradio(1);
        } else {
            $('#creditCheck').prop('checked', true);
            $('.paypal-credit strong').addClass('paypal-checked');
            // $("#creditCheck").attr("checked", false);
            paypalradio(1);
            $('.paypal-credit').on("click", function() {
                if ($('#creditCheck').prop('checked')) {
                    // $('#creditCheck').attr('checked', false);
                    $('.paypal-credit strong').removeClass('paypal-checked');
                    $('.paypal-credit i').hide();
                    $('.paypal-credit strong').addClass('paypal-label');
                    $('#creditCheck').prop('checked', false);
                    $('#totalPoints').text('$ ' + orderamount);
                    $('#creditUse').attr('disabled', 'disabled')
                } else {
                    $('#creditUse').attr("disabled", false)
                        // $('#creditCheck').attr('checked', true);
                    $('#creditCheck').prop('checked', true);
                    $('.paypal-credit strong').removeClass('paypal-label');
                    $('.paypal-credit strong').addClass('paypal-checked');
                    $('.paypal-credit i').show();
                    $('#totalPoints').text('$ ' + totalpoints);
                }
            })
        }
    }


    var address = $("#address").attr('value');
    var arr = address.split("|");
    $("#address").text(arr[0]);
    $("#address2").text(arr[1]);

    function paypalradio(v) {
        if (v == '1') {
            $('.paypal-radio #selectpay').on("click", function() {
                $(".paypal-radio input[name='pay_type']").attr("checked", false);
                if ($(this).find("input").attr("checked") == 'checked') {
                    return false;
                } else {
                    $('.paypal-radio label').removeClass('regular-checked');
                    $('.paypal-radio label').addClass('regular-label');
                    $(this).find("label").removeClass('regular-label');
                    $(this).find("label").addClass('regular-checked');
                    if ($(this).find("input").attr("value") == 2) {
                        $('.form-paylist').show();
                        $(".paypal-radio input[name='pay_type']").eq(1).prop("checked", 'checked');
                        radionum = 2;
                    } else {
                        $('.form-paylist').hide();
                        $(".paypal-radio input[name='pay_type']").eq(0).prop("checked", 'checked');
                        radionum = 1;
                    }
                }
            });
        } else {
            $('.paypal-radio #selectpay').unbind("click");
        }

    }


    $('#payment').on('click', function() {
        if (radionum == 1) {
            $('#formpay').submit();
        } else {
            paylist();
        }
    })

    function paylist() {
        if (allinput.eq(0).val() == '' || allinput.eq(1).val() == '' || allinput.eq(2).val() == '' || allinput.eq(3).val() == '' || allinput.eq(4).val() == '' || allinput.eq(5).val() == '') {
            if (allinput.eq(0).val() == '' || allinput.eq(1).val() == '') {
                $('.form-paylist').find("span").eq(0).text('Can not be empty');
            }
            if (allinput.eq(2).val() == '') {
                $('.form-paylist').find("span").eq(1).text('Can not be empty');
            }
            if (allinput.eq(3).val() == '' || allinput.eq(4).val() == '') {
                $('.form-paylist').find("span").eq(2).text('Can not be empty');
            }
            if (allinput.eq(5).val() == '') {
                $('.form-paylist').find("span").eq(3).text('Can not be empty');
            }
        } else if (allinput.eq(2).val().length != 16 || allinput.eq(3).val().length != 2 || allinput.eq(4).val().length != 2 || allinput.eq(5).val().length != 3) {
            if (allinput.eq(2).val().length != 16) {
                $('.form-paylist').find("span").eq(1).text('Please enter the 16-digit');
            }
            if (allinput.eq(3).val().length != 2 || allinput.eq(4).val().length != 2) {
                $('.form-paylist').find("span").eq(2).text('Please enter the 2-digit');
            }
            if (allinput.eq(5).val().length != 3) {
                $('.form-paylist').find("span").eq(3).text('Please enter the 3-digit');
            }
        } else {
            $('.form-paylist').find("span").html('')
            $('#formpay').submit();
            // $('#formpay').resetForm();
        };
    }

    function paykep() {
        $("#card_number").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        });
        $("#expire_mm").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        });
        $("#expire_yy").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        });
        $("#cvv").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^\\d+$/g, ''));
        });
    }

    allinput.each(function(i) {
        $(this).keyup(function() {
            if ($(this).parent().parent().find("input").length == 2) {
                if ($(this).parent().parent().hasClass("one")) {
                    if ($.trim($('#first_name').val()) != "" && $.trim($('#last_name').val()) != "") {
                        $(".form-paylist").find("span").eq(0).text('');
                    } else {
                        $(".form-paylist").find("span").eq(0).text('Can not be empty');
                    }
                } else if ($(this).parent().parent().hasClass("two")) {
                    if ($.trim($('#expire_mm').val()) != "" && $.trim($('#expire_yy').val()) != "") {
                        if ($.trim($('#expire_mm').val()).length != 2 || $.trim($('#expire_yy').val()).length != 2) {
                            $(".form-paylist").find("span").eq(2).text('Please enter the 2-digit');
                        } else {
                            $(".form-paylist").find("span").eq(2).text('');
                        }
                    } else {
                        $(".form-paylist").find("span").eq(2).text('Can not be empty');
                    }
                }
            } else {
                if ($(this).parent().hasClass("card_number")) {
                    if ($.trim($('#card_number').val()) != '') {
                        if ($.trim($('#card_number').val()).length != 16) {
                            $(".form-paylist").find("span").eq(1).text('Please enter the 16-digit');
                        } else {
                            $(".form-paylist").find("span").eq(1).text('');
                        }
                    } else {
                        $(".form-paylist").find("span").eq(1).text('Can not be empty');
                    }
                } else if ($(this).parent().hasClass("cvv")) {
                    if ($.trim($('#cvv').val()) != '') {
                        if ($.trim($('#cvv').val()).length != 3) {
                            $(".form-paylist").find("span").eq(3).text('Please enter the 3-digit');
                        } else {
                            $(".form-paylist").find("span").eq(3).text('');
                        }
                    } else {
                        $(".form-paylist").find("span").eq(3).text('Can not be empty');
                    }
                }
            }
        });
    });
})