import React, { ReactElement, useEffect, useRef, useState } from 'react'
import PricesBlock from './PricesBlock'
import s from "./style.module.css"
import {useAppSelector} from 'src/store/hooks/redux'
import merchType from 'src/types/merchType'


type MerchType = {
    [key: string]: merchType,
}

type PriceHolderType = {
    elems: MerchType|null,
    onChange:(args:any)=>void
}

const PriceHolder: React.FC<PriceHolderType> = (props) => {
    
    let { elems,onChange } = { ...props }
    let priceState = useAppSelector(state => state.priceReducer)

    function setPriceBlocks() {
        if(elems){
            let arrOfElems = Object.entries(elems)
            let arr = arrOfElems.map((val, id) => {
                return <PricesBlock 
                    onChange={onChange}
                    active={priceState.chosen === id}
                    size={val[0]}
                    price={val[1].price}
                    availability={val[1].availability}
                    discount={val[1].discount}
                    id={id}
                    />
            })
    
            return arr
        }
        return []
    }


    return (
        <div className={s.priceHolder}>
            {setPriceBlocks()}
        </div>
    )

}



export default PriceHolder