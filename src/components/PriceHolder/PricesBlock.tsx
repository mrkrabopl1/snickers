import React, { ReactElement, useRef, useState } from 'react'
import s from "./style.module.css"
import doneSvg from "../../../public/done.svg"
import { priceSlice } from '../../store/reducers/priceSlice'
import { useAppDispatch } from 'src/store/hooks/redux'

type merchType = {onChange:(arg:any)=>void,active:boolean,size:string,price:number,availability:boolean,discount?:number,id:number}




const PricesBlock: React.FC<merchType> = (props) => {
    let {price,size,active,availability,id,onChange} = {...props}
    let dispatch = useAppDispatch()
    let { setChosen } = { ...priceSlice.actions }
    return (
        <div onClick={()=>{
                onChange(size)
                dispatch(setChosen(id))
            }} className={s.priceBlock} >
            <div className={s.sizeHolder}>{"US "+size}</div>
            <div className={s.avelibleHolder}><div>{price}</div>{availability?<img className={s.done} src={doneSvg} alt="" />:null}</div> 
            {active?<div className={s.priceUnderline}></div>:null}
        </div>
            
    )
}

export default PricesBlock