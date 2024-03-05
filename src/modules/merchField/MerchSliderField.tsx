import React, { ReactElement, useEffect, useRef, useState } from 'react'
import MerchBlock from "./MerchBlock"
import NameBorder from 'src/components/wraps/NameBorder'
import ContentSlider from 'src/components/contentSlider/ContentSlider'


interface merchInterface {[key:string]:{ name: string, imgs: string[],id:string}[]}

const MerchSliderField: React.FC<{ data: merchInterface | null }> = (props) => {
    let { data } = { ...props }
    function createSliderSpace(data: merchInterface |null) {
        let arr: any = []

        if (data) {
            for(let i in data){
                let name: any = i
                let elems: any = data[i]
                let merchBlocksArr = elems.map((val: any) => {
                    return <MerchBlock width={"25%"} data={val} />
                })
                let opp = <NameBorder {...{ content: <ContentSlider content={merchBlocksArr} />, name: name }} ref={null} />
                arr.push(opp)
            }
        }
        return arr
    }
    return (
        <div >
            {createSliderSpace(data)}
        </div>
    )
}


export default MerchSliderField