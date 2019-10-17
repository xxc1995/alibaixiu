//创建用户
$('#userForm').on('submit',function() {
    var formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(res){
           /*  console.log(res); */
           location.reload();
        }
    })

    console.log(formData);
    return false;
})
//上传用户头像文件
$('#modifyBox').on('change',"#avatar",function(){
    //用户选择文件
    var formData = new FormData();
    formData.append('avatar',this.files[0]);

    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //告诉ajax不要解析请求参数
        processData:false,
        contentType:false,
        success:function(res){
            /* console.log(res); */
            $('#hiddenImg').val(res[0].avatar);
            $('#preview').attr('src',res[0].avatar)
        }
    })
})
//获取用户列表
$.ajax({
    type:'get',
    url:'/users',
    success:function(res) {
       /*  console.log(res); */
      html =  template('usersTpl',{data:res});
      $('#userList').html(html);
    }
})
//通过事件委托为编辑按钮添加点击事件
$('#userList').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    console.log(id);
    //通过id获取当前这一条要编辑的信息
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(res) {
            console.log(res);
            var html = template('modifyTpl',res);
            console.log(html);
            $('#modifyBox').html(html);
        }
    })
})
//用事件委托为表单修改添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function() {
    //获取表单数据
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    console.log(formData);
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;

})

//删除功能
$('#userList').on('click','.delete',function() {
    if(confirm('确认删除吗')){
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload()
            }
        })
    }
})

//批量删除选中
$('#checkAll').on('change',function(){
    var bool = $(this).prop('checked');
    var checklist = $("#userList input[type = 'checkbox'");
    checklist.prop('checked',bool);
    if(bool == true){
        $('#deleteAll').show();
    }else{
        $('#deleteAll').hide();
    }
})
$('#deleteAll').on('click',function() {
var checklist = $('#userList input[type = "checkbox"]:checked');
/* console.log(checklist) */
var str = '';
checklist.each(function(index,item) {
str += $(item).attr('data-id')+'-'
})
//截取最后的-
str = str.substr(0,str.length-1);
console.log(str);
$.ajax({
    type:'delete',
    url:'/users/'+str,
    success:function() {
        location.reload();
    }
})
})
//全选效果的切换
$('#userList').on('change',"input[type = 'checkbox']",function(){
    if($("#userList input[type = 'checkbox']").length == $('#userList input[type = "checkbox"]:checked').length){
        $('#checkAll').prop('checked',true)
    }else{
        $('#checkAll').prop('checked',false)
    }
    if($("#userList input[type = 'checkbox']").length > 0) {
        $('#deleteAll').show();
    }else{
        $('#deleteAll').hide();
    }
})

