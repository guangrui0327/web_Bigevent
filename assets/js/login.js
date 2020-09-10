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
    var layer = layui.layer
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
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // data踢出去
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // ajax请求
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            if (res.status !==0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,去登录')
        $('#link_login').click()
        })
    })

    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登陆成功得到的token字符串保存到本地存储里
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/index.html'
            }
        })
    })
})