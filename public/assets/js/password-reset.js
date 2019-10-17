//修改密码
$('#modifyForm').on('submit',function() {
    //自动收集表单数据
    var formData = $(this).serialize();
    //调用接口
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success:function() {
            location.href = 'login.html'
        }
    })
    return false;
})