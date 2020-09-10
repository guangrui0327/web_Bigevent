//注意:每次调用$.git()或$.post或$.ajax()的时候
// 会县调用ajaxPrefilter 这个函数
// 这个函数中,可以拿到Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真的Ajax请求前,统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
})