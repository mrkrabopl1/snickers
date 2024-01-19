import axios from "axios";

const getMerchPrice = function (name: string, callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/price'+"?"+"name="+name,
        headers: {}
    }
    ).then((res:any)=>{
        console.log(res.data,"klklj")
        callback(res.data)
    })
}

const getMerchInfo = function (name: string, callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/merchInfo'+"?"+"name="+name,
        headers: {}
    }
    ).then((res:any)=>{
        callback(res.data)
    })
}

const getBrends = function (callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/brends',
        headers: {}
    }
    ).then((res:any)=>{
        callback(res.data)
    })
}



const getCollections = function (name:string,callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/collections'+"?"+"name="+name,
        headers: {}
    }
    ).then((res:any)=>{
        callback(res.data)
    })
}

const getMainInfo = function (callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/mainInfo',
        headers: {}
    }
    ).then((res:any)=>{
        callback(res.data)
    })
}

const getSizeTable = function (callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/sizeTable',
        headers: {}
    }
    ).then((res:any)=>{
        callback(res.data)
    })
}
export {getMerchPrice,getMerchInfo,getSizeTable, getBrends, getMainInfo, getCollections}