$(function () {
    $('#qzc').click(function () {
        $('#dl').hide()
        $('#zc').show()
    })
    $('#qdl').click(function () {
        $('#zc').hide()
        $('#dl').show()
    })

    // 表单验证
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        rpwd: function (value) {
            var pwd = $('.rpwd').val()

            if (pwd !== value) {
                return '两次密码不一致'
            }
        }



    })

    var layu = layer.msg
    // 监听注册事件
    $('#form_zc').on('submit', function () {
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: { username: $('#form_zc [name=username]').val(), password: $('#form_zc [name=password]').val() },
            success: function (res) {
                if (res.status != 0) {
                    return  layer.msg(res.message, function () {
                        //do something
                    });
                }
                $('#form_zc')[0].reset()
                layer.msg('注册成功', { icon: 6 });
                $('#qdl').click()
            }
        })

        return false
    })


    // 监听登录事件
    $('#form_dl').submit(function () {

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $('#form_dl').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, function () {
                        //do something
                    })
                }
                layer.msg('登录成功', { icon: 6 });
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        })


        return false
    })



















})