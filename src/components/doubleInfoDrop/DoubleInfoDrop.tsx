import React, { ReactElement, useRef, useState } from 'react'
import Search from '../../components/search/Search'
import { useAppDispatch } from 'src/store/hooks/redux';
import DropDownList from '../../components/DropDownList'

type propsRowType = {
    className?: {
        main:string,
        second:string
    },
    children: React.ReactNode,
    info:string
    
}


const DoubleInfoDrop: React.FC<propsRowType> = (props) => {
    let {className,children,info} = {...props}
    let [active,setActive] = useState<boolean>(false)


    let secondDropStyle1 = {
        transition:"height 2s ",
        height:"0px",
        overflow:"hidden"
    
    
    }
    let drop = useRef<HTMLDivElement>(null)
    let secondDropStyle = {
        transition:"height 0.5s ",
        height:drop.current?.clientHeight + "px",
        overflow:"hidden"
    }
    return (
        <div  style = {{ position:"relative"}} className={className ? className.main : ""}>
            <div onClick={()=>{
                setActive(!active)
            }} style={{display:"flex"}} ><p>{info}</p><span style={{ position: "absolute", right: "0", paddingRight: "5px" }}>{active ? "\u1433" : "\u142F"}</span></div>
            <div style={active?secondDropStyle:secondDropStyle1}>
                <div ref={drop}>{children}</div>
            </div>

        </div>
    )
}

export default DoubleInfoDrop