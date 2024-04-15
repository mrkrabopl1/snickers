import React, { useEffect, ReactElement, useState, useRef, memo } from 'react'

import MerchSliderField from '../modules/merchField/MerchSliderField'
import { imgImport, getImgs, getImg } from "src/providers/imgProvider"
import { getMainInfo } from "src/providers/merchProvider"
import { useAppSelector } from 'src/store/hooks/redux'
import { useNavigate } from 'react-router-dom';
import MerchBanner from 'src/modules/merchBanner/MerchBanner'

const Main: React.FC<any> = () => {

  const navigate = useNavigate()

  const onChangeBanner = (id: string) => {
    navigate("/collections/" + id)
  }

  let [imgBanner, setImgBanner] = useState<{ image: string, name: string, id: string }>({ image: "", name: "", id: "" })
  function dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
  const createUrlImage = (data: { image: string, name: string, id: string }[]) => {
    data.forEach(val => {
      var blob = dataURItoBlob(val.image);
      var objectURL = URL.createObjectURL(blob);
      setImgBanner({ image: objectURL, name: val.name, id: val.id })
    })


  }
  const { chousenName } = useAppSelector(state => state.complexDropReducer)
  useEffect(() => {
    getImgs("air_jordan_1", setMerchFieldData)
  }, [chousenName])
  useEffect(() => {

    //  getMainInfo( createUrlImage)
  }, [])
  let [merchFieldData, setMerchFieldData] = useState<any>(null)


  return (

    <div>
      <MerchBanner onChange={onChangeBanner} id={imgBanner.id} title={imgBanner.name} img={imgBanner.image} />

      <MerchSliderField data={merchFieldData} />

    </div>


  )
}


function arePropsEqual(oldProps: any, newProps: any) {

  return (oldProps.memo == newProps.memo)
}

export default memo(Main, arePropsEqual)