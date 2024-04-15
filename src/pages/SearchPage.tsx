import React, { useEffect, ReactElement, useState, useRef } from 'react'
import SearchWithList from 'src/modules/searchWithList/SearchWithList'
import SettingsModule from 'src/modules/settingsModule/SettingsModule'
import Button from 'src/components/Button'
import MerchSliderField from 'src/modules/merchField/MerchFieldWithPageSwitcher'
import { getMerchOnPage, getFullMerchInfoByFilters } from "src/providers/searchProvider"
import Menu from "src/modules/menu/Menu"
import s from "./style.module.css"
import { useAppDispatch } from 'src/store/hooks/redux'
import { searchNames, searchSnickersByString } from "src/providers/searchProvider"
import { show, sticky, shopAction } from 'src/store/reducers/menuSlice'
import { ReactComponent as FoureGrid } from 'src/../public/foureGrid.svg';
import { ReactComponent as SixGrid } from 'src/../public/sixGrid.svg';
import { useLocation } from 'react-router-dom';


// interface firmObj = {
//     [key]string:int
// }

interface FiltersInfoRequest {
    sizes: string[],
    price: number[],
    firms: string[]
}
const SearchPage: React.FC<any> = () => {
   
    const { state } = useLocation();
    let filtersInfo = useRef<FiltersInfoRequest>({
        sizes: [],
        price: [],
        firms: []
    })
    let activeSizes = useRef<string[]>([])
    let settingsModuleMemo = useRef<boolean>(true)
    let firms = useRef<string[]>([])
    let searchWord = useRef<string>("")
    let dispatch = useAppDispatch()

    const updatePage = (respData: any) => {
        pages.current = respData.pages
        setMerchFieldData(respData.snickers)
        settingsModuleMemo.current = !settingsModuleMemo.current;
        const data = convertFilterseData(respData.filters)
        setFilters(data)
    }


    let [updateData, setUpdateData] = useState<boolean>(true)
    let currentPage = useRef<number>(1)
    let pages = useRef<number>(1)
    let pageSize = useRef<number>(6)

    let [filtersState, setFilters] = useState<any>([])
    useEffect(() => {
        if (state) {
            searchWord.current = state
            searchSnickersByString(state, updatePage, currentPage.current, pageSize.current, filtersInfo.current)
        }
    }, [])
    let [merchFieldData, setMerchFieldData] = useState<any>([])

    let [grid, setGrid] = useState<boolean>(false)

    // let merchFieldData = useRef<any>({merchInfo:[],filters:[]})


    let filters = useRef<any>(null)
    const setData = (data: any) => {
        filters.current = data.filters
        setMerchFieldData(data.merchData)
        setUpdateData(!updateData)
    }


    const pageWrap = useRef<HTMLDivElement>(null)




    const searchCallback = (searchData: string) => {
        searchWord.current = searchData;
        searchSnickersByString(searchWord.current, updatePage, currentPage.current, pageSize.current, filtersInfo.current)
    }
    let [showSettings, setShowSettings] = useState<boolean>(false)


    const convertFilterseData = (resData: { price: number[], avalible: boolean, firmsCount: { [key: string]: string }, sizes: { [key: string]: number } }) => {

        let priceProps: { [key: string]: number } = {
            min: resData.price[0],
            max: resData.price[1]
        }
        if (filtersInfo.current.price.length !== 0) {
            priceProps.dataLeft = filtersInfo.current.price[0]
            priceProps.dataRight = filtersInfo.current.price[1]
        }
        let priceObj = {
            name: "price",
            componentInfo: { componentName: "modules/sliderValueSetter/ZoneSliderValueSetter", propsData: priceProps }
        }

        let sizesEntries = Object.entries(resData.sizes);

        let checkBoxPropsData: any = []

        sizesEntries.forEach(el => {
            if (el[1] != 0) {
                activeSizes.current.push(el[0]);
                checkBoxPropsData.push({ enable: true, activeData: false, name: el[0] + "(" + el[1] + ")" })
            }
        })

        let sizeObj = {
            name: "sizes",
            componentInfo: {
                componentName: "components/checkBoxForm/CheckBoxForm",
                propsData: { data: checkBoxPropsData }
            }
        }
        let avelible = {
            name: "avelible",
            componentInfo: { componentName: "components/switcher/LineSwitcher", propsData: {} }
        }

        const entries = Object.entries(resData.firmsCount)

        let checkBoxPropsFirmData: any = []
        for (let i = 0; i < entries.length; i++) {
            firms.current.push(entries[i][0])
            let active = filtersInfo.current.firms.indexOf(entries[i][0]) !== -1
            checkBoxPropsFirmData.push({ enable: true, activeData: active, name: entries[i][0] + "(" + entries[i][1] + ")" })
        }

        let firmObj = {
            name: "firms",
            componentInfo: {
                componentName: "components/checkBoxForm/CheckBoxForm",
                propsData: { data: checkBoxPropsFirmData }
            }
        }
        let settingsData = [];

        settingsData.push(priceObj);
        settingsData.push(sizeObj);
        settingsData.push(firmObj);
        return settingsData
    }

    const getRespData = (resData: { pages: number, merchInfo: [], filters: { price: number[], avalible: boolean, firmsCount: { [key: string]: string }, sizes: { [key: string]: number } } }) => {
        pages.current = resData.pages;
        let data = convertFilterseData(resData.filters)
        let setObj = {
            merchInfo: resData.merchInfo,
            filters: data
        }
        settingsModuleMemo.current = !settingsModuleMemo.current;
        setFilters(data)
        setMerchFieldData(resData.merchInfo)
    }

    const getRespDataByFilter = (respData: { merchInfo: [] }) => {
        setMerchFieldData(respData)
    }


    let styleData = {
        main: s.main,
        dropList: s.drop_list
    }



    const manipulateMenu = (e: React.WheelEvent<HTMLDivElement>) => {
        if (pageWrap.current) {
            if (e.deltaY > 0) {
                if (window.scrollY + e.deltaY < 100) {
                    dispatch(sticky(false))
                } else {
                    dispatch(sticky(true))
                    dispatch(show(false))
                }
            } else {
                dispatch(sticky(true))
                dispatch(show(true))
            }
        }
    }

    const onChange = (filter: any) => {
        let index: number;
        switch (filter.name) {
            case "sizes":
                let size = activeSizes.current[filter.data.id];
                index = filtersInfo.current.sizes.indexOf(size)
                if (index !== -1 && !filter.data.active) {
                    filtersInfo.current.sizes.splice(index, 1)
                } else {
                    if (filter.data.active) {
                        filtersInfo.current.sizes.push(size)
                    }
                }
                break
            case "price":
                filtersInfo.current.price = filter.data
                break
            case "firms":
                let firm = firms.current[filter.data.id];
                index = filtersInfo.current.firms.indexOf(firm)
                if (index !== -1 && !filter.data.active) {
                    filtersInfo.current.firms.splice(index, 1)
                } else {
                    if (index === -1 && filter.data.active) {
                        filtersInfo.current.firms.push(firm)
                    }
                }
                break
        }
        searchSnickersByString(searchWord.current, updatePage, currentPage.current, pageSize.current, filtersInfo.current)
    }


    const pageChange = (page: number) => {
        currentPage.current = page;
        searchSnickersByString(searchWord.current, updatePage, currentPage.current, pageSize.current, filtersInfo.current)
    }



    return (

        <div ref={pageWrap} onWheel={(e) => manipulateMenu(e)}>
            <div style={{ position: "relative" }}>
                <SearchWithList val={searchWord.current} className={styleData} searchCallback={searchCallback}  />
                <MerchSliderField onChange={pageChange} currentPage={currentPage.current} pages={pages.current} heightRow={500} size={grid ? 2 : 3} data={merchFieldData} />
                <div onClick={() => {
                    setGrid(!grid)
                }} style={{ position: "absolute", top: 0, width: "50px", height: "50px" }}>
                    {grid ? <FoureGrid /> : <SixGrid />}
                </div>
                <div onMouseLeave={() => { }} style={showSettings ? { right: "0" } : {}} className={s.settings_holder}>
                    <Button className={s.filterBtn} text={''} onChange={() => setShowSettings(!showSettings)} />
                    <SettingsModule classNames={{ secondPage: s.secondPage }} memo={settingsModuleMemo.current} onChange={onChange} filters={filtersState} />
                </div>
            </div>

        </div>


    )
}

export default SearchPage