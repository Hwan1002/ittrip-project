import React from "react";
import '../css/MainLocal.css'
import local1 from '../img/MainPage/local1.gif'

const MainLocal = () => {
    return (
        <div id="mainLocal">
            <div id="ciGun">
                <div>
                    <p>서울</p>
                    <p>SEOUL</p>
                    <p>서울은 현대적이고 전통적인 매력을 모두 갖춘 도시로,
                        고궁과 전통 시장, 쇼핑과 음식이 풍성한 명소,
                        북촌 한옥마을, 경복궁, 남산타워 등 다양한 명소가
                        방문객을 맞이합니다.
                    </p>
                </div>
                <div><img src={local1} style={{ width: '355px', height: '355px' }} /></div>
            </div>

            <div id="tripSelect">{/* 여행할곳을 선택해주세요 */}
                <p>여행할 곳을 선택해 주세요</p>
                <div id="guSelect">
                    종로구 | 중구 | 용산구 | 성동구 | 광진구 | 동대문구 | 중랑구 | 성북구 | 강북구 | 도봉구 | 노원구 | 은평구 | 서대문구 | 마포구 | 양천구 | 강서구 | 구로구 | 금천구 | 영등포구 | 동작구 | 관악구 | 서초구 | 강남구 | 송파구 | 강동구
                </div>
            </div>

            <div id="buttonFrame">{/* 하단버튼 */}
                <button>돌아가기</button>
                <button>일정 만들기</button>
            </div>
        </div>
    )
}

export default MainLocal