import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { userSlice } from 'src/store/reducers/userSlice'
import { useAppSelector,useAppDispatch } from 'src/store/hooks/redux'
import { NavLink} from 'react-router-dom'
import LineSwitcher from 'src/components/switcher/LineSwitcher'
import s from "./style.module.css"
import loupe from "../../../public/vagabond.png";
import {ReactComponent as Cart} from "/public/cart.svg";
import global from "src/global.css"
const BuyButton: React.FC<any> = (props) => {

    const {shop} = useAppSelector(state =>state.menuReducer)
    let length = Object.keys(shop).length
    return(
        <div style={{display:"flex"}}>
            <NavLink to="/buy" className={global.link} >
                <div>
                     <Cart/>
                     <div className={s.shopCounter} style={length?{position:"absolute"}:{display:"none"}}>
                       <span className={s.spanShop}>{length}</span>
                     </div>
                </div>
                    
            </NavLink><br/>
        </div>
    )
}


export default BuyButton