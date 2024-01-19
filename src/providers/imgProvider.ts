import axios from "axios";



const arrImgImport = function (files: File[], callback: (val: any) => void) {
    const data = new FormData();
    console.log(files.length,"ds")
    files.forEach((pic) => {
        console.log(pic)
            data.append('pictures', pic,  window.btoa(pic.webkitRelativePath));
          });
    console.log(data)

    axios({
        method: 'post',
        url: `http://127.0.0.1:5000/images`,
        headers: {"content-type":"multipart/form-data"},
        data: data
    }).then((res: any) => {
        console.log(res)
        callback(res.data)
    }
    )
}
const imgImport = function (file: any, callback: (val: any) => void) {
    const formData = new FormData()
    formData.append("file",file)

    axios({
        method: 'post',
        url: `http://127.0.0.1:5000/images`,
        headers: {"content-type":"multipart/form-data"},
        data: formData
    }).then((res: any) => {
        //callback(res.data)
    }
    )
}

const getImg = function (id: string, callback: (val: any) => void) {
    console.log(id)

    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/image'+"?"+"id="+id,
        headers: {}
    }
    ).then((res:any)=>{
        callback(res.data)
    })
}

const getImgs = function (name: string, callback: (val: any) => void) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/images'+"?"+"name="+name,
        headers: {}
    }
    ).then((res:any)=>{
        console.log(res.data,"klklj")
        callback(res.data)
    })
}

const getNames = function (name: string, callback: (val: any) => void) {

    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/names'+"?"+"name="+name,
        headers: {}
    }
    ).then((res:any)=>{
        console.log(res)
    })
}






export { arrImgImport,imgImport, getImgs,getImg }