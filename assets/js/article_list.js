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

                // 调用渲染分页的方法
                renderPage(res.total)
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

    // 定义渲染分页的方法
    function renderPage(total) {  //total是接口文档数据传
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', //注意，这里的 pageBox 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示多少条数据
            curr: q.pagenum, //起始页码值
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //自定义排版
            limits:[2,3,5,10],// 选择每页显示多少条

            // 当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                console.log(first);
                console.log(obj.curr);
                // 把最新的条目数，赋值到 q 这个查询参数对象中
                q.pagesize = obj.limit
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                // 重新渲染表格
                //首次不执行
                if(!first){
                    initTable()
                }
              }
          });
    }

})