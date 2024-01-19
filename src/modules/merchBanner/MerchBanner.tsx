import React, { useEffect, ReactElement, useState, useRef } from 'react'

import ComplexDrop from "src/components/complexDrop/complexDrop"
import { imgImport, getImgs, getImg, } from "src/providers/imgProvider"
import { getMainInfo } from "src/providers/merchProvider"
import { useAppSelector } from 'src/store/hooks/redux'
import s from "./style.module.css"
import Button from 'src/components/Button'
import { useNavigate } from 'react-router-dom';


interface   merchBannerInterface  {
    img:string,
    title:string,
    className?:{
        button:string,
        title:string
    },
    id:string,
    onChange:(arg:string)=>void
}

const MerchBanner: React.FC< merchBannerInterface> = (props) => {

    let {id,img,title,onChange} = {...props}


    const onChangeButton = ()=>{
        onChange(id)
    }


  
    return (

        <div className={s.wrapper} style = {{display:"flex",backgroundImage:"url('"+img+"')"}}>
            <div style={{display:"flex", margin:"auto"}}>
                <p className={s.title}>{title}</p>
                <Button className={s.buton} onChange={onChangeButton} text={"К колекции"}></Button>
            </div>
        </div>
   
  
    )
  }
  
  export default MerchBanner