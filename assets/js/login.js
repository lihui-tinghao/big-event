//------------------------------切换两个盒子-----------------------------------
$(".login a").on("click",function(){
    $(".login").hide().next().show();
});
$(".register a").on("click",function(){
    $(".login").show().next().hide();
});
//------------------------------注册功能-----------------------------------
//表单提交--->阻止默认行为-->收集表单数据-->ajax请求
$(".register form").on("submit",function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type:"POST",
        url:'/api/reguser',
        data:data,
        success:function(res){
            layer.msg(res.message);
            if (res.status === 0) {
                //清空输入框  找到表单 转为dom对象  调用dom方法reset  重置表单
                $(".register form")[0].reset();
                //切换到登录的盒子
                $(".login").hide().next().show();
            }
        }
    });
});
//------------------------------自定义表单验证-----------------------------------

/*
必须使用layui 的内置模块--form模块
只要使用layui的模块  必须加载模块

*/
var form = layui.form;  //加载form模块
//调用form模块内置方法verify 自定义验证规则
form.verify({
    /*
       键（验证规则）: 值（验证方法）
        比如：验证用户名长度2-10位  只能用数字字母组合
    
    */
   user:[/^[a-zA-Z0-9]{2,10}$/,'用户名只能是数字字母，且6-12位'],
   //密码验证（\S是只要是非空格都可以）
   len:[/^\S{6,12}/,'密码6-12位且不能有空格'],
   //两次密码比较
   alike:function(val){
    /*
        1 形参val表示使用该验证规则的输入框的值 （谁用该验证规则  val表示谁的值）
        2 案例中  重复密码使用了该验证规则，所以val表示的是输入的重复密码
        
    */
    if (val !== $(".psd").val()) {
        //return  提示信息
        return '两次密码不一样哦'
    }
   }
});
//------------------------------登录功能-----------------------------------
$(".login form").on("submit",function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type:'POST',
        url:'api/login',
        data:data,
        success: function(res){
            layer.msg(res.message);
            if (res.status === 0) {
                localStorage.setItem("token",res.token);
                location.href = './index.html';
            }
        }
    });
})