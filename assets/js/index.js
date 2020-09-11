$(function () {
    // 调用getUserInfo 获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    // 退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空tonke 跳转页面
            localStorage.removeItem('token')
            location.href = '/login.html'
            
            layer.close(index);// 关闭询问框
          });
    })
})
    // 获取用户基本信息
    function getUserInfo() {
        $.ajax({
            metod: 'GET',
            url: '/my/userinfo',
            // // 请求头配置对象
            // headers: {
            //     Authorization:localStorage.getItem('token') || ''
            // },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 调用rend
                renderAvatar(res.data)
            },
            // 不论成功还是失败,都会调用complete回调函数 控制用户访问权限
            // complete: function (res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 强制清空tonke 跳转页面
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }
                
            // }
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


