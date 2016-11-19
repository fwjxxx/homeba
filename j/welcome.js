$(function() {

    var mydate = new Date();
    var setdate = "" + mydate.getFullYear();
    setdate += (mydate.getMonth() + 1);
    setdate += mydate.getDate();
    // console.log(setdate)
    // console.log($('.nav-list-b').length)
    if ($('.nav-list-b').length <= 0) {
        // localStorage.setItem('getdate', '20160922');
        if (localStorage.getItem('getdate') == null || localStorage.getItem('getdate') != setdate) {
            $('#givingModal').modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
            localStorage.setItem('getdate', setdate);
        }
    }
    // localStorage.getItem('show')
    // if (sessionStorage.opened) {
    //     console.log('窗口是刷新页面,不是新打开')
    // } else {
    //     console.log('窗口是新打开')
    //     $('#givingModal').modal({
    //         show: true,
    //         backdrop: 'static',
    //         keyboard: false
    //     });
    // }
})