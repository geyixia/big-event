$(function () {
    // 判断token是否存在 是否登录成功
    // 存储登录成功的标志  
    // 页面中需要判断登录成功的标志是否存在
     var mytoken=localStorage.getItem('mytoken')
     if(!mytoken){
         location.href='./login.html'
     }
     
    // --------------  获取用户信息，并渲染到页面中 ----------
    getUserInfo();

    // --------------  退出功能 ---------------------
    // 退出的时候，两个操作
    // - 删除token
    // - 页面跳转到登录页面
    $('#logout').click(function () {
        // 弹出层，询问是否要退出
        layer.confirm('你确定退出吗？你退出了还得登录，你想好了吗？', function (index) {
            //do something
            // 如果点击了确定，删除token，页面跳转
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index); // 关闭当前弹出层
        });
        
    });
});

// 封装函数，完成获取用户信息，并渲染到页面中
// 函数一定要放到入口函数外面。因为其他页面也要用
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                // 设置 欢迎语 （有昵称优先使用昵称，没有昵称，则使用账号）
                var name = res.data.nickname || res.data.username;
                $('.welcome').html('欢迎你&nbsp;&nbsp;' + name);
                // 设置 头像 （有图片，使用图片； 没有图片，使用名字的第一个字）
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-img').hide();
                } else {
                    $('.layui-nav-img').hide();
                    $('.text-img').css('display', 'inline-block').text(name.substr(0, 1).toUpperCase());
                }
            }
        }
    });
}
