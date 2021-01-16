//-------------------------完成重置密码-----------------------------
$("form").on("submit",function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type:'POST',
        url:'/my/user/updatepwd',
        data:data,
        success: function(res){
            layer.msg(res.message);
            if (res.status === 0) {
                // 更改密码 需要重新登录  删除token
                localStorage.removeItem("token");
              window.parent.location.href = '../login.html';
            }
        }
    });
})
//-----------------------------表单验证-------------------------------
var form = layui.form;
form.verity = {
    //
    len:[/^\S{6,12}$/,'长度必须是6-12位且不能出现空格'],
    //新旧密码不能一样
    diff: function(val){
        if (val === $('input[name=oldPwd]').val()) {
            return '新旧密码不能一样'
        }
    },
    
    same:function(val){
        if (val !== $('input[name=oldPwd]').val()) {
            return '两次密码不一致'
        }
    }
}