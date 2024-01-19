import React, { ReactElement, useRef, useState } from 'react'

type propsRowType = {
    onChange:(...args:any)=>void|null
    className?:string,
    placeholder?:string
}



const Input: React.FC<propsRowType> = (props) => {
    const inputRef =  useRef(null)
    let {onChange,className,placeholder} = {...props}
    return (
        <input placeholder={placeholder?placeholder:""} style={{boxSizing:'border-box',width:"100%"}} className={className} ref={inputRef} type='text' onChange={(e)=>{if(onChange){onChange(e.target.value)}}}/>
    )
}

export default Input