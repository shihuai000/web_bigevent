$(function() {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6-12位"],
        samePwd: function(value) {
            if (value === $("[name=oldPwd]").val()) {
                return "新旧密码不能一致"
            }
        },
        rePwd: function(value) {
            if (value !== $("[name=newPwd]").val()) {
                return "密码不一致,请重新输入"
            }
        }
    })
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("修改失败")
                }
                layui.layer.msg("修改密码成功")
                $(".layui-form")[0].reset()
            }

        })
    })
})