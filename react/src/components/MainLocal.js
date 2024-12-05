import React from "react";
import '../css/MainLocal.css'
import local1 from '../img/MainPage/local1.gif'

const MainLocal = ({select,content}) => {

    //임시 구 정보 (API로 대체 예정)
    const guData =['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구']

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
                <div id="siGunImg"><img src={local1} style={{ width: '355px', height: '355px' }} /></div>
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