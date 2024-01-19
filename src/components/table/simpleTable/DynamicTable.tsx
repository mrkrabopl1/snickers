import React, { ReactElement, useEffect, useRef, useState } from 'react'
import s from "./style.module.css"
import DynamicColumn from './DynamicColumn'
import { useAppSelector, useAppDispatch } from 'src/store/hooks/redux'
import DynamicElement from 'src/components/dynamicElement/DynamicElement'

type dinamicElementType = {
    componentName:string,propsData:any
}



type sortingType = (tableArr: string[][], id: number) => void

type sortedType = {
    index: number,
    direction: boolean
}

type tableType = {
    table: [
        {
            title: string,
            subtitle?: string,
            table:  dinamicElementType[] | string[]
        }
    ],

    className?:string
}

const DynamicTable: React.FC<tableType> = (props) => {
    let { table,  className } = { ...props }

    
    function createHeaders() {
        let headerArr = table.map((val, id) => {
            return <th>
                <div>
                    <span>{val.title}</span>
                </div>
            </th>
        })

        return headerArr

    }

    function createTables() {
        let tableArr = []
        if(table.length){
            for (let i = 0; i < table[0].table.length; i++) {
    
                tableArr.push(<tr>
                    {createTableRow(i)}
                </tr>)
            }
        }
        return tableArr
    }
    
    function createTableRow(index:number){
        let rowArr = []
        for (let i = 0; i < table.length; i++) {
            let val = table[i].table[index]
            if(typeof val === "string" ){
                rowArr.push(<td>{val}</td>)
            }else{
                rowArr.push(<td>{<DynamicElement {...val}/>}</td>)
            }
        }
        return rowArr
    }
    return (
        <table className = {className}  style={{
            borderCollapse: 'collapse',
            borderSpacing: '0px',
            width:"100%"
        }}>
            <thead>
                <tr>
                    {createHeaders()}
                </tr>
            </thead>
            <tbody>
                {createTables()}
            </tbody>
        </table>
    
    )
}

export default DynamicTable