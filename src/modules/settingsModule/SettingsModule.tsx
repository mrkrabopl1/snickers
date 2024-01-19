import React, { useEffect, ReactElement, useState, useRef,memo,useCallback } from 'react'
import DropWrapper from 'src/components/dropWrapper/DropWrapper'
import DynamicForm from 'src/components/dynamicForm/DynamicForm'
import { useAppDispatch } from 'src/store/hooks/redux'
import {secondDropSlice} from 'src/store/reducers/secondDropSlice'
import DynamicElement from "src/components/dynamicElement/DynamicElement"
import {getFilters} from "src/providers/searchProvider"
import Button from "src/components/Button"
import s from './style.module.css'
type propsRowType = {
    propsData:any,
    componentName:string,
}

interface settingModuleInterface{
    filters:[{
        name:string,
        componentInfo:{componentName:string,propsData:any},
        secondComponentInfo?:any
    }],
    memo?:boolean,
    onChange?:(arg:any)=>void
}

type dataType = {price:number[],sizes:number[]}
const SettingsModule: React.FC<settingModuleInterface> = (props) => {
    let {filters,onChange} = {...props}
    let dataRef = useRef<dataType>({price:[],sizes:[]})
    useEffect(()=>{
        getFilters(setData)
    },[])

    let currentName = useRef<string>("")

    const setData = (dataInfo:dataType)=>{
        dataRef.current = dataInfo
    }
    let dispatch = useAppDispatch()
    let arrData:propsRowType[]=[
        {componentName:"components/checkBoxForm/CheckBoxForm", propsData:{data:dataRef.current.sizes.map(val=>{
           return {enable:true,activeData:false,name:val}
            }
        )}},
        {componentName:"modules/sliderValueSetter/ZoneSliderValueSetter",propsData:{min:dataRef.current.price[0],max:dataRef.current.price[1]}}

    ]
    let [secondElemName,setSecondElemName] = useState<propsRowType>(arrData[0])
    const {show} = { ...secondDropSlice.actions }
    const onChangeData=(arr:any[])=>{
        dispatch(show(true))
        currentName.current = arr[1]
        setSecondElemName(arrData[1])
    }

    const onChangeMain = (data:any) =>{
        currentName.current
        let obj = {
            name:currentName.current,
            data:data
        }
        onChange && onChange(obj)
    }


    const onChangeForm = (data:any) =>{
        onChange && onChange(data)
    }
    for(let i =0;i<filters.length;i++){
        if(!filters[i].componentInfo){
            filters[i].componentInfo = {componentName:"components/Button",propsData:{className:s.buttonStyle,text:"","onClick":onChangeData.bind(this,[i,filters[i].name])}}
        }
    }

    const onClose=()=>{
        dispatch(show(false))
     
    }
   // [{name:"das",componentInfo:{componentName:"components/Button",propsData:{className:s.buttonStyle,text:"","onClick":onChange.bind(this,0)}}},{name:"das",componentInfo:{componentName:"components/Button",propsData:{className:s.buttonStyle,text:"","onClick":onChange.bind(this,1)}}}]
  return (

        <div className={s.wrapper}>
            {<DropWrapper id={"settingsDrop"}>
                    {<DynamicForm onChange={useCallback(onChangeForm,[])} form={filters}/>}
                    {<div>
                        <DynamicElement  onChange={onChangeMain} {...secondElemName}/>
                        <Button text={"принять"} onChange={onClose}></Button>
                    </div>}

            </DropWrapper>}
        </div>

  )
}

function checkMemo(oldData:any, newData:any){
            return(oldData.memo === newData.memo)
}
export default memo(SettingsModule,checkMemo)