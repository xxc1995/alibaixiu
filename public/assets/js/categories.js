$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
var html = template('categoriesTpl',{data:res});
$('#categoryBox').html(html)
    }
})

//实现添加分类功能
$('#addCategory').on('submit',function() {
   $.ajax({
       type:'post',
       url:'/categories',
       data:$(this).serialize(),
       success:function() {
           location.reload()
       }
   })
})



//为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
            var html = template('modifyCategoryTpl',res);
            $('#modifyBox').html(html)
        }
    })
})

//修改分类表单发生提交行为
$('#modifyBox').on('submit','#modifyCategory',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;
})
