$(function () {
    // 调用getUserInfo 获取用户基本信息
    getUserInfo()

    // 获取用户基本信息
    function getUserInfo() {
        $.ajax({
            metod: 'GET',
            url: '/my/userinfo',
            // 请求头配置对象
            headers: {
                Authorization:localStorage.getItem('token') || ''
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 调用rend
                renderAvatar(res.data)
            }
        })
    }
    // 渲染用户头像
    function renderAvatar(user) {
        // 获取用户名
        var name  =user.nickname || user.username
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
        // 按需渲染用户头像 (图片,文本)
        if (user.user_pic !==null) {
            $('.layui-nav-img')
                .attr('src', user.user_pic).show() 
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }

})
