initEditor(); // 调用函数，就会把 textarea 替换为富文本编辑器

// 1. 初始化剪裁框
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)