import React, { useEffect, useState } from "react";
import '../css/MainLocal.css'
import local1 from '../img/MainPage/local1.gif'

const MainLocal = ({select,content}) => {

    //임시 구 정보 (API로 대체 예정)
    const [guData,setGuData] = useState([]);

    // useEffect(()=>{
    //      try {
    //           const response = axios.get(
    //             `${API_BASE_URL}/1`,{
    //                 params:{
    //                     area:{select}
    //                 }
    //             } 
    //           );
    //         } catch (error) {
    //           alert("에러 내용:", error);
    //         }
    // },[])

    return (
        <div id="mainLocal">
            <div id="siGun">
                <div id="siGunText">
                    <div >
                        <div>
                            <p id="seoulKo">{select}</p>
                            <p id="seoulEn">{content.english}</p>
                        </div>
                    </div>
                    <p >
                        {content.explan}
                    </p>
                </div>
                <div id="siGunImg"><img src={local1} style={{ width: '355px', height: '355px' }} alt="이미지"/></div>
            </div>

            <div id="tripSelect">{/* 여행할곳을 선택해주세요 */}
                <p>여행할 곳을 선택해 주세요</p>
                <div id="guSelect">
                    {guData.map((gu)=>(<button className="guBt">{gu}</button>))}
                </div>
            </div>
        </div>
    )
}

export default MainLocal