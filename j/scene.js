function messagedel(messageid) {
    var str = '<div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="order-verify"><h4>Delete Comment</h4><p>Would you like to delete this comment？</p><div class="modal-btn"><div class="check-but1"><button type="button" id="orderss" class="btn modal-black btn-block" onclick="messageajax('+messageid+')">YES</button></div><div class="check-but2"><button type="button" class="btn modal-black btn-block" data-dismiss="modal">NO</button></div></div></div></div>';
    $('#messagebox').html(str);
}
function messagedel2(messageid) {
    var str = '<div class="modal fade" id="messageModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="order-verify-small"><h4>Delete Comment</h4><p>Would you like to delete this comment？</p><div class="modal-btn"><div class="check-but1"><button type="button" id="ordersn" class="btn modal-black btn-block modal-black-height" onclick="messageajax('+messageid+')">YES</button></div><div class="check-but2"><button type="button" class="btn modal-black btn-block modal-black-height" data-dismiss="modal">NO</button></div></div></div></div>';
    $('#messagebox').html(str);
}
function messageajax(messageid) {
    $.ajax({
        type: 'DELETE',
        url: ' /api/comment/'+messageid+'/',
        success: function(json) {
            $('#message_'+messageid).remove();
            $('#messageModal').modal('hide')
            $('#messageModal2').modal('hide')
        },error: function() {}
    });
}
$(function(){
    setTimeout(function(){
        var swiper4 = new Swiper('#slideshow', {
            autoplay: 200,
            speed: 800,
            autoplayStopOnLast : true,
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 10,
            nextButton: '#slideshow-next',
            prevButton: '#slideshow-prev',
            paginationType: 'progress'
        });
    }, 1000)

    setTimeout(function(){
        $('#slideshow-prev').removeClass('active')
        $('#slideshow-next').addClass('active')
    }, 1500)
    $('#slideshow-next').on('click',function(){
        $('#slideshow-next').addClass('active')
        $('#slideshow-prev').removeClass('active')
    })
    $('#slideshow-prev').on('click',function(){
        $('#slideshow-prev').addClass('active')
        $('#slideshow-next').removeClass('active')
    })

    var scenewishimg = $("#scenewish-img").attr('value');
    var scenewishurl = $("#scenewish-img").attr('name');
	$('#wish').on('click',function(){
        var wishid = $('#wish').attr('value');
        var time = null;
        var time1 = null;
        if($('#wish').attr('class')=='btn btn-desc'){
            $.ajax({
                type: 'post',
                url: '/api/scene/'+wishid+'/wish/',
                beforeSend: function () {
                    //让提交按钮失效，以实现防止按钮重复点击
                    $('#wish').attr('disabled', 'disabled');
                },
                complete: function () {
                    //让按钮重新有效
                    $('#wish').removeAttr('disabled');
                },
                success: function(json) {
                    $('#wish').addClass('btn-orange');

                    var str = '<i class="icon-homebaicon-10"></i><span>Wish</span>';
                    var str1 = '<i class="glyphicon glyphicon-triangle-top arrow-top arrow-top1"></i><h4><img src="'+scenewishimg+'" /><strong>Added</strong></h4><p><a href="'+scenewishurl+'">Go to My WishList</a></p>';
                    $('#wish').html(str);
                    $('.wish-box').html(str1);
                    $('.wish-box').show();
                    time = setTimeout(function(){
                        $('.wish-box').hide();
                    }, 2000);
                },error: function() {}
            });
        }else{
            $.ajax({
                type: 'DELETE',
                url: '/api/scene/'+wishid+'/wish/',
                beforeSend: function () {
                    //让提交按钮失效，以实现防止按钮重复点击
                    $('#wish').attr('disabled', 'disabled');
                },
                complete: function () {
                    //让按钮重新有效
                    $('#wish').removeAttr('disabled');
                },
                success: function(json) {
                    $('#wish').removeClass('btn-orange');
                    var str = '<i class="icon-homebaicon-10"></i><span>Wish</span>';
                    var str1 = '<i class="glyphicon glyphicon-triangle-top arrow-top arrow-top1"></i><h4 class="h4-top"><b class="icon-homebaicon-10"></b><strong>Canceled</strong></h4>';
                    $('#wish').html(str);
                    $('.wish-box').html(str1);
                    $('.wish-box').show();
                    time1 = setTimeout(function(){
                        $('.wish-box').hide();
                    }, 2000);
                },error: function() {}
            });
        }
        clearTimeout(time)
        clearTimeout(time1)
    })

	$('#like').on('click',function(){
        var likeid = $('#like').attr('value');
        if($('#like').attr('class')=='btn btn-desc'){
            $.ajax({
                type: 'post',
                url: '/api/scene/'+likeid+'/like/',
                success: function(json) {
                    $('#like').addClass('btn-red');
                },error: function() {}
            });
        }else{
            $.ajax({
                type: 'DELETE',
                url: '/api/scene/'+likeid+'/like/',
                success: function(json) {
                    $('#like').removeClass('btn-red');
                },error: function() {}
            });
        }
    })

    $('#replylist').on('click',function(){
    	$('html,body').animate({scrollTop: $('#comments-message').offset().top-50}, 1500);
        // $('body').animate({marginTop: '='+$('.message').offset().top}, 500);
    })

    $('#id_comment').keyup(function() {
        if($.trim($(this).val()) != ""){
            $('#comments-btn').addClass('comments-org');
        }else{
            $('#comments-btn').removeClass('comments-org');
        }
    });

    $('#comments-btn').on('click',function(){
        if($('#id_comment').val()==""){
            return false;
        }else{
            $('#comment-form').submit();
        }
    })

})