//---------------------------获取用户信息---------------------
function user() {
    $.ajax({
        url: '/my/user/userinfo',
        success: function (res) {
            if (res.status === 0) {
                //设置欢迎你 xxx
                var name = res.data.nickname || res.data.username;
                $(".username").text(name);
                // 2 设置头像
                if (res.data.user_pic) {
                    //说明有头像
                    $(".layui-nav-img").attr("src", res.data.user_pic).show();
                    $(".text-avatar").hide();

                } else {
                    //说明没头像
                    var first = name.substr(0, 1).toUpperCase();
                    $(".text-avatar").text(first).css('display', 'inline-block');
                }
            }
        }
    });
}
user();
//---------------------------退出-------------------------------------
$('#userinfo').on('click', function (e) {
    e.preventDefault();
    //弹出层  询问是否退出
    layer.confirm('确定退出吗？', function (index) {
        //do something

        //清除token
        localStorage.removeItem("token");
        location.href = './login.html';
        //结束弹出层
        layer.close(index);
    });

})