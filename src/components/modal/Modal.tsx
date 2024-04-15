import React, {SetStateAction,Dispatch } from 'react';
import s from "./style.module.css"

interface ModalProps {
    active: boolean
    onChange: (data:boolean)=>void

}

const Modal: React.FC<ModalProps> = ({active, onChange,children}) => {
    if(active){
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = 'unset';
    }
    
    return (
        <div 
            onWheel={(e)=>{
                e.stopPropagation()
            }} 
            className={active?s.modalBack:s.none}
            onClick={()=>onChange(false)}>
            <div onClick={(e)=>{e.stopPropagation()}} className={s.modalWrap}>
                {children}
            </div>
        </div>
    )
}

export default Modal