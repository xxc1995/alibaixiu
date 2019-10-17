$.ajax({
    type:'get',
    url:'/posts',
    success:function(res){
        var html = template('postTpl',res);
        console.log(html);
        $('#postBox').html(html);
    }
});

//处理日期时间格式
function dateFormat(date) {
    //将日期字符串转换为日期对象
   date = new Date(date);
   return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';

}