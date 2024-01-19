import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Form from "src/modules/sendForm/SendForm"
import MerchVerticalBuyBlock from "src/modules/merchField/MerchVerticalBuyBlock"
import { getCartData } from 'src/providers/shopProvider'
import s from "./style.module.css"
import { useAppDispatch, useAppSelector } from 'src/store/hooks/redux'
import Input from 'src/components/Input'
import Button from 'src/components/Button'


interface merchInterface { name: string, imgs: string, id: string, firm: string, price: string }

const BuyMerchField: React.FC = () => {
    let [recalc, setRecalc] = useState<boolean>(true);
    let merchData = useRef<merchInterface[]>([]);
    let promoCode = useRef<string>("")
    let { shop } = { ...useAppSelector(state => state.menuReducer) }
    const setMerchBuyBlock = (data: merchInterface[]) => {
        merchData.current = data
        setRecalc(recalc => !recalc)
    }
    useEffect(() => {
        getCartData(shop, setMerchBuyBlock)
    }, [])
    return (
        <div style={{ width:"100%"}}>

            {
                merchData.current.map((data) => {
                    return <MerchVerticalBuyBlock data={data} onChange={() => { }} />
                })
            }

            <div style={{display:"flex"}}>
                <Input placeholder='Промокод' onChange={(val)=>{promoCode.current = val}}/> <Button text='Применить' onChange={()=>{}}/>
            </div>
        </div>

    )
}


export default BuyMerchField