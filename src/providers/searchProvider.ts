import axios from "axios";
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

const getSnickersByString = function (searchName:string,callback:(val:any)=>void, page:number,size:number, filters:any, orderType:number){

    axios({
        method: 'post',
        url: 'http://127.0.0.1:8100/getSnickersByString',
        headers: {
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            name:searchName,
            page:page,
            size:size,
            filters:filters,
            orderType:orderType
        })
    }
    ).then((res:any)=>{
        console.debug(res.data)
       callback(res.data)
    },(error)=>{
        console.warn(error)
    })
}
const getSnickersAndFiltersByString = function (searchName:string,callback:(val:any)=>void, page:number,size:number, filters:any, orderType:number){

    axios({
        method: 'post',
        url: 'http://127.0.0.1:8100/getSnickersAndFiltersByString',
        headers: {
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            name:searchName,
            page:page,
            size:size,
            filters:filters,
            orderType:orderType
        })
    }
    ).then((res:any)=>{
        console.debug(res.data)
       callback(res.data)
    },(error)=>{
        console.warn(error)
    })
}

export {searchNames,getSnickersAndFiltersByString, getSnickersByString}