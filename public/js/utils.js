;(function(){
    function redirectTo(ele,url){
        ele.onclick = ()=>{
            window.location.href = url
        }
        
    };
    function requireByGet(url,resolve,reject){
        fetch(url,{
            method:'GET'
        }).then((res)=>{
            res.json(()=>{

            }).then(()=>{
                resolve(res)
            }).catch(()=>{
                reject(err)
            })
        }).catch(()=>{
            console.log("路由输入错误")
        })
    }
    function requireByPost(){

    }
    function saveLocalStorage(str,obj){
        if(typeof obj === "object"){
            obj = JSON.stringify(obj)
        }
        localStorage.setItem(str,obj)
    }
    function getLocalStorage(str){
        objstr = localStorage.getItem(str)
        try {
            return objstr = JSON.parse(objstr)
        } catch (error) {
            return localStorage.getItem(str)
        }
            
            
    }
    function bindValue(options,ele){
        
        if(ele){
            // console.log(ele.id)
            if(!ele.value){
                options[ele.id] = ""
                return
            }
            options[ele.id] =ele.value
        }
        return ;
    }
    function bindTime(options,time,value){
        if(time.value){
            options[time.id] = value.value
        }
    }
    function ajaxByGet(req,callback){
        $.ajax({
        type:"get",
        url:`${config.ip}:${config.port}${req}`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success:callback,
        error:function(err){
            alert("服务器繁忙,请稍后重试!")
        }
        })
    }
    function ajaxByPost(req,data,callback){
        $.ajax({
            type:"POST",
            url:`${config.ip}:${config.port}${req}`,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            data:data,
            success:callback,
            error(){
                alert("服务器错误,请重试")
            }
        })
    }
    //--------------------------------

    window.ajaxByPost = ajaxByPost
    window.ajaxByGet = ajaxByGet
    window.bindTime = bindTime
    window.bindValue = bindValue
    window.redirectTo = redirectTo
    window.requireByGet = requireByGet
    window.requireByPost = requireByPost
    window.saveLocalStorage = saveLocalStorage
    window.getLocalStorage = getLocalStorage

})()