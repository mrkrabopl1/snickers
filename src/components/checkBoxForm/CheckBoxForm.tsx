import React, { ReactElement, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'src/store/hooks/redux'
import Checkbox from '../checkbox/Checkbox'
type columnType = {
   data:[{enable:boolean,activeData:boolean,name:string}]
}




const CheckBoxColumn: React.FC<columnType> = (props) => {
    let { data} = { ...props }
    let dataRef = useRef(data)
    const onChange  = (id:number,data:true)=>{
        dataRef.current[id].activeData = data
    }
    return (
        <div  >
                {dataRef.current.map((val,id)=>{
                   return( <div style={{display:"flex"}}>
                        {<Checkbox onChange={onChange.bind(this,id)} enable={val.enable} activeData={val.activeData}/>}
                        <p>{val.name}</p>
                    </div>)
                })}

        </div>

    )
}

export default CheckBoxColumn