window.onload = ()=>{
    redirectTo(document.getElementsByClassName("list")[0].getElementsByTagName('li')[0],"/student/first")

    redirectTo(document.getElementsByClassName('item')[0],"/student");
    redirectTo(document.getElementsByClassName('item')[2],"/student-decision");

    $.ajax({
            type:"get",
            url:`${config.ip}:${config.port}/student/reportForm`,
            dataType:"json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success:(data)=>{
                const msg = data.data
                // console.log(msg)
                starttime.value = msg.stage2GuideDate
                method.value = msg.stage2GuideWay
                summary.value = msg.stage2Summary
            },
            error:(err)=>{
                alert("服务器繁忙,请重试")
            }
    })
    $.ajax({
        type:"get",
        url:`${config.ip}:${config.port}/user/reportStage`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            console.log(data.data.isReportStage2Open)
            if(data.data.isReportStage2Open){
                $('.showToast').css({
                    display:"none"
                })

                $(".submit").on("click",()=>{
                    let stage2_summary = summary.value
                    let stage2GuideDate  = starttime.value ;
                    let stage2GuideWay  = method.value ;
                    $.ajax({
                        type:"post",
                        url:`${config.ip}:${config.port}/student/report/stage2`,
                        dataType:"json",
                        data:{
                            stage2_summary:stage2_summary,
                            stage2GuideDate:stage2GuideDate,
                            stage2GuideWay:stage2GuideWay
                        },
                        beforeSend: function(request) {
                            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
                        },
                        success:(data)=>{
                            alert("提交成功!")
                            window.location.href = "/student"
                        }
                    })
                })

            }
            
        },
        error(){}
    })

    $('.logout').on("click",()=>{
        alert("注销成功")
        sessionStorage.setItem("userinfo","")
        window.location.href = "/logout"
    })

    
}