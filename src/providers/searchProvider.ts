import axios from "axios";



const searchImport = function (searchName:string,callback:(val:any)=>void){
    const formData = new FormData()
    let data = JSON.stringify({val:searchName})
    axios.post(`http://127.0.0.1:8000/searchData`,data ,{headers:{"content-type":"multipart/form-data"}}).then((res:any)=>{
        callback(res.data) 
    }
)}

const searchNames = function (searchName:string,callback:(val:any)=>void){

    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/searchMerch'+"?"+"name="+searchName,
        headers: {}
    }
    ).then((res:any)=>{
       callback(res.data)
    },(error)=>{
        console.warn(error)
    })
}
type dataType = {price:number[],sizes:number[]}


const getFullMerchInfo= function (filters:{[key:string]:any},callback:(data:any)=>void){
    let json = JSON.stringify(filters)
    console.debug(json)
    axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/searchMerchWithName',
        headers: {
            'Content-Type': 'application/json'
        },
        data:json
    }
    ).then((res:any)=>{
        console.log(res.data)
        callback(res.data)
    },(error)=>{
        console.warn(error)
    })
} 

const getFullMerchInfoByFilters= function (filters:{[key:string]:any},callback:(data:any)=>void){

    let json = JSON.stringify(filters)

    axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/searchMerchWithFilters',
        headers: {
            'Content-Type': 'application/json'
        },
        data:json
    }
    ).then((res:any)=>{
        callback(res.data)
    },(error)=>{
        console.warn(error)
    })
} 

const getFilters = function (callback:(data:dataType)=>void){

    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/filters',
        headers: {}
    }
    ).then((res:any)=>{
        console.log(res.data)
        callback(res.data)
    },(error)=>{
        console.warn(error)
    })
}

export {searchImport,searchNames,getFilters,getFullMerchInfo,getFullMerchInfoByFilters}