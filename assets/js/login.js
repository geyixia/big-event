$(function(){
// layui是全局对象，通过它可以得到form对象
var form = layui.form
// 基于LayUI自定义表单验证规则
form.verify({
    // 必须是6-8位字符,不包括空格
    uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符'],
    // 密码必须是6位数字
    pwd: function (value, item) {
      // 形参value标书对应输入域的值
      // item表示DOM元素
      // 验证6位数字
      var reg = /^\d{6}$/
      // 如果规则不匹配就返回提示
      if (!reg.test(value)) {
        return '密码必须是6位数字'
      }
    },

  // 验证确认密码必须和原有密码一致
  same: function (value) {
    // 获取原始密码
    var pwd = $('#registerForm input[type=password]').val()
    if (pwd !== value) {
      return '两次输入的密码必须一致'
    }
  }
  })
// 控制表单的提交
$('#loginForm').submit(function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 获取表单输入域的用户名和密码
    // username=asdf&password=asdffffff
    var formData = $(this).serialize()
    // 提交表单之前表单验证用layUI实现 在页面结构添加类
    console.log(formData)
    // 调用后台接口验证是否正确
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/login',
      data: formData,
      success: function (res) {
        // 登录成功后，跳转到主页面
        if (res.status === 0) {
          //把登陆成功的标志位存储在客户端
          localStorage.setItem('mytoken',res.token)
          location.href = './index.html'
        }
      }
    })
  })
  // 控制登录表单和注册表单的切换
  // 登录表单的底部链接
  $('#loginForm a').click(function () {
    $('#loginForm').hide()
    $('#registerForm').show()
})

// 注册表单的地步链接
  $('#registerForm a').click(function () {
   // 点击后应该做什么？切换表单的显示和隐藏
    $('#loginForm').show()
   $('#registerForm').hide()
  })

  // 实现注册功能
  // - 监听注册提交事件  阻止默认提交行为 调用接口提交表单 注册成功后显示登陆表单
  // 控制注册表单的提交
  $('#registerForm').submit(function (e) {  
    e.preventDefault()
    // 获取表单数据(表单输入域必须提供name属性，name的值必须和接口文档要求一致)
    // 验证两次密码是否一致
    var formData = $(this).serialize()
    // 调用接口进行注册
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data: formData,
      success: function (res) {
        if (res.status === 0) {
        // 注册成功，显示登陆框
          $('#registerForm a').click()
        }else{
          // 注册失败
          // layer是一个独立的模块，默认可以直接使用
            layer.msg(res.message)
        }
     }
   })
  })

})