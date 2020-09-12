$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传按钮 调用input上传事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    // 当元素的值发生改变时，会发生 change 事件
    // 该事件仅适用于文本域（text field），以及 textarea 和 select 元素。
    // change() 函数触发 change 事件，或规定当发生 change 事件时运行的函数。
    // 为文本框绑定change事件
    $('#file').on('change', function (e) {
        console.log(e);
        // 获取用户选择的文件
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg("请选择照片")
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
          .cropper('destroy') // 销毁旧的裁剪区域
          .attr('src', imgURL) // 重新设置图片路径
          .cropper(options) // 重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件,将裁减的图片上传到服务器
    $('#btnUpload').on('click', function () {
        //将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
             // 创建一个 Canvas 画布
             width: 100,
             height: 100
            })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    
        // 调用接口,将头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})