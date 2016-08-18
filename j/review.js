
$(function() {
    var address = $("#address").attr('value');
    var arr= address.split("\n"); 
    $("#address").text(arr[0]);
    $("#address2").text(arr[1]);

    var sum = $('.ordersummary .row-line').length;
    var num = 3;
    var countryList = '';
    var allvalue = $("#form-info").find("input[type='text']");
    var shoptext = '<button type="submit" id="ordercheck1" class="btn btn-green btn-lg btn-block">Place Order</button>';
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
    if(!$('.shop-info-text').hasClass("hidden")){
        $('.placeorder').html(shoptext);
        $('#ordercheck1').on('click',function(){
            $('#orderSummary').submit();
        })
    }
    var options={
        beforeSubmit:addresssub,
        dataType:"json",
        complete: function() {
            //让登陆按钮重新有效
            $('#reviewcheck').removeAttr('disabled');
        },
        success: function (data) {
            var str=null;
            var country = '';
            
            $("#form-info").hide();
            
            $("#country-list li a").each(function() {
                if($(this).attr('value') == data.country) {
                    country = $(this).text()
                }
            })
            var address = data.address;
            var arr= address.split("\n"); 

            str='<h3 class="review-h3">Shipping information</h3><div class="col-sm-12 shop-info-text"><div class="form-group margin-lr"><span>'+data.firstname+'</span><span>'+data.lastname+'</span></div><div class="form-group margin-lr"><span id="address" value="'+data.address+'">'+arr[0]+'</span></div><div class="form-group margin-lr"><span id="address2">'+arr[1]+'</span></div><div class="form-group margin-lr"><span>'+data.city+','+data.province+' '+data.postcode+'</span></div><div class="form-group margin-lr"><span>'+country+'</span></div><div class="form-group margin-lr"><span>'+data.mobile+'</span></div><div class="form-group margin-lr"><span>'+data.email+'</span></div></div>';
            $(".shop-info").html(str);
            $("#orderSummary input[name='address']").val(data.id); 
            $("#orderSummary input[name='bill_address']").val(data.id);
            $('#ordercheck').removeAttr("disabled");
            $('.placeorder').html(shoptext);
            
        },
        error:function(data){
            // console.log(data.responseText)
            var obj=$.parseJSON(data.responseText);
            for(name in obj){
                // console.log(name)
                $("#form-info").find("input[type='text']").each(function(i){
                    if($("#form-info").find("input[type='text']").eq(i).attr("name")==name || $("#form-info").find("input[type='text']").eq(i).attr("name")==name+'1') {
                        for(var k=0; k<obj[name].length;k++){
                            $(this).next().show();
                            $(this).next().text(obj[name][k])
                        }
                    }
                });
            }
            
        }       
    }
    
    var options2={
        dataType:"json",
        beforeSend: function () {
            //让提交按钮失效，以实现防止按钮重复点击
            $('#ordercheck').attr('disabled', 'disabled');
        },
        complete: function () {
            //让按钮重新有效
            $('#ordercheck').removeAttr('disabled');
        },
        success:function(data){
            window.location.href='/payment/'+data.sn;
        },
        error:function(data){
            var obj=$.parseJSON(data.responseText);
            
            alert(obj.detail)
        }

    }

    $('#form-info').submit(function(){
        $(this).ajaxSubmit(options); 
        return false;   
    });

    $('#orderSummary').ajaxForm(options2);

    $('#country-list a').each(function(i) {
        $(this).on('click', function() {
            var index=$(this).index()+i;
            countryList = $(this).text();
            country = $(this).attr('value');
            $('#country span').html(countryList);
            $("#form-info").parent().find("strong").eq(3).hide()
            $("#form-info input[name='country']").val(country);
        })
    })

    $("#form-info").parent().find("strong").hide()

    var address="";
    var address2="";
    $("input[name='address1']").blur(function(){
        address=$(this).val();
        $("#form-info input[name='address']").val(address+ '\n' +address2);
    });
    $("input[name='address2']").blur(function(){
        address2=$(this).val();
        $("#form-info input[name='address']").val(address+ '\n' +address2);
    });
    $("#form-info input[name='address']").val(address);


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

    if ($(window).width()>767){
        $('.placeorder').removeClass('addblock');
    }

    $("#form-info").find("input[type='text']").each(function(i) {
        $(this).keyup(function() {
            if ($(this).parent().parent().find("input").length == 2) {
                if ($(this).parent().parent().hasClass("one")) {
                    if ($.trim($('#firstname').val()) != "" && $.trim($('#lastname').val()) != "") {
                        $("#form-info").parent().find("strong").eq(0).hide()
                    } else {
                        $("#form-info").parent().find("strong").eq(0).show()
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