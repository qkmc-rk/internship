$(() => {
    $('body').delegate('.controls button:first', "click", function () {
        window.location.href = "/student/reports-details"
    })
    $('body').delegate('.controls button:last', "click", function () {
        window.location.href = "/student/decision-details"
    })
    let std = {}

    redirectTo(document.getElementsByClassName('list')[0].getElementsByTagName('li')[0],
        "/student/first");
    redirectTo(document.getElementsByClassName('list')[0].getElementsByTagName('li')[1],
        "/student/twice");
    redirectTo(document.getElementsByClassName("item")[2], "/student-decision")
    //---------------请求学生信息---------------------
    $.ajax({
        type: "get",
        url: `${config.ip}:${config.port}/student/selfInfo`,
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success: function (data) {
            std = data.data
            // console.log(std)
            let stdTemplate = ` <div class="title">学生信息</div>
            <div class="text"><span>姓名</span>${std.name}</div>
            <div class="text"><span>学号</span>${std.stuNo}</div>
            <div class="text"><span>微信</span>${std.wechat?std.wechat:"暂无"}</div>
            <div class="text"><span>qq</span>${std.qq?std.qq:"暂无"}</div>
            <div class="text"><span>电话</span>${std.phone?std.phone:"暂无"}</div>
            <div class="text"><span>专业</span>${std.major}</div>
            <div class="text"><span>实习岗位</span>${std.corpPosition?std.corpPosition:"暂无"}</div>
            <div class="text"><span>实习企业</span>${std.corpName?std.corpName:"暂无"}</div>
            <div class="text"><span>身份证号</span>${std.idCard}</div>
            <div class="text"><span>修改密码</span><br><input type="password" name="oldpsw" placeholder="旧密码" id="oldpsw"><br><input type="password" name="newpsw" placeholder="新密码" id="newpsw"><button class="psw-btn">修改</button></div>
            <div class="text">${std.college}</div>
            <div class="text"></div>
            <div class="controls"><button>实习报告表</button><button>实习鉴定表</button></div>`
            $('.student-info').html(stdTemplate)
            // console.log(std)

            position.value = std.corpPosition

            //---------------请求老师信息---------------------
            ajaxByGet('/student/teacherInfo', function (data) {

                let teacher = data.data
                // console.log(data)

                //判断是否绑定老师
                if (std.teacherNo) {
                    let teacherTemplate = `<div class="title">导师信息</div>
                <div class="text"><span>姓名</span>${teacher.name}</div>
                <div class="text"><span>性别</span>${teacher.sex}</div>
                <div class="text"><span>年龄</span>${teacher.age}</div>
                <div class="text"><span>工号</span>${teacher.teacherNo}</div>
                <div class="text">${teacher.college}</div>
                <div class="text"></div>`
                    $(".teacher-info").html(teacherTemplate)
                } else {
                    ajaxByGet('/student/teacher', function (data) {
                        let teacherList = data.data
                        let listtemplate = ``
                        for (let i = 0; i < teacherList.length; i++) {
                            listtemplate += `<option value="${teacherList[i].teacherNo}">${teacherList[i].name}</option>`
                        }
                        // console.log(listtemplate)
                        let selectTemplate = `<div class="title">导师信息</div>
                    <div class="selectTeacher">
                    <div class="tips">请绑定导师:</div>
                    <div class="select-controls">
                            <select name="selectTeacher" id="selectTeacher">
                                    <!-- <option value="-1">请选择</option> -->
                                    ${listtemplate}
                                </select>
                                <button class="select-btn">绑定</button>
                    </div>
                    
                    </div>`
                        $(".teacher-info").html(selectTemplate)
                    })


                }


            })




        },
        error: function (err) {
            console.log(err)
        }
    })




    $('body').delegate(".select-btn", "click", () => {
        console.log(selectTeacher.value)
        let options = {}
        options.tNo = selectTeacher.value
        ajaxByPost('/student/teacher', options, function (data) {
            alert("绑定成功!")
            // window.location.href = '/student'
            window.location.reload(true)

        })
    })

    $('.logout').on("click", () => {
        alert("注销成功")
        window.location.href = "/logout"
    })
    $('.position-binding').on("click", function () {
        // console.log(111)
        console.log(position.value)
        ajaxByPost('/student/student/position', {
            position: position.value
        }, function (data) {
            alert("绑定成功!请重新登录后查看绑定结果")
            window.location.reload()
        })
    })
    //--------------修改密码------------------------
    $("body").delegate(".psw-btn","click",function(){
        // console.log(111)
        let options = {
            newPassword:newpsw.value,
            oldPassword:oldpsw.value
        }
        ajaxByPost('/student/student/password',options,function(data){
            // alert("修改成功")
            console.log(data)
            if(data.status===-1){
                alert(data.message)
            }else{
                alert("修改成功")
                window.location.reload()
            }
            // window.location.reload()
        })
        
    })
    //--------------进入企业绑定页面-----------------
    $('.bind-btn').on("click", function () {
        // console.log(111)
        window.location.href = "/student/corp-bind"
    })

})