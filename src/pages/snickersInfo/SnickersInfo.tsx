import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {NavLink, useParams } from 'react-router-dom';
import {getImg } from "src/providers/imgProvider"
import {getMerchPrice, getMerchInfo,getSizeTable } from "src/providers/merchProvider"
import PriceHolder from 'src/components/PriceHolder/PriceHolder';
import TableWithComboboxColumn from 'src/components/table/simpleTable/TableWithComboboxColumn';
import Button from 'src/components/Button';
import Scroller from 'src/components/scroller/Scroller';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch,useAppSelector } from 'src/store/hooks/redux'
import {shopAction } from '../../store/reducers/menuSlice'
import ImagePresantation from 'src/components/imagesPresantation/ImagesPresentation';
import Modal from 'src/components/modal/Modal';
import DoubleInfoDrop from 'src/components/doubleInfoDrop/DoubleInfoDrop';
import s from "./style.module.css"



const text = "Если вы нашли данную модель где-либо в наличии по более низкой цене — пришлите нам ссылку на данную модель в другом магазине. Мы будем рады предложить вам скидку, компенсирующую разницу в стоимости, и лучшую цену относительно конкурентов."+
+"Обратите внимание, что акция распространяется только на российские платформы."


type urlParamsType = {
    snickers: string;
  };

  type columnType = {
    table:string[],
    title:string,
    subtitle?:string
}
  
  type tableType = {
    table:[
        {   
            title:string,
            subtitle?:string,
            table: string[]|never[]
        }
    ]
        
    ,
    comboTable: [
        {
            title: string,
            subtitle?: string,
            table: string[] | never[]
        }
    ]
}
const SnickersInfo: React.FC = () => {
    const {shop} = {...useAppSelector(state =>state.menuReducer)}
    const navigate = useNavigate();
    let dispatch = useAppDispatch()
    let {snickers} = useParams<urlParamsType>();
    let [merchInfo,setMerchInfo] = useState<any>({imgs:[],name:"",info:{}})


    
    let size = Object.keys(merchInfo.info)[0]
    let currentSize = useRef<Set<string>>(new Set())
    if(size){
        currentSize.current.add(size);
    }
    console.debug(merchInfo)
    let [active,setActive] = useState(false)
    let [tableInfo,setTableInfo] = useState<tableType>({table:[{table:[],title:""}],comboTable:[{table:[],title:""}]})
    let tableSetted = useRef(false)
    useEffect(()=>{
        if(size){
            currentSize.current.add(size);
        }
    },[merchInfo])
    useEffect(()=>{
        if(snickers){
            getMerchInfo(snickers,(val)=>{setMerchInfo(val)})
        }
       
    },[])
    useEffect(()=>{
        if(!tableSetted.current){
             getSizeTable((val)=>{setTableInfo(val)})
        }
    },[active])
    return (
        <div>
              <div className={s.mainWrap}>
        
        <div style={{height:"100%",width:"70%"}}>
          <ImagePresantation images={merchInfo.imgs}/>
        </div>
        <div style={{height:"100%",width:"30%"}}>
         <Button text={"размеры"} onChange={()=>{
            
            setActive(true)
            }}/>
         <h1 className={s.merchName} >{merchInfo.name}</h1>   
         <PriceHolder onChange = {(size)=>{currentSize.current = size}} elems={merchInfo.info}/>
         <Button  text='Купить' className={s.buyMerch} onChange={()=>{
          navigate("/form")
         }}/>
         <Button  text='Добавить в корзину' className={s.buyMerch} onChange={()=>{
            let data:any = {}

            data[snickers+""] = Array.from(currentSize.current)
            dispatch(shopAction({...data,...shop}))
         }}/>
         <DoubleInfoDrop className={{main:s.doubleInfoDropFirst,second:s.doubleInfoDropSecond}} info={"ГАРАНТИЯ ЛУЧШЕЙ ЦЕНЫ"}>
            <div>
               {text}
            </div>
         </DoubleInfoDrop>
        </div>
        <Modal setActive={setActive} active={active}>
            <Scroller className={s.scrollStyle}>
                  <TableWithComboboxColumn className={s.modalTable} {...tableInfo}/>   
            </Scroller>
         </Modal>
    </div>
        </div>

    )
}


export default SnickersInfo