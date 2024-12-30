import React from "react";
import '../css/MainLocal.css'

const MainLocal = ({localInfo}) => {
    return (
        <div id="mainLocal">
            <div id="siGun">
                <div id="siGunText">
                    <div>
                        <p id="seoulKo">{localInfo.localKorea}</p>
                        <p id="seoulEn">{localInfo.localEnglish}</p>
                    </div>
                    <p>{localInfo.explain}</p>
                </div>
                <div id="siGunImg">
                    <img src={localInfo.images} style={{ width: '355px', height: '355px' }} alt="이미지" />
                </div>
            </div>

            <div id="tripSelect">
                <p>여행할 곳을 선택해 주세요</p>
                <div id="guSelect">
                </div>
            </div>
        </div>
    );
};

export default MainLocal;
