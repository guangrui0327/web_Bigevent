//注意:每次调用$.git()或$.post或$.ajax()的时候
// 会县调用ajaxPrefilter 这个函数
// 这个函数中,可以拿到Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真的Ajax请求前,统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

    // 统一为有权限的接口,设置headers请求头(优化)
    if (options.url.indexOf('/my/') !== -1) {
        // 请求头配置对象
        options.headers = {
           Authorization:localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete 回调函数
    options.complete= function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空tonke 跳转页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
        
    }

})

