import React, { useEffect, ReactElement, useState, useRef } from 'react'
import { imgImport, getImgs, getImg } from "src/providers/imgProvider"
import { useAppSelector } from 'src/store/hooks/redux'
import global from "src/global.css"
import { complexDropSlice } from 'src/store/reducers/complexDropSlice'
import Menu from "src/modules/menu/Menu"
import ComplexDropMenu from './modules/menu/ComplexDropMenu'
import MerchSliderField from './modules/merchField/MerchSliderField'
import { getBrends } from './providers/merchProvider'
import axios from "axios";
import DropZone from "src/develop/dropZone/DropZone"
import MerchBlock from './modules/merchField/MerchBlock'
import Root from './Root'
import Team from './Team'
import MerchField from "src/modules/merchField/MerchField"
import ComplexDrop from "src/components/complexDrop/complexDrop"
import SnickersInfo from './pages/snickersInfo/SnickersInfo'
import Form from './pages/formPage/FormPage'
import BuyPage from './pages/buyPage/BuyPage'
import CollectionPage from './pages/collectionPage/CollectionPage'
import Main from './pages/Main'
import {
  Link, Route, BrowserRouter as Router, Routes,
  createBrowserRouter,
  Outlet,
  RouterProvider,
  createRoutesFromElements,
  NavLink,
} from "react-router-dom";
import SettingsModule from './modules/settingsModule/SettingsModule'
import SearchPage from './pages/SearchPage'


const App: React.FC<any> = () => {
  let [merchFieldData, setMerchFieldData] = useState<any>([])



  const { chousenName } = useAppSelector(state => state.complexDropReducer)
  useEffect(() => { 
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8100/firms',
      headers: {}
  }
  ).then((res:any)=>{
    setMerchFieldData(res.data)
  })
    //getBrends(setMerchFieldData)
  }, [chousenName])
  return (
    <Router>
        <Routes>
          <Route path="/"  element={<div>
              <ComplexDropMenu complexDropData={merchFieldData} />
              <Outlet />
            </div>}>

            <Route path="/" element={
              <Main />
           }>
            </Route>
            <Route path="/test/:load" element={
              <DropZone />

            }>

            </Route>
            <Route path="/product/:snickers" element={
              <SnickersInfo />

            }
            >

            </Route>
            <Route path="/collections/:collection" element={
              <CollectionPage />

            }
            >

            </Route>
            <Route path="/form" element={
              <Form />

            }
            >

            </Route>
            <Route path="/settingsMenu" element={
              <SearchPage />

            }
            >
            </Route>
            <Route path="/buy" element={
              <BuyPage />

            }
            >
            </Route>
          </Route>
        </Routes>
    </Router>
  )
}

export default App