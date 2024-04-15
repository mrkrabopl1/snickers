import axios from "axios";
const createPreorder = function (data: { id: number, info: { size: string } }, callback: (val: any) => void) {
    let jsonData = JSON.stringify(data)
    axios.post(`http://127.0.0.1:8100/createPreorder`, jsonData, { headers: { "content-type": "application/json" } }).then((res) => {
        callback(res.data)
    }
    )

}

const updatePreorder = function (data: { id: number, hashUrl: string, info: { size: string } }, callback: (val: any) => void) {
    let jsonData = JSON.stringify(data)
    axios.post(`http://127.0.0.1:8100/updatePreorder`, jsonData, { headers: { "content-type": "application/json" } }).then((res) => {
        callback(res.data)
    }
    )

}

interface clientDataType {
    personalData:{
        name:string,
        phone:string,
        mail:string,
        secondName?:string
    },
    address:{
        postIndex:number,
        address:string
    },
    delivery:{
        deliveryPrice?:number,
        type:number
    },
    preorderId:string
} 

const createOrder = function (data: clientDataType, callback: (val: any) => void) {
    let jsonData = JSON.stringify(data)
    axios.post(`http://127.0.0.1:8100/createOrder`, jsonData, { headers: { "content-type": "application/json" } }).then((res) => {
        callback(res.data)
    }
    )

}



export { createPreorder, updatePreorder, createOrder }