import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Menu from './Menu'
import ComplexDrop from 'src/components/complexDrop/complexDrop'


interface MerchMenuInterface {
    className?:string,
    complexDropData:{
        [key: string]: string[];
    }
    
}

const ComplexDropMenu: React.FC<MerchMenuInterface> = (props) => {
    
    let {className,complexDropData} = {...props}
    return(
        <div className={className}>

             <Menu/>
             <ComplexDrop onChange={()=>{}} data={complexDropData}/>

        </div>
    )
}


export default ComplexDropMenu