$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称必须在1-6个字符之间"
            }
        }
    })
    inituserinfo()

    function inituserinfo() {
        $.ajax({
            methed: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("请求数据失败")
                }
                form.val("formUserInfo", res.data)
            }
        })
    }
    $("#btnReset").on("click", function(e) {
        e.preventDefault()
        inituserinfo()
    })
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getuserinfo()
            }
        })
    })
})