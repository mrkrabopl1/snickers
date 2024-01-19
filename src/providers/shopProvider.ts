import axios from "axios";



const getCartData = function (cartData:{[key:string]:number}, callback: (val: any) => void) {
    const data = new FormData();
    let json = JSON.stringify(cartData)
    console.debug(json)
    axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/getCartData',
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



export { getCartData }