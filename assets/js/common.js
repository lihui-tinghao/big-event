// 项目通用匹配文件

//项目的根路径
var baseUrl = 'http://www.itcbc.com:8080';

//通过ajaxPrefilter 配置url headers complete
$.ajaxPrefilter(function(option){
    option.url = baseUrl + option.url;
    //配置headers 因为请求以my开头的接口的时候 必须带请求头
    option.headers = {
        Authorization:localStorage.getItem("token"),
    };
    //如果请求失败了 将原来的token清除掉  调转到登录页面
    option.complete = function(xhr){
        //json类型的响应结果
        var res = xhr.responseJSON;
        if (res && res.status === 1 && res.message === "身份认证失败！") {
            //清除掉过期token
            localStorage.removeItem("token");
            location.href = './login.html';
        }
        //如果用户名重复了  
        if (res && res.status === 1) {
            layer.msg(res.message);
        }
    }
});