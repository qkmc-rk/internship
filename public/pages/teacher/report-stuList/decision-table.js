$(()=>{
    let students = {}
    $.ajax({
        type:"GET",
        url:`${config.ip}:${config.port}/teacher/students`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            students = data.data
            if(!students){
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return 
            }
            let template = ``
            for(let item of students){
                let std = `<tr class="stuList-row">
                <td>
                    ${item.stuNo}
                </td>
                <td>
                    ${item.name}
                </td>
                <td>
                    ${item.college}
                </td>
                <td>
                    ${item.major}
                </td>
                <td>
                    <div class="line-row">
                        Q Q: ${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        TEL: ${item.phone?item.phone:"暂无"}
                    </div>
                </td>

                <td class=${item.identifyFlag?"checked":"unchecked"}>
                    
                <span class="iconfont ${item.identifyFlag?"icon-dui3":"icon-cuo2"}"></span>${item.identifyFlag?"已完全评价":"未完全评价"}
            </td>

                <td class=${item.identifyFlag===2?"checked":item.identifyFlag===0?"unchecked":"checking"}>
                    
                <span class="iconfont ${item.identifyFlag===0?"icon-cuo2":item.identifyFlag===1?"icon-cuo2":"icon-dui3"}"></span>${item.identifyFlag===0?"还未评价!":item.identifyFlag===1?"未评价完":"已评价"}
            </td>
                <td class="align-center">
                    <button class="check check-decision" data-id="${item.stuNo}">评价</button>
                </td>
            </tr>`
            template+=std
            }
            $('tbody').html(template)
        },
        error(err){
            alert("服务器繁忙,请重试")
        }
    })
    
    $('.search-input').on("input",function(){
        let searching_stu = []
        // console.log(students)
        let value = $('.search-input').get(0).value
        // console.log(value)
        // var str = "123";
        // var reg = RegExp(/value/);
        // console.log(reg.test(str)); // true
        // console.log(value)
        if(!value){
            //渲染原来页面
            $('.showtoast').remove()
            if(!students){
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return 
            }
            let template = ``
            for(let item of students){
                let std = `<tr class="stuList-row">
                <td>
                    ${item.stuNo}
                </td>
                <td>
                    ${item.name}
                </td>
                <td>
                    ${item.college}
                </td>
                <td>
                    ${item.major}
                </td>
                <td>
                    <div class="line-row">
                        Q Q: ${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        TEL: ${item.phone?item.phone:"暂无"}
                    </div>
                </td>
                <td class=${item.identifyFlag?"checked":"unchecked"}>
                    
                <span class="iconfont ${item.identifyFlag?"icon-dui3":"icon-cuo2"}"></span>${item.identifyFlag?"已完全评价":"未完全评价"}
            </td>

            </td>

                <td class=${item.identifyFlag===2?"checked":item.identifyFlag===0?"unchecked":"checking"}>
                    
                <span class="iconfont ${item.identifyFlag===0?"icon-cuo2":item.identifyFlag===1?"icon-cuo2":"icon-dui3"}"></span>${item.identifyFlag===0?"还未评价!":item.identifyFlag===1?"未评价完":"已评价"}
            </td>
                <td class="align-center">
                    <button class="check check-decision" data-id="${item.stuNo}">评价</button>
                </td>
            </tr>`
            template+=std
            }
            $('tbody').html(template)
            
        }else{
            for(let i = 0;i<students.length;i++){
                //添加搜索条件:
                if(students[i]['stuNo'].search(value)!==-1){
                    searching_stu.push(students[i])
                    continue
                }
                if(students[i]['name'].search(value)!==-1){
                    searching_stu.push(students[i])
                    continue
                }
                if(students[i]['major'].search(value)!==-1){
                    searching_stu.push(students[i])
                    continue
                }
                if(students[i]['college'].search(value)!==-1){
                    searching_stu.push(students[i])
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
            let template = ``
            for(let item of searching_stu){
                let std = `<tr class="stuList-row">
                <td>
                    ${item.stuNo}
                </td>
                <td>
                    ${item.name}
                </td>
                <td>
                    ${item.college}
                </td>
                <td>
                    ${item.major}
                </td>
                <td>
                    <div class="line-row">
                        Q Q: ${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        TEL: ${item.phone?item.phone:"暂无"}
                    </div>
                </td>
                <td class=${item.identifyFlag?"checked":"unchecked"}>
                    
                <span class="iconfont ${item.identifyFlag?"icon-dui3":"icon-cuo2"}"></span>${item.identifyFlag?"已完全评价":"未完全评价"}
            </td>
            </td>

                <td class=${item.identifyFlag===2?"checked":item.identifyFlag===0?"unchecked":"checking"}>
                    
                <span class="iconfont ${item.identifyFlag===0?"icon-cuo2":item.identifyFlag===1?"icon-cuo2":"icon-dui3"}"></span>${item.identifyFlag===0?"还未评价!":item.identifyFlag===1?"未评价完":"已评价"}
            </td>
                <td class="align-center">
                    <button class="check check-decision" data-id="${item.stuNo}">评价</button>
                </td>
            </tr>`
            template+=std
            }
            $('tbody').html(template)
        }
        
        // console.log(searching_stu)
    })


    $('.uncheck-btn').on("click",function(){
        alert("学生还未填写,无法评价!")
        return
    })

})