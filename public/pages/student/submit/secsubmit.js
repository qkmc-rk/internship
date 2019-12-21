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
                if(msg.stage2GuideDate){
                    var firtime = msg.stage2GuideDate.split(' - ')[0]
                    var lasttime = msg.stage2GuideDate.split(' - ')[1]
                }
                
                firtimeinput.value = firtime?firtime:""
                lasttimeinput.value = lasttime?lasttime:""
                starttime.value = msg.stage2Date
                method.value = msg.stage2GuideWay
                summary.value = msg.stage2Summary

                $('.limit').each((index,item)=>{

                    $(item).find('.summary-num').html($(item).siblings().get(1).value.length)

                })
            },
            error:(err)=>{
                alert("服务器繁忙,请重试")
            }
    })

    $('#summary').on("input",()=>{
        // console.log(111)
        $('.summary-num').html($('#summary').get(0).value.length)
        // $(this).find('.summary-num').html($(this).siblings().get(1).value.length)
    })

    $.ajax({
        type:"get",
        url:`${config.ip}:${config.port}/user/reportStage`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            // console.log(data.data.isReportStage2Open)
            if(data.data.isReportStage2Open){
                $('.showToast').css({
                    display:"none"
                })
                
                $(".submit").on("click",()=>{
                    if(!starttime.value){
                        alert("填写时间为必填项!")
                        return
                    }
                    let stage2_summary = summary.value
                    let stage2Date   = starttime.value ;
                    let stage2GuideWay  = method.value ;
                    // let gmtStart = 
                    let gmtEnd = firtimeinput.value+" - "+lasttimeinput.value;
                    console.log(gmtEnd)
                    // console.log(summary.value.length)
                    if(summary.value.length>1050){
                        alert("字数超过限制,请更改后提交!")
                        return
                    }
                    $.ajax({
                        type:"post",
                        url:`${config.ip}:${config.port}/student/report/stage2`,
                        dataType:"json",
                        data:{
                            stage2Date :stage2Date ,
                            stage2GuideDate:gmtEnd,
                            stage2Summary:stage2_summary,
                            
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