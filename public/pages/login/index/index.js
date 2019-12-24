$(function(){
    document.onselectstart = function(){return false}
    var radio = document.getElementsByName("identity")
    // console.log(111)
    // console.log(IEVersion())
    let useridentity = null;
    // console.log(BrowserType())
    if(BrowserType()!=='Edge' && BrowserType()!=='Chrome'){
        alert("您现在使用的浏览器不完全兼容javascrpt ES6特性,建议更换至谷歌浏览器或Edge浏览器")
    }
    // 在这个位置加载验证码
    const url = `${config.ip}:${config.port}/user/verifycode`;
    $("#verifyimg").attr("src",url);
    // 校验登录框
    $("#account").on('blur',()=>{
        checkIfFirstLogin();
    });
    // 校验注册框
    $(".reg-land-btn").click(()=>{
        registerUserCheck();
    });
    // 校验登录框
    $(".land-btn").click(()=>{
        console.log("嘿嘿");
        userCheck();
    });
    //刷新验证码的几个事件绑定
    $(".refreshcode").click(()=>{
        $("#verifyimg").attr("src",url + "?" + Math.random()*10000);
    });
    $("#verifyimg").click(()=>{
        $("#verifyimg").attr("src",url + "?" + Math.random()*10000);
    });
    $(".reg-refreshcode").click(()=>{
        $("#reg-verifyimg").attr("src",url + "?" + Math.random()*10000);
    });
    $(".verifyimg").click(()=>{
        $("#reg-verifyimg").attr("src",url + "?" + Math.random()*10000);
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
        console.log("哈哈");
        console.log(useridentity)
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
                    console.log(data);
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

    function registerUserCheck(){
        for(let item of radio){
            if(item.checked){
                useridentity = item.value
            }
        }
        var account = $("#reg-account").val();
        var idcard = $("#reg-idcard").val();
        var password = $("#reg-password").val();
        var repassword = $("#re-reg-password").val();
        var code = $("#reg-verifycode").val();
        let loginType = useridentity;
        if(idcard === ''){
            alert("身份证号码信息未填写!");
            return;
        }else if(!loginType){
            alert("请选择身份!")
            return;
        }else if(password === '' || repassword === ''){
            alert("请输入密码!")
            return;
        }else if(password !== repassword){
            alert("密码不一致!")
            return;
        }else{
            if(code == null || code == ""){
                alert("验证码不能为空");
                return
            }
            // 注册
            $.ajax({
                type:"POST",
                url:`${config.ip}:${config.port}/user/register`,
                data:{
                    account:account,
                    idcard:idcard,
                    password:password,
                    loginType:loginType,
                    code: code
                },
                dataType:"json",
                success:function(data){
                    // 请求成功时
                    if(data.status === 1){
                        alert("注册成功！");
                        toLogin();
                    }else{
                        alert("注册失败: " + JSON.stringify(data));
                        toLogin();
                    }
                },
                error:function(err){
                    alert('服务器繁忙,请重试!')
                }
            })
        }
    }
})

function checkIfFirstLogin(){
    var account = $("#account").val();
    $.ajax({
        type:"GET",
        url:`${config.ip}:${config.port}/user/loginstatus`,
        data:{
            account:account,
        },
        dataType:"json",
        success:function(data){
            // 请求成功时
            console.log(data);
            if(data.status === 1){
                var rs = JSON.parse(data.data);
                if(rs.isFirstLogin === true){
                    // 第一次登陆, 需要注册
                    toRegister();
                }
            }
        },
        error:function(err){
            alert('服务器繁忙,请重试!')
        }
    })
}

function toLogin(){

    $("#register-box").attr('style','display:none;');
    //因为切换了视图所以需要重新刷新验证码
    var url = `${config.ip}:${config.port}/user/verifycode`;
    $(".verifyimg").attr("src",url + "?" + Math.random()*10000);
    $("#login-box").removeAttr('style');
}
function toRegister(){
    var account = $("#account").val();
    $("#login-box").attr('style','display:none;');
    $("#reg-account").val(account);
    //因为切换了视图所以需要重新刷新验证码
    var url = `${config.ip}:${config.port}/user/verifycode`;
    $(".verifyimg").attr("src",url + "?" + Math.random()*10000);
    $("#register-box").removeAttr('style');
    setTimeout(()=>{
        alert("系统检测您的账号还未登陆过系统，请注册!");
    },300)
}