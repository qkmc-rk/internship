window.onload = ()=>{
    redirectTo(document.getElementsByClassName("list")[0].getElementsByTagName('li')[1],"/student/twice")
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
                // console.log(data)
                const msg = data.data
                // console.log(msg)
                gmt_start.value = msg.gmtStart
                starttime.value = msg.stage1GuideDate
                method.value = msg.stage1GuideWay
                summary.value = msg.stage1Summary

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
            // console.log(data.data.isReportStage1Open)
            if(data.data.isReportStage1Open){
                $('.showToast').css({
                    display:"none"
                })

                $(".submit").on("click",()=>{
                    let stage1Summary = summary.value
                    let stage1GuideDate  = starttime.value ;
                    // console.log(typeof stage1GuideDate)
                    let stage1GuideWay  = method.value ;
                    let gmtStart = gmt_start.value;
                    
                    if(summary.value.length>1050){
                        alert("字数超过限制,请更改后提交!")
                        return
                    }
                    $.ajax({
                        type:"post",
                        url:`${config.ip}:${config.port}/student/report/stage1`,
                        dataType:"json",
                        data:{
                            gmtStart:gmtStart,
                            stage1Summary:stage1Summary,
                            stage1GuideDate:stage1GuideDate,
                            stage1GuideWay:stage1GuideWay
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