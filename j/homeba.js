var csrftoken = $.cookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
$(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
    if (jqXHR.status == 401 || jqXHR.status == 403) {
        $('#loginModal').modal('show')
        var url = window.location.pathname;
        $('#loginModal input[name="next"]').val(url)
    }
    if (jqXHR.status == 500) {
        alert('Server exception, please try again.');
    }
});

$(function() {

    var newsletter = {
        beforeSubmit: function() {
            //让提交按钮失效，以实现防止按钮重复点击
            $('#but-email').attr('disabled', 'disabled');
        },
        complete: function() {
            //让按钮重新有效
            $('#but-email').removeAttr('disabled');
        },
        dataType: "json",
        success: function(data) {
            var str = "<span>We're so happy you're here!You’ll be the first to know about what’s next and what’s new at HomeBA.in</span>";
            $('.footer-email').html(str);
        },
        error: function(data) {
            var obj = $.parseJSON(data.responseText);
            for (name in obj) {
                // console.log(name)
                $("#form-email").find("input[type='email']").each(function(i) {
                    if ($("#form-email").find("input[type='email']").eq(i).attr("name") == name) {
                        for (var k = 0; k < obj[name].length; k++) {
                            $(this).next().show();
                            $('.newsletter p').text(obj[name][k])
                        }
                    }
                });
            }
            // $('#but-email').attr("disabled", true);
        }
    }

    $('#form-email').submit(function() {
        $(this).ajaxSubmit(newsletter);
        return false;
    });
})