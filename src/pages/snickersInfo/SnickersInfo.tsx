import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getImg } from "src/providers/imgProvider"
import { getMerchPrice, getMerchInfo, getSizeTable } from "src/providers/merchProvider"
import PriceHolder from 'src/components/PriceHolder/PriceHolder';
import TableWithComboboxColumn from 'src/components/table/simpleTable/TableWithComboboxColumn';
import Button from 'src/components/Button';
import Scroller from 'src/components/scroller/Scroller';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/redux'

import { cartCountAction } from '../../store/reducers/menuSlice'
import { setSnickers } from '../../store/reducers/formSlice'
import ImagePresantation from 'src/components/imagesPresantation/ImagesPresentation';
import Modal from 'src/components/modal/Modal';
import DoubleInfoDrop from 'src/components/doubleInfoDrop/DoubleInfoDrop';
import { createPreorder, updatePreorder } from 'src/providers/orderProvider';
import s from "./style.module.css"
import { setCookie, getCookie } from 'src/global';



const text = "Если вы нашли данную модель где-либо в наличии по более низкой цене — пришлите нам ссылку на данную модель в другом магазине. Мы будем рады предложить вам скидку, компенсирующую разницу в стоимости, и лучшую цену относительно конкурентов." +
    +"Обратите внимание, что акция распространяется только на российские платформы."


type urlParamsType = {
    snickers: string;
};

type columnType = {
    table: number[],
    title: string,
    subtitle?: string
}

type tableType = {
    table: [
        {
            title: string,
            subtitle?: string,
            table: string[] | never[]
        }
    ],
    sizes: {
        [key: string]: number[]
    },
    comboTable: [
        {
            title: string,
            subtitle?: string,
            table: string[] | never[]
        }
    ]
}
const SnickersInfo: React.FC = () => {
    const { shop } = { ...useAppSelector(state => state.menuReducer) }
    const navigate = useNavigate();
    let dispatch = useAppDispatch()
    let { snickers } = useParams<urlParamsType>();
    let [merchInfo, setMerchInfo] = useState<any>({ imgs: [], name: "", info: {} })

    const {cartCount} = useAppSelector(state =>state.menuReducer)

    let size = Object.keys(merchInfo.info)[0]
    let currentSize = useRef<string>("")
    let [local, setLocla] = useState<string>("ru")
    console.debug(merchInfo)
    let [active, setActive] = useState(false)
    let [tableInfo, setTableInfo] = useState<tableType>({ sizes: {}, table: [{ table: [], title: "" }], comboTable: [{ table: [], title: "" }] })
    if (size) {
        currentSize.current = size;
    }
    useEffect(() => {
        if (size) {
            currentSize.current = size;
        }
    }, [merchInfo])
    useEffect(() => {
        if (snickers) {
            getMerchInfo(snickers, (val) => { setMerchInfo(val) })
        }

    }, [])
    useEffect(() => {
        getSizeTable((val) => { setTableInfo(val) })
    }, [])
    return (
        <div>
            <div className={s.mainWrap}>

                <div style={{ height: "100%", width: "70%" }}>
                    <ImagePresantation images={merchInfo.imgs} />
                </div>
                <div style={{ height: "100%", width: "30%" }}>
                    <Button text={"размеры"} onChange={() => {

                        setActive(true)
                    }} />
                    <h1 className={s.merchName} >{merchInfo.name}</h1>
                    <PriceHolder onChange={(size) => { currentSize.current = size }} elems={merchInfo.info} />
                    <Button text='Купить' className={s.buyMerch} onChange={() => {
                        dispatch(setSnickers([{
                            count: 1,
                            img: merchInfo.imgs[0],
                            firm: merchInfo.firm,
                            name: merchInfo.name,
                            size: currentSize.current,
                            id: merchInfo.id
                        }]))
                        navigate("/form")
                    }} />
                    <Button text='Добавить в корзину' className={s.buyMerch} onChange={() => {
                        let size = Number(currentSize.current)
                        if (local === "ru") {
                            size = tableInfo.sizes["us"][tableInfo.sizes["ru"].indexOf(Number(currentSize.current))]
                        }
                      
                        let cart = getCookie("cart")
                        let data: any = {
                            id: Number(snickers),
                            info:{
                                size: String(size)
                            },
                            gashUrl:cart
                        }

                        if(cart){
                            let data: any = {
                                id: Number(snickers),
                                info:{
                                    size: String(size)
                                },
                                hashUrl:cart
                            }
                            updatePreorder(data,()=>{
                                dispatch(cartCountAction(cartCount+1))
                            }) 
                        }else{
                            createPreorder(data,(hash)=>{
                                let data: any = {
                                    id: Number(snickers),
                                    info:{
                                        size: String(size)
                                    }
                                }
                                setCookie('cart', hash.hashUrl, {'max-age': 604800})
                                dispatch(cartCountAction(cartCount+1))
                            })
                        }



                        //     let size = Number(currentSize.current)
                        //     if(local === "ru"){
                        //         size = tableInfo.sizes["us"][tableInfo.sizes["ru"].indexOf(Number(currentSize.current))]
                        //     }
                        //   let data:any = {
                        //     id:Number(snickers),
                        //     size:size,
                        //     title:"ru"
                        // }

                        //         dispatch(shopAction([data, ...shop ]))

                    }} />
                    <DoubleInfoDrop className={{ main: s.doubleInfoDropFirst, second: s.doubleInfoDropSecond }} info={"ГАРАНТИЯ ЛУЧШЕЙ ЦЕНЫ"}>
                        <div>
                            {text}
                        </div>
                    </DoubleInfoDrop>
                </div>
                <Modal onChange={setActive} active={active}>
                    <Scroller className={s.scrollStyle}>
                        <TableWithComboboxColumn className={s.modalTable} {...tableInfo} />
                    </Scroller>
                </Modal>
            </div>
        </div>

    )
}


export default SnickersInfo