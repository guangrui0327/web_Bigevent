$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
  
    // 定义一个查询的参数对象,将来请求数据的时候将需要的请求参数提交到服务器
    var q = {
        pagenum: 1,   // 页码值
        pagesize: 2,  // 每页显示多少条数据
        cate_id: '',  // 文章分类的 Id
        state:''      // 文章的状态，可选值有：已发布、草稿
    }
     
    // 定义美化时间的过滤器
    // 通过 template.defaults.imports 定义过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-'+ d + '  ' + hh + ':' + mm + ':' + ss
    }
    // 封装补0函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    initTable()
    initCate()
    // 请求文章列表数据并使用模板引擎渲染页面
    function initTable() {
        // 获取数据
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data:q,
            success: function (res) {
                // console.log(res);
                if (res.status !==0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 发起请求获取并渲染文章分类的下拉选择框
    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !==0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 使用模板引擎渲染分类下拉框选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单里的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

})