import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { userSlice } from 'src/store/reducers/userSlice'
import { useAppSelector,useAppDispatch } from 'src/store/hooks/redux'
import { NavLink} from 'react-router-dom'
import LineSwitcher from 'src/components/switcher/LineSwitcher'
import s from "./style.module.css"
import loupe from "../../../public/vagabond.png";
import BuyButton from "./BuyButton";

import global from "src/global.css"
type propsRowType = {
    data:any,
    callback:(...args:any)=>void|null
}


let imgWrapStyle:any = {
    width:"100px",
    height:"100px",
    borderRadius:"50%",
   // backgroundColor:"red",

    display:"flex"

}


let imgStyle:any = {
    width:"100%",
    height:"100%",
    objectFit: "contain",
    display:" block",
    margin: "0 auto"

}

let logoWrapStyle:any={
    left:"5%",
    position:"absolute",
    display:"flex"
}

let textLogo :any={
    margin:"auto",
    fontSize:"38px"
}

const Menu: React.FC<any> = (props) => {
    const {isLog} = useAppSelector(state =>state.userReducer)
    const {show,sticky} = useAppSelector(state =>state.menuReducer)
    const menuWrap = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        
    })
    let className = s.menuWrap


    
    if(show){
        className = className + " "+s.is_visible
    }else{
        className = className +" "+ s.is_hidden
    }

    let pos = sticky?"sticky":"relative"
    let time = "transform 0.3s ease-out"
    let menuStyle:any = {
        display:"flex",
        justifyContent:"right",
        height:"100px",
        position:pos,
        transition:time
        
    
    }
    console.debug(className)
    console.debug(s.menuWrap)
    return(
        <div ref = {menuWrap}  className={className} style={menuStyle}>
                <div  style ={logoWrapStyle}>
                <div style ={imgWrapStyle}>
                 <img style ={imgStyle} src={loupe} alt="samura_snikers" />
             </div> 
             <div style={textLogo}>SAMURA</div>
                </div>


            <div style={{margin:"auto 20px",display:"flex",position:"relative"}}>
                <NavLink to="/home" className={global.link} >Home</NavLink>
                <NavLink to="/services" className={global.link} >Услуги</NavLink>
              
                <BuyButton/>
     
            </div>

        </div>
    )
}


export default Menu