$(()=>{
    redirectTo(document.getElementsByClassName("item")[0],"/student")
    redirectTo(document.getElementsByClassName("item")[1].getElementsByTagName("li")[0],"/student/first")
    redirectTo(document.getElementsByClassName("item")[1].getElementsByTagName("li")[1],"/student/twice")
    $('.logout').on("click",()=>{
        alert("注销成功")
        sessionStorage.setItem("userinfo","")
        window.location.href = "/logout"
    })
    $.ajax({
        type:"get",
            url:`${config.ip}:${config.port}/student/identifyForm`,
            dataType:"json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success:(data)=>{
                // console.log(data)
                const msg = data.data
                practiceContent.value = msg.sxContent
                selfSummary.value = msg.selfSummary

                $('.practice-num').html(practiceContent.value.length)
                $('.self-num').html(selfSummary.value.length)
            },
            error:(err)=>{
                alert("服务器繁忙,请重试")
            }
    })
    $('#practiceContent').on("input",()=>{
        $('.practice-num').html($('#practiceContent').get(0).value.length)
    })
    $('#selfSummary').on("input",()=>{
        $('.self-num').html($('#selfSummary').get(0).value.length)
    })
    $('.submit').on("click",()=>{
        let pra = practiceContent.value
        let summary = selfSummary.value
        if(pra.length>1200){
            alert('实习内容长度超过限制,请修改后提交!')
            return
        }
        if(summary.length>1200){
            alert('实习自我总结长度超过限制,请修改后提交!')
            return
        }
        $.ajax({
            type:"post",
            url:`${config.ip}:${config.port}/student/identify`,
            dataType:"json",
            data:{
                practiceContent:pra,
                selfSummary:summary
            },
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success:function(){
                // if()
                alert("提交成功!")
                window.location.href = "/student"
            }
        })
    })
})