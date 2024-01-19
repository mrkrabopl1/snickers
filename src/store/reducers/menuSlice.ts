import {createSlice} from "@reduxjs/toolkit"
import dropFileType from '../../types/dropFile'

interface IField {
    show: boolean,
    sticky:boolean,
    shop:{[key:string]:number}
}

const initialState:IField  ={
   show:true,
   sticky:true,
   shop: localStorage.shopData?JSON.parse(localStorage.shopData):{}
}

const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        show(state,action){
            state.show = action.payload
        },    
        sticky(state,action){
            state.sticky = action.payload
        },
        shopAction(state,action){
            state.shop = {...action.payload}
        },    
    }

});

export  const {  show, sticky, shopAction } = menuSlice.actions

export default menuSlice.reducer