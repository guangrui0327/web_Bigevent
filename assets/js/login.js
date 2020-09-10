$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录账号的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 表单验证 layui中获取form对象
    var form = layui.form
    // 通过form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个pwd的校验规则
       pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
       //  校验两次密码是否一致
       repwd: function (value) {
         // 形参拿到的是确认密码框的内容
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
})