import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../service/api-config";
import '../css/MainLocal.css';
import local1 from '../img/MainPage/local1.gif';

const MainLocal = ({ select, content, locals }) => {
    // 임시 구 정보 (API로 대체 예정)
    const [guData, setGuData] = useState([]);
    const [area, setArea] = useState("");

    // 초기 렌더링 시 area 설정
    useEffect(() => {
        if (!locals) {
            setArea(select);
        }
    }, [locals, select]);

    // area가 변경될 때마다 fetchGuData 호출
    useEffect(() => {
        const fetchGuData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/1`, {
                    params: { areaNm: area },
                });
                setGuData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("에러 내용:", error);
            }
        };

        if (area) { // area가 유효할 때만 fetch 호출
            fetchGuData();
        }
    }, [area]); // area가 변경될 때 실행

    // 지역 변경 핸들러
    const changeArea = (e) => {
        console.log(e);
        setArea(e.target.textContent); // 버튼의 텍스트를 area로 설정
    };

    return (
        <div id="mainLocal">
            <div id="siGun">
                <div id="siGunText">
                    <div>
                        <div>
                            <p id="seoulKo">{select}</p>
                            <p id="seoulEn">{content.english}</p>
                        </div>
                    </div>
                    <p>{content.explan}</p>
                </div>
                <div id="siGunImg">
                    <img src={local1} style={{ width: '355px', height: '355px' }} alt="이미지" />
                </div>
            </div>

            <div id="tripSelect">
                <p>여행할 곳을 선택해 주세요</p>
                <div id="guSelect">
                    {/* 지역 버튼 */}
                    {locals && locals.map((local) => (
                        <button className="guBt" onClick={changeArea} key={local}>
                            {local}
                        </button>
                    ))}
                    {/* 구 데이터 버튼 */}
                    {guData.map((gu, index) => (
                        <button className="guBt" key={index}>
                            {gu}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainLocal;
