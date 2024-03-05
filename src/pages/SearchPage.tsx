import React, { useEffect, ReactElement, useState, useRef } from 'react'
import SearchWithList from 'src/modules/searchWithList/SearchWithList'
import SettingsModule from 'src/modules/settingsModule/SettingsModule'
import Button from 'src/components/Button'
import MerchSliderField from 'src/modules/merchField/MerchFieldWithPageSwitcher'
import { getMerchOnPage,getFullMerchInfoByFilters } from "src/providers/searchProvider"
import Menu from "src/modules/menu/Menu"
import s from "./style.module.css"
import { useAppDispatch } from 'src/store/hooks/redux'
import {searchNames} from "src/providers/searchProvider"
import {show,sticky,shopAction} from 'src/store/reducers/menuSlice'
import {ReactComponent as FoureGrid}  from 'src/../public/foureGrid.svg';
import {ReactComponent as SixGrid}  from 'src/../public/sixGrid.svg';
import { useLocation } from 'react-router-dom';
const SearchPage: React.FC<any> = () => {
    let [searchData, setSearchData] = useState<string | null>(null)
    const {state} = useLocation();

    useEffect(()=>{
        if(state){
            searchNames(state,5,setMerchFieldData)
        }
    })
    let [updateData,setUpdateData] =  useState<boolean>(true)    
    let currentPage = useRef<number>(1)
    let pages = useRef<number>(1)
    let pageSize= useRef<number>(6)

    let [filtersState,setFilters] = useState<any>([])
    let [merchFieldData, setMerchFieldData] = useState<any>([])

    let [grid,setGrid] = useState<boolean>(false)
    
   // let merchFieldData = useRef<any>({merchInfo:[],filters:[]})

    let filtersInfo = useRef<{[key:string]:any}>({})
    let settingsModuleMemo = useRef<boolean>(true)
    let firms = useRef<string[]>([])
    let searchWord = useRef<string>("")
    let dispatch = useAppDispatch()
    // useEffect(() => {
    //     if (searchData) {
    //         getImgs(searchData, setData)
    //     }
    // }, [searchData])
    let filters = useRef<any>(null)
    const setData=(data:any)=>{
            filters.current = data.filters
            setMerchFieldData( data.merchData)
            setUpdateData(!updateData)
    }
    

    const pageWrap = useRef<HTMLDivElement>(null)




    const searchCallback=(searchData:string)=>{
        searchWord.current = searchData; 
        filtersInfo.current["name"] = searchWord.current
        filtersInfo.current["currentPage"] =  currentPage.current;
        filtersInfo.current["pageSize"] =  pageSize.current;
        getMerchOnPage(filtersInfo.current,getRespData) 
    }
    let [showSettings,setShowSettings] = useState<boolean>(false)
    
    let timeArr = [41,42,43]

    const convertResponseData=(resData:{price:number[],avalible:boolean,firms:string[],size:string})=>{
        filtersInfo.current = {...resData};
        let priceObj = {
            name:"price",
            secondComponentInfo:{componentName:"modules/sliderValueSetter/ZoneSliderValueSetter",propsData:{min:resData.price[0],max:resData.price[1]}}
        }
        let sizeObj = {
            name:"size",
            secondComponentInfo: {componentName:"components/checkBoxForm/CheckBoxForm", propsData:{data:timeArr.map(val=>{
                return {enable:true,activeData:false,name:val}
                 }
             )}}
        }
        let avelible = {
            name:"avelible",
            componentInfo:{componentName:"components/switcher/LineSwitcher",propsData:{}}
        }
        let settingsData = [];
        settingsData.push(priceObj);
        settingsData.push(sizeObj);
        firms.current = resData.firms.slice();
        for(let i = 0;i<resData.firms.length;i++){
            settingsData.push(
                {
                    name:resData.firms[i],
                    componentInfo:{componentName:"components/switcher/LineSwitcher",propsData:{}}
                }
            )
        }
        return  settingsData
    }

    const getRespData=(resData:{pages:number,merchInfo:[],filters:{price:number[],avalible:boolean,firms:string[],size:string}})=>{
            pages.current = resData.pages;
            let data =  convertResponseData(resData.filters)
            let setObj = {
                merchInfo:resData.merchInfo,
                filters:data
            }
            settingsModuleMemo.current =  !settingsModuleMemo.current;
            setFilters(data)
            setMerchFieldData(resData.merchInfo)
        }

    const getRespDataByFilter=(respData:{merchInfo:[]})=>{
        setMerchFieldData(respData)
    }


    let styleData = {
        main:s.main,
        dropList:s.drop_list
    }



    const manipulateMenu=(e: React.WheelEvent<HTMLDivElement>)=>{
        if(pageWrap.current){
                if(e.deltaY>0){
                    if(window.scrollY + e.deltaY<100){
                        dispatch(sticky(false))
                    }else{
                        dispatch(sticky(true))
                        dispatch(show(false))
                    }
                }else{
                    dispatch(sticky(true))
                    dispatch(show(true))
                }
        }
    }

    const onChange = (data:any) =>{
        
        if(firms.current.indexOf(data.name)!==-1){
            if(!data.data){
                filtersInfo.current["firms"].splice(filtersInfo.current["firms"].indexOf(data.name),1)
            }else{
                if(filtersInfo.current["firms"].indexOf(data.name) === -1){
                    filtersInfo.current["firms"].push(data.name);
                }
            }
        
        }

        filtersInfo.current["name"] = searchWord.current;
        filtersInfo.current[data.name] = data.data;
        filtersInfo.current["currentPage"] =  currentPage.current;
        filtersInfo.current["pageSize"] =  pageSize.current;
        getFullMerchInfoByFilters(filtersInfo.current,getRespDataByFilter)
    }


    const pageChange=(page:number)=>{
        currentPage.current = page;
        filtersInfo.current["name"] = searchWord.current;
        filtersInfo.current["currentPage"] =  currentPage.current;
        filtersInfo.current["pageSize"] =  pageSize.current;
        filtersInfo.current["pages"] =  pages.current;
        getMerchOnPage(filtersInfo.current,getRespData) 
    }



    return (

        <div ref={pageWrap}  onWheel={(e)=>manipulateMenu(e)}>
            <div  style={{  position:"relative"}}>
                    <SearchWithList val={state} className={styleData} searchCallback={searchCallback} onDataRecieve={setSearchData} />
                    <MerchSliderField onChange={pageChange} currentPage = {currentPage.current}  pages={pages.current} heightRow={500} size={grid?2:3} data={merchFieldData} />
                    <div  onClick={()=>{
                        setGrid(!grid)
                    }} style={{position:"absolute", top:0,width:"50px",height:"50px"}}>
                                {grid?<FoureGrid/>:<SixGrid/>}
                            </div>
                    <div onMouseLeave={()=>{}} style={showSettings?{right:"0"}:{}} className={s.settings_holder}>
                            <Button className={s.filterBtn} text={''} onChange={()=>setShowSettings(!showSettings)} />
                            <SettingsModule memo={settingsModuleMemo.current} onChange={onChange} filters={filtersState} />
                    </div>
            </div>
        
        </div>


    )
}

export default SearchPage