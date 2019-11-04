$(()=>{
    //访问学生信息
    let stuinfo = getLocalStorage("std-decision-entity")
    let stuNo = stuinfo.stuNo
    // console.log(stuNo)
    $.ajax({
        type:"GET",
        url:`${config.ip}:${config.port}/teacher/student/${stuNo}`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", localStorage.getItem("userinfo"));
        },
        success(data){
            // console.log(data.data)
            let person_info = data.data
            let template = `<div class="window-tittle">
            <span id="">${person_info.name}</span>鉴定表
        </div>
        <div class="content flexbox">
            <div class="content-name">学院：<span id="" class="black">${person_info.college}</span></div>
            <div class="content-name">专业：<span id="" class="black">${person_info.major}</span></div>
        </div>
        <div class="content flexbox">
            <div class="content-name">姓名：<span id="" class="black">${person_info.name}</span></div>
            <div class="content-name">学号：<span id="" class="black">${person_info.stuNo}</span></div>
        </div>
        <div class="content flexbox">
                <div class="content-name">实习单位：<span id="" class="black">${person_info.corpName}</span></div>
                <div class="content-name">实习岗位：<span id="" class="black">${person_info.corpPosition}</span></div>
            </div>

            <div class="msg-block">
            <div class="title">鉴定表</div>
            <div class="content">
                <div class="content-name">实习内容</div>
                <div class="inner-content">${stuinfo.sxContent?stuinfo.sxContent:"暂无"}</div>
                <!-- <div class="time"><span class="time-text">时间</span><span class="time-inner">2019/10/24</span></div> -->
            </div>
            <div class="content">
                <div class="content-name">自我总结</div>
                <div class="inner-content">${stuinfo.selfSummary?stuinfo.selfSummary:"暂无"}</div>
                <!-- <div class="time"><span class="time-text">时间</span><span class="time-inner">2019/10/24</span></div> -->
            </div>
        </div>


            `
            // console.log(stuinfo)
            $(".person-info").html(template)
            // let temp_time = stuinfo
            // console.log(temp_time)
            console.log(stuinfo)
            //实习单位指导教师评语
            corpTeacherOpinion.value = stuinfo.corpTeacherOpinion
            //实习单位指导教师实习成绩
            corpTeacherScore.value = stuinfo.corpTeacherScore?stuinfo.corpTeacherScore:"优秀"
            //实习单位指导教师实习成绩时间
            CTODate.value = stuinfo.ctodate?stuinfo.ctodate:null
            //实习单位审核意见
            corpOpinion.value = stuinfo.corpOpinion
            //实习单位审核意见时间
            CODate.value = stuinfo.codate?stuinfo.codate:null
            //所在学院指导老师成绩评定
            teacherGrade.value = stuinfo.teacherGrade
            //所在学院指导老师成绩评定时间
            TGDate.value = stuinfo.tgdate?stuinfo.tgdate:null
            //综合实习成绩评定
            comprehsvGrade.value = stuinfo.comprehsvGrade
            //综合实习成绩评定时间
            CGDate.value = stuinfo.cgdate?stuinfo.cgdate:null
            //所在学院实习领导小组意见
            collegePrincipalOpinion.value = stuinfo.collegePrincipalOpinion
            //所在学院实习领导小组意见时间
            CPODate.value = stuinfo.cpodate?stuinfo.cpodate:null
        }
    })


    $(".submit").on("click",function(){
        let options = {
            stuNo:stuinfo.stuNo,
            corpTeacherOpinion:corpTeacherOpinion.value,
            corpTeacherScore:corpTeacherScore.value,
            // CTODate:CTODate.value,
            corpOpinion:corpOpinion.value,
            // CODate:CODate.value,
            teacherGrade:teacherGrade.value,
            // TGDate:TGDate.value,
            comprehsvGrade:comprehsvGrade.value,
            // CGDate:CGDate.value,
            collegePrincipalOpinion:collegePrincipalOpinion.value,
            // CPODate:CPODate.value,
            id:stuinfo.id
        }
        console.log(CTODate.value)
        if(CTODate.value){
            options.CTODate = CTODate.value
        }
        if(CODate.value){
            options.CODate = CODate.value
        }
        if(TGDate.value){
            options.TGDate = TGDate.value
        }
        if(CGDate.value){
            options.CGDate = CGDate.value
        }
        if(CPODate.value){
            options.CPODate = CPODate.value
        }
        console.log(options)
        $.ajax({
            type:"POST",
            url:`${config.ip}:${config.port}/teacher/student/identifyForm`,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", localStorage.getItem("userinfo"));
            },
            data:options,
            success(data){
                alert("提交成功!")
                window.location.href = "/teacher"
            }
        })

    })
})