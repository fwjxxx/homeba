$(function() {
    paykep();
    var radionum = 1;
    var allinput=$(".form-paylist input");
    
    var address = $("#address").attr('value');
    var arr= address.split("|"); 
    $("#address").text(arr[0]);
    $("#address2").text(arr[1]);

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
    
        
    $('#payment').on('click',function(){
        if(radionum==1){
            $('#formpay').submit();
        }else{
            paylist();
        }
    })
    
    function paylist() {
        if(allinput.eq(0).val()=='' || allinput.eq(1).val()=='' || allinput.eq(2).val()=='' || allinput.eq(3).val()=='' || allinput.eq(4).val()=='' || allinput.eq(5).val()==''){
            if(allinput.eq(0).val()=='' || allinput.eq(1).val()==''){
            	$('.form-paylist').find("span").eq(0).text('Can not be empty');
            }
            if(allinput.eq(2).val()==''){
                $('.form-paylist').find("span").eq(1).text('Can not be empty');
            }
            if(allinput.eq(3).val()=='' || allinput.eq(4).val()==''){
                $('.form-paylist').find("span").eq(2).text('Can not be empty');
            }
            if(allinput.eq(5).val()==''){
                $('.form-paylist').find("span").eq(3).text('Can not be empty');
            }
        }else if(allinput.eq(2).val().length!=16 || allinput.eq(3).val().length!=2 || allinput.eq(4).val().length!=2 || allinput.eq(5).val().length!=3){
            if(allinput.eq(2).val().length!=16){
                $('.form-paylist').find("span").eq(1).text('Please enter the 16-digit');
            }
            if(allinput.eq(3).val().length!=2 || allinput.eq(4).val().length!=2){
                $('.form-paylist').find("span").eq(2).text('Please enter the 2-digit');
            }
            if(allinput.eq(5).val().length!=3){
                $('.form-paylist').find("span").eq(3).text('Please enter the 3-digit');
            }
        }else{
            $('.form-paylist').find("span").html('')
            $('#formpay').submit();
            // $('#formpay').resetForm();
        };
    }
    function paykep() {
        $("#card_number").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
        });
        $("#expire_mm").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
        });
        $("#expire_yy").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
        });
        $("#cvv").keyup(function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
        }).bind("paste", function() {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace("^([1-9]//d*|0)$"));
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
                        }else{
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
                        }else{
                            $(".form-paylist").find("span").eq(1).text('');
                        }
                    } else {
                        $(".form-paylist").find("span").eq(1).text('Can not be empty');
                    }
                } else if ($(this).parent().hasClass("cvv")) {
                    if ($.trim($('#cvv').val()) != '') {
                        if ($.trim($('#cvv').val()).length != 3) {
                            $(".form-paylist").find("span").eq(3).text('Please enter the 3-digit');
                        }else{
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