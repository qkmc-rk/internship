$(()=>{
    let id = null
    const app = new Vue({
        el:"#app",
        data:{
            form:{
                corpName:"",//
                address:"",//
                approvalDate:"",//
                businessScope:"",//
                createDate:"",//
                creditCode:"",//
                endBusiness:"",//
                legalPerson:"",//
                regAuthority:"",//
                regCode:"",//
                regStatus:"",//
                registerCapita:"",//
                startBusiness:"",//
                type:""//
            },
        },
        methods:{
            submit(){
                // console.log(111)
                
                let option = this.form
                
                if(!this.form.corpName){
                    alert("请输入企业名称!")
                    return
                }
                if(!this.form.regCode){
                    alert("请输入企业注册号")
                    return
                }
                if(!this.form.legalPerson){
                    alert("请输入法人项")
                    return
                }
                if(id){
                    // console.log(id)
                    option.id = id
                }
                console.log(option)
                ajaxByPost('/student/student/corp',option,function(){
                    alert("提交成功!")
                    // window.location.href = "/student"
                    window.location.reload()
                })
            },
            btnreturn(){
                window.location.href="/student"
            }
        }
    })
    window.app = app
    ajaxByGet('/student/student/corp',function(data){
        if(!data.data.isCorpChecked){
            alert("该企业未核准!")
        }
        id = data.data.id
        // console.log(data)
        let info = data.data
        app.form.corpName = info.corpName
        app.form.address = info.address
        app.form.approvalDate = info.approvalDate
        app.form.businessScope = info.businessScope
        app.form.createDate = info.createDate
        app.form.creditCode = info.creditCode
        app.form.endBusiness = info.endBusiness
        app.form.legalPerson = info.legalPerson
        app.form.regAuthority = info.regAuthority
        app.form.regCode = info.regCode
        app.form.regStatus = info.regStatus
        app.form.registerCapita = info.registerCapita
        app.form.startBusiness = info.startBusiness
        app.form.type = info.type


    })
})