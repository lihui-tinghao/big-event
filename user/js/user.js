//--------------------------------数据回填-----------------------------------
var form = layui.form;
function renderUser() {
    $.ajax({
        url:'/my/user/userinfo',
        success: function(res){
            if (res.status === 0 ) {
                //将表单中的数据全部获取到并回填
                //在标签内设置一个属性为lay-filter=“user”;
                // form.val('表单的lay-filter属性值', '对象形式的数据(对象的key要和表单各项的name属性值相同)');
                form.val('user',res.data);
            }
        }
    });
}
renderUser();
//--------------------------------完成用户信息的修改-----------------------------------
$("form").on("submit",function(e){
    e.preventDefault();
    var data = $(this).serializeArray();   //因为serializeArray()可以收集到禁用状态的值
    $.ajax({
        type:'POST',
        url:'/my/user/userinfo',
        data:data,
        success: function(res){
            layer.msg(res.message);
            if (res.status === 0) {
                //调用user（）更新昵称
                window.parent.user();
            }
        }
    });
});
//---------------------------------重置-----------------------------
$("button[type=reset]").on('click',function(e){
    e.preventDefault();
    renderUser();
})