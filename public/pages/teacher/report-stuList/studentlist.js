$(()=>{
    let stdList = {}
    $.ajax({
        type:"GET",
        url:`${config.ip}:${config.port}/teacher/students`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            stdList = data.data
            
            if(!stdList){
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return 
            }
            // console.log(data)
            let listDom = ``

            for(let item of stdList){
                // console.log(item)
                let template = `<tr class="stuList-row">
                <td class="align-center">${item.stuNo}</td>
                <td class="align-center">${item.name}</td>
                <td class="align-center">${item.sex}</td>
                <td class="align-center">${item.age}</td>
                <td class="align-center">${item.college}</td>
                <td>${item.major}</td>
                <td>
                    <div class="line-row">
                        企业:${item.corpName?item.corpName:"暂无"}
                    </div>
                    <div class="line-row">
                        岗位:${item.corpPosition?item.corpPosition:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        电话:${item.phone?item.phone:"暂无"}
                    </div>
                    <div class="line-row">
                        微信:${item.wechat?item.wechat:"暂无"}
                    </div>
                </td>
                <td>
                    <button class="check check-report" data-id="${item.stuNo}">查看</button>
                </td>
                <td class="check-td">
                    <button class="check check-decision" data-id="${item.stuNo}">查看</button>
                </td>
            </tr>`
                listDom+=template
            }
            $('tbody').html(listDom)
        }
    })
//------------------按钮响应---------------------------
    
        $('body').delegate(".check-report","click",(e)=>{
            let that = e.currentTarget
            let stuNo = that.dataset.id
            $.ajax({
                type:"GET",
                url:`${config.ip}:${config.port}/teacher/student/report/${stuNo}`,
                dataType:"json",
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
                },
                success(data){
                    if(data.status===1){
                        saveLocalStorage("std-report-entity",data.data)
                        window.location.href = "/teacher-report"
                    }else{
                        alert("请求失败")
                    }
                   
                }
            })
        })
        $('body').delegate(".check-decision","click",(e)=>{
            // console.log(222)
            let that = e.currentTarget
            let stuNo = that.dataset.id
            $.ajax({
                type:"GET",
                url:`${config.ip}:${config.port}/teacher/student/identify/${stuNo}`,
                dataType:"json",
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
                },
                success(data){
                //    console.log(data)
                   if(data.status===1){
                        saveLocalStorage("std-decision-entity",data.data)
                        window.location.href = "/teacher-decision"
                   }else{
                       alert("请求失败")
                   }
                }
            })
        })
        // $('.check-report').click(function () {
        //     //！！需精确跳转到每个人的页面
            
        //     window.location.href = '/teacher-report'
        // })
        // $('.check-decision').click(function () {
        //     window.location.href = '/teacher-decision'
        // })

        $('.search-input').on("input",function(){
            let searching_stu = []
            let value = $('.search-input').get(0).value
            if(!value){
                //渲染原来页面
                $('.showtoast').remove()
                if(!stdList){
                    $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                    return 
                }
                let listDom = ``
                for(let item of stdList){
                    let template = `<tr class="stuList-row">
                <td class="align-center">${item.stuNo}</td>
                <td class="align-center">${item.name}</td>
                <td class="align-center">${item.sex}</td>
                <td class="align-center">${item.age}</td>
                <td class="align-center">${item.college}</td>
                <td>${item.major}</td>
                <td>
                    <div class="line-row">
                        企业:${item.corpName?item.corpName:"暂无"}
                    </div>
                    <div class="line-row">
                        岗位:${item.corpPosition?item.corpPosition:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        电话:${item.phone?item.phone:"暂无"}
                    </div>
                    <div class="line-row">
                        微信:${item.wechat?item.wechat:"暂无"}
                    </div>
                </td>
                <td>
                    <button class="check check-report" data-id="${item.stuNo}">查看</button>
                </td>
                <td class="check-td">
                    <button class="check check-decision" data-id="${item.stuNo}">查看</button>
                </td>
            </tr>`
                listDom+=template
                }
                $('tbody').html(listDom)
                
            }else{
                for(let i = 0;i<stdList.length;i++){
                    //添加搜索条件:
                    if(stdList[i]['stuNo'].search(value)!==-1){
                        searching_stu.push(stdList[i])
                        continue
                    }
                    if(stdList[i]['name'].search(value)!==-1){
                        searching_stu.push(stdList[i])
                        continue
                    }
                    if(stdList[i]['major'].search(value)!==-1){
                        searching_stu.push(stdList[i])
                        continue
                    }
                    if(stdList[i]['college'].search(value)!==-1){
                        searching_stu.push(stdList[i])
                        continue
                    }
                    
    
                }
    
                //渲染页面
                if(searching_stu.length===0){
                    $('tbody').html("")
                    $('.showtoast').remove()
                    $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                    return 
                }
                $('.showtoast').remove()
                let listDom = ``
                for(let item of searching_stu){
                    let template = `<tr class="stuList-row">
                    <td class="align-center">${item.stuNo}</td>
                    <td class="align-center">${item.name}</td>
                    <td class="align-center">${item.sex}</td>
                    <td class="align-center">${item.age}</td>
                    <td class="align-center">${item.college}</td>
                    <td>${item.major}</td>
                    <td>
                        <div class="line-row">
                            企业:${item.corpName?item.corpName:"暂无"}
                        </div>
                        <div class="line-row">
                            岗位:${item.corpPosition?item.corpPosition:"暂无"}
                        </div>
                    </td>
                    <td class="align-center">
                    ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                    </td>
                    <td>
                        <div class="line-row">
                            Q Q:${item.qq?item.qq:"暂无"}
                        </div>
                        <div class="line-row">
                            电话:${item.phone?item.phone:"暂无"}
                        </div>
                        <div class="line-row">
                            微信:${item.wechat?item.wechat:"暂无"}
                        </div>
                    </td>
                    <td>
                        <button class="check check-report" data-id="${item.stuNo}">查看</button>
                    </td>
                    <td class="check-td">
                        <button class="check check-decision" data-id="${item.stuNo}">查看</button>
                    </td>
                </tr>`
                    listDom+=template
                }
                $('tbody').html(listDom)
            }
            
            // console.log(searching_stu)
        })



    })
