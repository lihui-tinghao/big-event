

// 页码
var data = {
    pagenum: 1,
    pagesize: 2,
}
//定义模板引擎的过滤器函数  t代表原本就要输出的值
template.defaults.imports.time = function (t) {
    var date = new Date();
    var y = date.getFullYear();
    var m = addZero(date.getMonth() + 1);
    var d = addZero(date.getDate());
    var h = addZero(date.getHours());
    var f = addZero(date.getMinutes());
    var mi = addZero(date.getSeconds());
    return `${y}-${m}-${d}-${h}:${f}:${mi} `;
}
//补零函数
function addZero(n) {
    return n < 10 ? '0' + n : n;
}
//-----------------------------获取文章列表-------------------------------
function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            console.log(res);
            var str = template('tpl-article', res);
            $('tbody').html(str);
            showPage(res.total);
        }
    });
}
renderArticle();
//-----------------------------分页-------------------------------
// 1.   加载layui的laypage分页模块 
var laypage = layui.laypage;

// 2. 使用封装函数 传递所需要的参数
function showPage(t) {
    laypage.render ({
        elem:'page',  //   这里的page是ID值  不要加 #
        count:t,   //代表的是数据总数  也就是res.total 
        limit:data.pagesize,   //每页显示几条数据
        curr:data.pagenum,  //当前页  选中
        limis:[2,3,4,5],  //将下拉框中数据更改  和下面一行代码中limit配合使用
        //自定义排版
        /*
        (下面的都是代表什么?
               1.下拉框选择每页显示条数 )
               2.上一页
               3.页数
               4.下一页
               5.总页数
               6.跳转页数
               */
        layout:['limit','prev','page','next','count','skip'],
        //分页的回调，（showPage调用时触发第一次  后续点击页码还会触发）
        jump:function(obj,first){
            console.log(obj.curr);  //得到当前页  以便向服务器请求对应页的数据
            console.log(obj.limit); // 得到每一页显示的条数

            //首次不执行
            if (!first) {
                //修改当前页码
                data.pagenum = obj.curr;   // 比如点击了第3页 obj.curr=3,把3赋值给ajax请求参数data
                //修改每页显示的条数
                data.pagesize = obj.limit;  //比如修改了每页显示5条  及时更新ajax请求参数
                renderArticle();
            }
        } 
    });
}
//-----------------------------筛选-------------------------------
var form = layui.form;
$.ajax({
    url:'/my/category/list',
    success:function(res){
        var str = template('tpl-category',res);
        //追加数据
        $('#category').append(str);
        //更新渲染
        form.render('select');
    }
});
//-------完成筛选------
$("#search").on('submit',function(e){
    e.preventDefault();
    //获取两个下拉框的值
    var cate_id = $("#category").val();
    var state = $('#state').val();
    
    //设置ajax请求参数
    //如果存在ID或者存在状态值  就获取到  如果没选 就删除
    if (cate_id) {
        data.cate_id = cate_id;
    }else {
        delete data.cate_id;
    }
    if (data.state) {
        data.state = state;
    }else {
        delete data.state;
    }

    //筛选完以后  重新设置页码为1
    data.pagenum = 1;
    //重新渲染一下页面
    renderArticle();
    
})


