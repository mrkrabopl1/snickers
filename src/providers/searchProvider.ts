import axios from "axios";



const searchImport = function (searchName:string,callback:(val:any)=>void){
    const formData = new FormData()
    let data = JSON.stringify({val:searchName})
    axios.post(`http://127.0.0.1:8000/searchData`,data ,{headers:{"content-type":"multipart/form-data"}}).then((res:any)=>{
        callback(res.data) 
    }
)}

const searchNames = function (searchName:string,max:number,callback:(val:any)=>void){

    axios({
        method: 'post',
        url: 'http://127.0.0.1:8100/searchMerch',
        headers: {
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            name:searchName,
            max:max
        })
    }
    ).then((res:any)=>{
       callback(res.data)
    },(error)=>{
        console.warn(error)
    })
}
const searchSnickersByString = function (searchName:string,callback:(val:any)=>void, page:number,size:number, filters:any){

    axios({
        method: 'post',
        url: 'http://127.0.0.1:8100/searchSnickersByString',
        headers: {
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            name:searchName,
            page:page,
            size:size,
            filters:filters
        })
    }
    ).then((res:any)=>{
        console.debug(res.data)
       callback(res.data)
    },(error)=>{
        console.warn(error)
    })
}

const test = function (){

    axios({
        method: 'post',
        url: 'http://127.0.0.1:8100/test',
        headers: {
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            sizes:[10,11],
        })
    }
    ).then((res:any)=>{
        console.debug(res.data)
    },(error)=>{
        console.warn(error)
    })
}

type dataType = {price:number[],sizes:number[]}


const getMerchOnPage= function (filters:{[key:string]:any},callback:(data:any)=>void){
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

export {searchImport,searchNames,getFilters,getMerchOnPage,getFullMerchInfoByFilters,searchSnickersByString, test}