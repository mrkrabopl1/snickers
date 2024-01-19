import React, { useEffect, ReactElement, useState, useRef } from 'react'
import { getCartData } from 'src/providers/shopProvider'
import {shopAction} from 'src/store/reducers/menuSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks/redux'
import MerchBuyBlock from 'src/modules/merchField/MerchBuyBlock'
import DynamicTable from 'src/components/table/simpleTable/DynamicTable'
import Button from 'src/components/Button'
import s from  "./style.module.css"



const BuyPage: React.FC<any> = () => {
    let [recalc,setRecalc] = useState<boolean>(true);
    let table = useRef<any>([]);
    console.debug(screenLeft)
    const dispatch = useAppDispatch();
    let {shop} = {...useAppSelector(state=>state.menuReducer)}

    let refCopyShop = useRef<any>({...shop}) 


    // let arrData:propsRowType[]=[
    //     {componentName:"modules/merchBuyBlock", propsData:{data:dataRef.current.sizes.map(val=>{
    //        return {enable:true,activeData:false,name:val}
    //         }
    //     )}},
    //     {componentName:"modules/sliderValueSetter/ZoneSliderValueSetter",propsData:{min:dataRef.current.price[0],max:dataRef.current.price[1]}}

    // ]

    const updateList = (ind:number,id:string)=>{
        let keys = Object.keys( refCopyShop.current)
        let realIndex = keys.indexOf(id)
        delete refCopyShop.current[id]
        dispatch(shopAction(refCopyShop.current))
        table.current.forEach((el:any)=>{
            el.table.splice(realIndex,1)
        })
        setRecalc(recalc=>!recalc)
    }
  
    const setMerchBuyBlock = (data:any)=>{

        let priceArr:any[] = []
        let componentArr:any[] = []
        let amountArr:any[] = []
        let deleteBtnArr:any[] = []
        data.forEach((el:any,id:number)=>{
            let totalPrice = 0
            el.price.forEach((data:number) => totalPrice+=data)
            priceArr.push(String(totalPrice))
            componentArr.push({componentName:"modules/merchField/MerchBuyBlock", propsData:{data:{id:el.id,firm:el.firm,price:el.price,name:el.name,imgs:el.imgs}}})
            deleteBtnArr.push({componentName:"components/Button", propsData:{className:s.deleteBtn, onChange : updateList.bind(null,id,el.id)}})
            amountArr.push("1")
            
        })

        let totalPrice = 

        table.current = [{title:"Товар",table:componentArr},{title:"Koличество",table:amountArr},{title:"Цена",table:priceArr},{title:"",table:deleteBtnArr}]
        setRecalc(recalc=>!recalc)
    }
    useEffect(()=>{
        getCartData(shop,setMerchBuyBlock)
    },[])

    return (

     

        <div  >
            <DynamicTable table={table.current}/>
        </div>


    )
}

export default BuyPage