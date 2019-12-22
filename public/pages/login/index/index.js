$(function(){
    document.onselectstart = function(){return false}
    var radio = document.getElementsByName("identity")
    // console.log(111)
    // console.log(IEVersion())
    let useridentity = null;
    // console.log(BrowserType())
    if(BrowserType()!=='Edge'&&BrowserType()!=='Chrome'){
        alert("您现在使用的浏览器不完全兼容此网页,建议更换至谷歌浏览器或Edge浏览器")
    }
    //在这个位置加载验证码
    const url = `${config.ip}:${config.port}/user/verifycode`;

    $("#verifyimg").attr("src",url);
    $(".land-btn").click(()=>{
        userCheck();
    });
    $(".refreshcode").on("click",()=>{
        $("#verifyimg").attr("src",url);
    });
    //----------------------表单验证--------------------
    let $loginBtn = $(".land-btn");
    let $inputs = $("input");
    let $warnWord = $(".warn-word");
    window.onkeydown = function(e){
      if(e.keyCode == 13){
        userCheck()
      }
    }
    function userCheck(){
        for(let item of radio){
            if(item.checked){
                useridentity = item.value
            }
        }
        // console.log(useridentity)
        let useraccount = account.value
        let psw = password.value
        let code = verifycode.value;
        if(code == null || code == ""){
            alert("验证码不能为空");
            return
        }
        console.log(code);
        let loginType = useridentity;
        if(!loginType){
            alert("请选择身份!")
        }else if(!$($inputs[0]).val()){
            $($warnWord[0]).css("display", "block");
        }else if(!$($inputs[1]).val()){
            $($warnWord[1]).css("display", "block");
        }else{
            $($warnWord[0]).css("display", "none");
            $($warnWord[1]).css("display", "none");
            // console.log(useraccount)
            // console.log(psw)
            // console.log(loginType)
            $.ajax({
                type:"POST",
                url:`${config.ip}:${config.port}/user/login`,
                data:{
                    account:useraccount,
                    password:psw,
                    loginType:loginType,
                    code: code
                },
                dataType:"json",
                success:function(data){
                     // 请求成功时
                     if(data.status === 1){
                         sessionStorage.setItem("userinfo",data.data.Authorization)
                         if(useridentity==="Student"){
                             window.location.href = "/student"
                         }else if(useridentity==="Teacher"){
                             window.location.href = "/teacher"
                         }

                     }else{
                         alert(data.message);
                         //刷新验证码
                         $("#verifyimg").attr("src",url);
                     }
                },
                error:function(err){
                    alert('服务器繁忙,请重试!')
                }
            })
        }
    }
})