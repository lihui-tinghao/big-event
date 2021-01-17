

//----------------------------创建剪裁区-------------------------------
var $image = $("#image");
//设置配置项
var option = {
    //纵横比（宽高比）
    aspectRatio:1,  //正方形
    //指定预览区域
    preview: '.img-preview'  //指定预览区的类名
};
//调用cropper方法  创建剪裁区
$image.cropper(option);
//点击选择头像，能够实现选择图片
$('.title').on('click',function(){
    //触发点击事件
    $('#file').trigger('click');
});
//----------------------------文件域内容改变了，能够更换剪裁区的图片-------------------------------
$('#file').on('change',function(){
    if (this.files.length > 0) {
        // 3.1 找到文件对象
        var fileObj = this.files[0];
        // 为文件对象创建临时的url
        var url = URL.createObjectURL(fileObj);
        // 更换裁剪区的图片（销毁裁剪框     更换图片     重新生成裁剪框）
        $image.cropper('destroy').attr('src',url).cropper(option);
    }
});
//----------------------------点击确认修改按钮，实现更换头像-------------------------------
$('.sure').on('click',function(){
    //裁剪图片  得到canvas
    var canvas = $image.cropper('getCroppedCanvas',{width:30,height:30});

    // 把canvas转成base64格式字符串
    var base64 = canvas.toDataURL();
    // ajax提交即可
    $.ajax({
        type:'POST',
        url:'/my/user/avatar',
        data:{avatar:base64},
        success: function(res){
            layer.msg(res.message);
            if (res.status === 0 ) {
                // 更新index.html的头像
                window.parent.user();
            }
        }
    });
})