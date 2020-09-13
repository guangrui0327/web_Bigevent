$(function () {
    var layer = layui.layer
    initArtCateList()


    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                var htmlStr = template('tol-table', res)
                $("tbody").html(htmlStr)
            }
        })
    }

    // 添加类别弹出层
    var indexAdd =null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content:$('#dialog-add').html()
          });    
    })

    // 通过代理形式,为form-add表单绑定submit事件
    // 用事件委托的原因,因为动态添加的,不是本来就有的
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                initArtCateList()
                layer.msg('新增文章分类成功！')
                // 关闭弹出层
                layer.close(indexAdd)
            }
        })
    })
})