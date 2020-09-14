$(function () {
    var layer = layui.layer
    var form = layui.form
    
    // 初始化富文本编辑器
    initEditor()
    initCate()

    // 定义文章分类方法  最后一定调用form.render()方法让leyui重新渲染结构(否则不会生效)
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
            
        })
    }

    // 封面实现基本裁剪效果
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)



})