initEditor(); // 调用函数，就会把 textarea 替换为富文本编辑器

//---------------------------------- 1. 封面图片处理-----------------------
// 1.1 初始化图片裁剪器
var $image = $('#image')

// 1.2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}
// 1.3. 初始化裁剪区域
$image.cropper(options);


// 2 点击按钮  触发文件域的单击事件  能够选择图片
$('button:contains("选择封面")').on('click', function () {
    $('#file').trigger("click");
});
//当文件域的内容改变的时候   更换剪裁区内容
$('#file').on('change', function () {
    //找到对象  图片都保存在files中
    var fileObj = this.files[0];
    //生成url
    var url = URL.createObjectURL(fileObj);
    //更换剪裁区的图片  （先销毁图片  更换图片   生成剪裁区）
    $image.cropper('destroy').attr('src', url).cropper(options);
});
$('form').on('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(this); //传入表单的DOM对象
    //单独向fd中添加content
    fd.set('content', tinyMCE.activeEditor.getContent());
    //对于图片来说  先剪裁  向fd中追加文件对象
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });
    //吧canvas转成blob二进制形式
    canvas.toBlob(function (blob) {
        fd.append('cover_img', blob);  //把blob追加到fd中  会自动变成文件对象

        $.ajax({
            url:'/my/article/add',
            type:'POST',
            data:fd,
            //提交formdata对象   必须加下面两个选项
            contentType:false,
            processData:false,
            success: function(res){
                layer.msg(res.message);
                if (res.status === 0) {
                    //添加成功 跳转到列表页
                    location.href = './list.html'
                }
            }
        });
        // //检查fd中有那些值
        // fd.forEach(function (val, key) {
        //     console.log(key,val);
        // });
    });
    
})


//--------------------------获取分类  渲染到下拉框的位置-----------------------------
var form = layui.form;
$.ajax({
    url: '/my/category/list',
    success: function (res) {
        var str = template('tpl-category', res);
        //追加数据
        $('select[name=cate_id]').append(str);
        //更新渲染
        form.render('select');
    }
});