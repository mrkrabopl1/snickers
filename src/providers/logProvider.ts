import axios from "axios";
import sha256 from "crypto-js/sha256";
import Base64 from 'crypto-js/enc-base64';
const checkLogin = function (data: { login: string }, callback: (val: any) => void) {
    let hashLogin = Base64.stringify(sha256(data.login))
    let jsonData = JSON.stringify({ login: hashLogin})
    axios.post(`http://127.0.0.1:8000/checkLog`, jsonData, { headers: { "content-type": "application/json" } }).then((res) => {
        callback(res.data)
    }
    )

}

const checkMail = function (data: { mail: string }, callback: (val: any) => void) {
    let hashMail = Base64.stringify(sha256(data.mail))
    let jsonData = JSON.stringify({ mail: hashMail })
    axios.post(`http://127.0.0.1:8000/checkMail`, jsonData, { headers: { "content-type": "application/json" } }).then((res) => {
        console.log(res.status)
        callback(res.data)
    }
    )

}

const checkTel = function (data: {tel: string }, callback: (val: any) => void) {
    let hashTel = Base64.stringify(sha256(data.tel))
    let jsonData = JSON.stringify({ tel: hashTel })
    axios.post(`http://127.0.0.1:8000/CheckTel`, jsonData, { headers: { "content-type": "application/json" } }).then((res) => {
        console.log(res.status)
        callback(res.data)
    }
    )

}



export { checkLogin,checkMail,checkTel }