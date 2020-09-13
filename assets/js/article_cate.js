$(function () {
    var layer = layui.layer
    var form = layui.form
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


    // 设置编辑的点击事件(事件委派)
    var indexEdit =null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content:$('#dialog-edit').html()
        });  

        // 根据id值发起获取文章请求数据,并填充到表单
        // 1.获取id
        var id = $(this).attr('data-id')
        // 2.ajax 发起请求获取对应数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/'+id,
            success: function (res) {
                form.val('form-edit',res.data)
            }
        })

    })
    // 修改按钮点击事件,更新文章数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !==0) {
                    return layer.msg('更新分类信息失败！')
                }
                layer.msg('更新分类信息成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理形式,为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        // 获取id
        var id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //发起ajax请求
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !==0) {
                        return layer.msg('删除文章分类失败！')
                    }
                    layer.msg('删除文章分类成功！')
                    layer.close(index);
                    initArtCateList()
                }
            })
        })
    })
})