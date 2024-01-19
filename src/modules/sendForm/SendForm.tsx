import React, { useEffect, ReactElement, useState, useRef,memo,useCallback } from 'react'

import Input from "src/components/Input"
import Combobox from "src/components/combobox/Combobox"
import Checkbox from "src/components/checkbox/Checkbox"
import s from './style.module.css'

interface sendFormModuleInterface{
    className?:{
        input?:string,
        checkbox?:string,
        combobox?:string
    }
}

const SendForm: React.FC<sendFormModuleInterface> = (props) => {

    let {className} = {...props}
  
  return (

        <div className={s.wrapper}>
            <div>Контактная информация</div>
            <Input className= {className?.input} onChange={()=>{}} placeholder={"Электронный адрес"}/>
            <Checkbox activeData={false} enable={true} onChange={()=>{}}/>
            <div>
                <Input className= {className?.input} onChange={()=>{}} placeholder={"Имя"}/>
                <Input className= {className?.input} onChange={()=>{}} placeholder={"Фамилия"}/>
            </div>
            <Input className= {className?.input} onChange={()=>{}} placeholder={"Адрес"}/>
            <div style={{display:"flex"}}>
                <Input className= {className?.input} onChange={()=>{}} placeholder={"Город"}/>
                <Combobox className={className?.combobox} data={["test"]}  placeholder={"Регион"}/>
                <Input className= {className?.input} onChange={()=>{}} placeholder={"Почтовый индекс"}/>
            </div>
            <Input className= {className?.input} onChange={()=>{}} placeholder={"Телефон"}/>
            <div  style={{display:"flex"}}>
                <Checkbox activeData={false} enable={true} onChange={()=>{}}/>
                <span>Сохранить эту информацию на будущее</span>
            </div>
            <div style={{display:"flex"}}>
                <Checkbox activeData={false} enable={true} onChange={()=>{}}/>
                <span>Отправляйте мне SMS-сообщения о новостях и предложениях</span>
            </div>
          
        </div>

  )
}

function checkMemo(oldData:any, newData:any){
            return(oldData.memo === newData.memo)
}
export default memo(SendForm,checkMemo)