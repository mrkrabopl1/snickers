import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Form from "src/modules/sendForm/SendForm"
import MerchVerticalBuyBlock from "src/modules/merchField/MerchVerticalBuyBlock"
import { getCartData } from 'src/providers/shopProvider'
import s from "./style.module.css"
import { useAppDispatch, useAppSelector } from 'src/store/hooks/redux'
import BuyMerchField from 'src/modules/buyMerchField/BuyMerchField'


interface merchInterface { name: string, imgs: string, id: string, firm: string, price: string }

const FormPage: React.FC = () => {
    let [recalc,setRecalc] = useState<boolean>(true);
    let merchData = useRef<merchInterface[]>([]);
    let {shop} = {...useAppSelector(state=>state.menuReducer)}
    const setMerchBuyBlock = (data:merchInterface[])=>{
        merchData.current = data
        setRecalc(recalc=>!recalc)
    }
    useEffect(()=>{
        getCartData(shop,setMerchBuyBlock)
    },[])
    return (
        <div style={{display:"flex"}}>
          <Form className={{input:s.formInput,combobox:s.combobox}}/>
        <BuyMerchField/>
        </div>

    )
}


export default FormPage