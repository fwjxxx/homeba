$(function() {
    var regemail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    $('#radio-reg').on('click', function() {
        if ($('#radio-reg').attr('checked') != 'checked') {
            $('#radio-reg').attr('checked', true)
            $('.homeba-reg span').eq(3).text("")
        } else {
            $('#radio-reg').attr('checked', false)
            $('.homeba-reg span').eq(3).text("Please confirm that you've read and accepted HomeBA's Terms of Use.")
        }
    })
    $('#sign-up').on('click', function() {
        if ($('#username').val() == '' || $('#password1').val() == '' || $('#password2').val() == '' || $('#radio-reg').attr('checked') != 'checked') {
            if ($('#username').val() == '') {
                $('.homeba-reg span').eq(0).text('This field may not be blank')
            }
            if ($('#password1').val() == '') {
                $('.homeba-reg span').eq(1).text('This field may not be blank')
            }
            if ($('#password2').val() == '') {
                $('.homeba-reg span').eq(2).text('This field may not be blank')
            }
            if ($('#radio-reg').attr('checked') != 'checked') {
                $('.homeba-reg span').eq(3).text("Please confirm that you've read and accepted HomeBA's Terms of Use.")
            }
            return false;
        } else if ($('#password1').val() != $('#password2').val()) {
            $('.homeba-reg span').eq(2).text("Sorry, the passwords don't match")
                // console.log('111')
            return false;
        } else if (!regemail.test($('#username').val())) {
            $('.homeba-reg span').eq(0).text('please enter your vaild email')
        }

    })
    $(".homeba-reg").find(".reg-group").each(function(i) {
        $(this).keyup(function() {
            if ($(this).parent().hasClass("reg-user")) {
                if ($('#username').val() == '') {
                    $('.homeba-reg span').eq(0).text('This field may not be blank')
                } else if (!regemail.test($('#username').val())) {
                    $('.homeba-reg span').eq(0).text('please enter your vaild email')
                } else {
                    $('.homeba-reg span').eq(0).text('')
                }
            } else if ($(this).parent().hasClass("reg-pass1")) {
                if ($('#password1').val() == '') {
                    $('.homeba-reg span').eq(1).text('This field may not be blank')
                } else {
                    $('.homeba-reg span').eq(1).text('')
                }
            } else if ($(this).parent().hasClass("reg-pass2")) {
                if ($('#password2').val() == '') {
                    $('.homeba-reg span').eq(2).text('This field may not be blank')
                } else if ($('#password1').val() != $('#password2').val()) {
                    $('.homeba-reg span').eq(2).text("Sorry, the passwords don't match")
                } else {
                    $('.homeba-reg span').eq(2).text('')
                }
            }
        })
    })
})