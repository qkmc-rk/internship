$(function(){
    $('.land-btn').on("click",function () {
        userCheck();
    });
})
function userCheck(){
    var radio = document.getElementsByName("identity");
    let useridentity = null;
    for(let item of radio){
        if(item.checked){
            useridentity = item.value
        }
    }
    console.log(useridentity);
    let useraccount = $("#account").val();
    let pwd = $("#password").val();
    console.log(pwd)
    let idcard = $("#idcard").val();
    let pwd2 = $("#password2").val();

    if(idcard === null || idcard === ""){
        alert("身份证不能为空");
        return
    }
    let loginType = useridentity;
    if(!loginType){
        alert("请选择身份!")
        return
    }

    if(pwd == null || pwd == ""){
        alert("密码不能为空");
        return
    }
    if(useraccount == null || useraccount == ""){
        alert("账号不能为空");
        return
    }
    if(pwd2 == null || pwd2 == ""){
        alert("密码2不能为空");
        return
    }
    if(pwd2 != pwd){
        alert("输入相同的密码");
        return
    }
    $.ajax({
        type:"POST",
        url:`${config.ip}:${config.port}/user/password`,
        data:{
            account:useraccount,
            password:pwd,
            idCard:idcard,
            type: useridentity
        },
        dataType:"json",
        success:function(data){
            // 请求成功时
            console.log(data);
            if(data.status === 1){
                alert("修改成功, 请登录");
                window.location.href="/";
            }else{
                alert(data.message);
            }
        },
        error:function(err){
            alert('服务器繁忙,请重试!')
        }
    })

}