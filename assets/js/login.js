//------------------------------切换两个盒子-----------------------------------
$(".login a").on("click",function(){
    $(".login").hide().next().show();
})
$(".register a").on("click",function(){
    $(".login").hide().next().show();
})