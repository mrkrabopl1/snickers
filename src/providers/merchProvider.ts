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

const getMerchInfo = function (id: string, callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8100/snickersInfo'+"?"+"id="+id,
        headers: {}
    }
    ).then((res:any)=>{
        console.log(res.data)
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



const getCollections = function (collection:any,callback: (val: any) => void) {
    let json = JSON.stringify(collection)
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8100/collection',
        headers: {
            'Content-Type': 'application/json'
        },
        data:json
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
        url: 'http://127.0.0.1:8100/sizeTable',
        headers: {}
    }
    ).then((res:any)=>{
        callback(res.data)
    })
}
export {getMerchPrice,getMerchInfo,getSizeTable, getBrends, getMainInfo, getCollections}