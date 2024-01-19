import React, { ReactElement, useRef, useState } from 'react'
import {searchNames} from "src/providers/searchProvider"
import Input from '../Input'
import loupe from "../../../public/loupe.svg";
import s from "./style.module.css"

type propsRowType = {
    onDataRecieve: (...args: any) => void | null,
    searchCallback:(...args: any) => void | null,
    className?: string
}
const defaultStyle: any = {
    border: "2px solid blue",
    position: "relative",
    backgroundColor: "white"

}


const Search: React.FC<propsRowType> = (props) => {
    let trottlingTimerId = useRef<ReturnType<typeof setTimeout> | null>(null)
    let { className, onDataRecieve,searchCallback } = { ...props }
    let text = useRef<string>("")
    const createSearchRequest = (val: string) => {
        text.current = val;
        if (trottlingTimerId.current) {
            clearTimeout(trottlingTimerId.current);
        }
        trottlingTimerId.current = setTimeout(() => {
            searchNames(val,onDataRecieve)
        }, 1000)
    }

    return (
        <div className={className ? className : s.search}>
            <Input className={s.input} onChange={createSearchRequest}>
            </Input>
            <img onClick={()=>searchCallback(text.current)} className={s.img} src={loupe} alt="" />
        </div>
    )
}

export default Search