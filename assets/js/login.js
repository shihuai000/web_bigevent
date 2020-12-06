$(function() {
    $("#login_box_a").on("click", function() {
        $(".login_box").hide()
        $(".reg_box").show()
    })
    $("#reg_box_a").on("click", function() {
        $(".reg_box").hide()
        $(".login_box").show()

    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [/^[\S]{6,12}$/, "密码必须6到12位，不能使用空格"],
            repwd: function(value) {
                var pwd = $(".reg_box [name = password]").val()
                if (pwd !== value) {
                    return "两次密码不一致，请重新输入"
                }
            }
        })
        //----------------------------
    $("#form_reg").on("submit", function(e) {
        e.preventDefault()
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功。请登录")
            $("#reg_box_a").click()
        })

    })
    $("#form_login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            method: "post",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败")
                }
                layer.msg("登陆成功")
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })

})