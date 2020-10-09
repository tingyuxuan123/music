const cookie={}

Object.defineProperty(cookie,"value",{
    get(){
        return localStorage.getItem("cookie")
    },
    set(v){
        return localStorage.setItem("cookie",v)
    }

})

export default cookie