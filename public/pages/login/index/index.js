$(function(){
    document.onselectstart = function(){return false}
    var radio = document.getElementsByName("identity")
    // console.log(111)
    // console.log(IEVersion())
    let useridentity = null;
    // console.log(BrowserType())
    if(BrowserType()!=='Edge'&&BrowserType()!=='Chrome'){
        alert("您现在使用的浏览器不完全兼容此网页,请更换至谷歌浏览器或Edge浏览器")
        return
    }
    document.getElementsByClassName("land-btn")[0].onclick = userCheck
    

    //----------------------表单验证--------------------
    let $loginBtn = $(".land-btn");
    let $inputs = $("input");
    let $warnWord = $(".warn-word");
    window.onkeydown = function(e){
      if(e.keyCode == 13){
        userCheck()
      }
    }
    // $loginBtn.click(function() {
    //   if (!$($inputs[0]).val()) {
    //     window.location.href = "#";
    //     $($warnWord[0]).css("display", "block");
    //   }else{
    //     $($warnWord[0]).css("display", "none");
    //   }
    //   if (!$($inputs[1]).val()) {
    //     window.location.href = "#";
    //     $($warnWord[1]).css("display", "block");
    //   }else{
    //     $($warnWord[1]).css("display", "none");
    //   }
    // });

    function userCheck(){
        for(let item of radio){
            if(item.checked){
                useridentity = item.value
            }}
            // console.log(useridentity)
            
            let useraccount = account.value
            let psw = password.value
            let loginType = useridentity
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
                         loginType:loginType
                    },
                    dataType:"json",
                    success:function(data){
                         // 请求成功时
                        //  console.log(data)
                        // location.sessionStorage.setItem("test",1)
                        // sessionStorage.setItem("test",1)
                         if(data.status === 1){
                             sessionStorage.setItem("userinfo",data.data.Authorization)
                             if(useridentity==="Student"){
                                 window.location.href = "/student"
                             }else if(useridentity==="Teacher"){
                                 window.location.href = "/teacher"
                             }
                             
                         }else{
                             alert(data.message)
                             console.log(data)
                         }
                    },
                    error:function(err){
                        alert('服务器繁忙,请重试!')
                    }
                })
            }
    }

})