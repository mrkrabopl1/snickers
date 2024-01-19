import React, {SetStateAction,Dispatch } from 'react';
import s from "./style.module.css"

interface ModalProps {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>

}

const Modal: React.FC<ModalProps> = ({active, setActive,children}) => {
    if(active){
        document.body.style.overflow = 'hidden';
    }
    return (
        <div onWheel={(e)=>{
            e.stopPropagation()
        }} className={active?s.modalBack:s.none}>
            <div onClick={()=>setActive(false)} className={s.close}>
                x
            </div>
            <div className={s.modalWrap}>
                {children}
            </div>
        </div>
    )
}

export default Modal