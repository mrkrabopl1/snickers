import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Slider from 'src/components/slider/Slider'
import NumInput from 'src/components/NumInput'
import ZoneSliderSimple from 'src/components/slider/ZoneSliderSimple'
import s from './style.module.css'

type ZoneSliderSetterType = {
    max: number,
    min: number,
    dataLeft?: number,
    dataRight?: number,
    onChange?:(arg:any)=>void
}


let styleWrapper: any = {
    position: "relative",
    height: "40px",
    left: "100px"
}




const ZoneSliderValueSetter: React.FC<ZoneSliderSetterType> = ({onChange, max, min, dataRight, dataLeft }) => {
    let memoSlider = useRef<boolean>(true)

    let wrappRef = useRef<HTMLDivElement>(null)
    let sliderRef = useRef(null)
    let active = useRef(false)
    let [sliderPosition, setSliderPosition] = useState(0)

    let [numDataLeft, changeLeftNumData] = useState<number>(min)
    let [numDataRight, changeRightNumData] = useState<number>(max)

    useEffect(() => {
        if (dataRight && dataRight <= max && dataRight >= min) {
            if (dataLeft) {
                if (dataRight > dataLeft) {
                    changeRightNumData(dataRight)
                }
            } else {
                changeRightNumData(dataRight)
            }
        }
        if (dataLeft && dataLeft <= max && dataLeft >= min) {
            if (dataRight) {
                if (dataRight > dataLeft) {
                    changeLeftNumData(dataLeft)
                }
            } else {
                changeLeftNumData(dataLeft)
            }
        }
    },[])

    

    let sliderStyle: any = {
        position: "absolute",
        left: sliderPosition + "px",
        width: "10px",
        height: "10px",
        backgroundColor: "green",
        top: 0,
        bottom: 0,
        margin: "auto"
    }

    const convertSliderPosLeft = (sliderPosLeft:number) => {
        changeLeftNumData(min + (max-min)*sliderPosLeft)
    }
    const convertSliderPosRight = (sliderPosRight:number) => {
        changeRightNumData(min + (max-min)*sliderPosRight)
    }

    const changeLeftData=(data:number)=>{
            if(data>numDataRight||data<min){
                
            }else{
                memoSlider.current = !memoSlider.current;
                changeLeftNumData(data);
                if(onChange){
                    onChange([data,numDataRight])
                }
            }
    }

    const changeRightData=(data:number)=>{
        if(data<numDataLeft||data>max){
            
        }else{
            memoSlider.current = !memoSlider.current;
            changeRightNumData(data);
            if(onChange){
                onChange([numDataLeft,data])
            }
        }
}

    return (
        <div>
            <ZoneSliderSimple memo={memoSlider.current} onChangeLeft={convertSliderPosLeft} onChangeRight={convertSliderPosRight} min={(numDataLeft-min) /(max-min)} max={(numDataRight-min) /(max-min)} />
            <div style={{ display: "flex",width:"100%" }}>
                <NumInput className={s.numInput} data={numDataLeft} callback={changeLeftData} />
                <span>-</span>
                <NumInput className={s.numInput} data={numDataRight} callback={changeRightData} />
            </div>
        </div>
    )
}


export default ZoneSliderValueSetter