$(function () {

    cc()
    var layer = layui.layer
    $('#tc').on('click', function () {
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'


            layer.close(index);
        });





    })
})


function cc() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                console.log(res);
                return layui.layer.msg('获取用户信息失败')
            }
            render(res.data)
        }

    })

}
function render(data) {
    var name = data.nickname || data.username
    $('#pan').html('欢迎&nbsp;' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-tx1').hide()
    } else {
        var fir = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-tx1').html(fir)
    }
}
