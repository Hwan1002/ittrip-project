import React, { useEffect, useState } from "react";



import { useNavigate } from "react-router-dom";
import "../css/Main.css";

// import banner1 from "../img/MainPage/banner/banner1.jpg";
import banner2 from "../img/MainPage/banner/banner2.jpg";
// import ImgSliderData from "../img/test/ImgSliderData";
import local1 from "../img/MainPage/local1.gif";
import local2 from "../img/MainPage/local2.gif";
import local3 from "../img/MainPage/local3.gif";
import local4 from "../img/MainPage/local4.gif";
import local5 from "../img/MainPage/local5.gif";
import local6 from "../img/MainPage/local6.gif";
import local7 from "../img/MainPage/local7.gif";
import local8 from "../img/MainPage/local8.png";
import "../css/Main.css";

import Modal from "../components/Modal";
import useModal from "../context/useModal";
import MainLocal from "../components/MainLocal";

const Main = () => {
    const navigate = useNavigate()

    const [whiteBox, setWhiteBox] = useState(false);  // 흰 배경 박스를 띄우는 것을 조절하는 state
    const [select, setSelect] = useState(''); // 어떤 지역을 선택했는지 알려주는 state
    const [content, setContent] = useState({}); // 표출할 내용을 저장하는 state
    
    const {
        isModalOpen,
        modalTitle,
        modalMessage,
        modalActions,
        openModal,
        closeModal,
    } = useModal();

    // select가 변경될 때마다 content를 업데이트
    useEffect(() => {
        const contentEvent = () => {
            switch (select) {
                case "서울":
                    setContent({english:"SEOUL",explan:"서울은 현대적이고 전통적인 매력을 모두 갖춘 도시로, 고궁과 전통 시장, 쇼핑과 음식이 풍성한 명소, 북촌 한옥마을, 경복궁, 남산타워 등 다양한 명소가 방문객을 맞이합니다."});
                    break;
                case "경기":
                    setContent({english:"GYEONGGI",explan:"경기도는 아름다운 자연과 풍성한 문화유산을 자랑하는 여행지로, 서울 근교에서 쉽게 접근할 수 있습니다. 인기 있는 명소로는 수원 화성, 가평의 북한강, 파주의 DMZ가 있습니다."});
                    break;
                case "인천":
                    setContent({english:"",explan:"인천은 아름다운 바다와 다양한 문화가 어우러진 도시로, 차이나타운과 송도 국제도시가 유명합니다. 또한, 인천공항을 중심으로 편리한 교통과 풍성한 쇼핑, 맛집도 즐길 수 있는 여행지입니다."});
                    break;
                case "강원":
                    setContent({english:"",explan:"강원도는 청정 자연과 아름다운 산과 바다가 어우러진 곳으로, 설악산과 동해의 해변이 유명합니다. 하이킹, 스키, 해양 스포츠 등 다양한 활동을 즐기며 자연의 매력을 만끽할 수 있는 여행지입니다."});
                    break;
                case "충청":
                    setContent({english:"",explan:"충청도는 고즈넉한 전통과 자연의 아름다움이 어우러진 지역으로, 공주와 부여의 역사 유적지와 청풍호수의 경치가 유명합니다. 또한, 맛있는 음식과 다양한 축제들이 있어 여행객들에게 풍성한 경험을 제공합니다."});
                    break;
                case "전라":
                    setContent({english:"",explan:"전라도는 풍부한 역사와 문화유산을 자랑하는 지역으로, 전주 한옥마을과 광주 문화가 유명합니다. 또한, 맛있는 음식과 아름다운 자연 경관, 특히 남해안의 섬들이 매력적인 여행지입니다."});
                    break;
                case "경상":
                    setContent({english:"",explan:""});
                    break;
                case "제주":
                    setContent({english:"",explan:""});
                    break;
                default:
                    setContent(""); // select가 비어 있을 경우 content 초기화
            }
        };
        contentEvent(); // `select` 값이 변경될 때마다 `contentEvent` 실행
    }, [select]); // `select`가 변경될 때마다 실행

    return (
        <div id="main">
            {/* 큰 배너 */}

            <div id="bigbanner">
                <img src={banner2} alt="banner"/>
            </div>

            {/* 지역 4개 */}
            <div className="localSet">
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("서울");
                }}>
                    <div className="localName">

                        <p className="localEnglish">SEOUL</p>
                        <p className="localKorea">서울</p>
                    </div>
                    <div className="localImg">
                        <img src={local1} alt="서울"/>
                    </div>

                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("경기");
                }}>

                    <div className="localName">
                        <p className="localEnglish">GYEONGGI</p>
                        <p className="localKorea">경기</p>
                    </div>
                    <div className="localImg">
                        <img src={local2} alt="경기"/>
                    </div>

                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("인천");
                }}>

                    <div className="localName">
                        <p className="localEnglish">INCHEON</p> <p className="localKorea">인천</p>
                    </div>
                    <div className="localImg">
                        <img src={local3} alt="인천"/>
                    </div>

                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("강원");
                }}>

                    <div className="localName">
                        <p className="localEnglish">GANGWON</p> <p className="localKorea">강원</p>
                    </div>
                    <div className="localImg">
                        <img src={local4} alt="강원"/>
                    </div>

                </div>
            </div>

            {/* 지역 4개 */}
            <div className="localSet">
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("충청");
                }}>

                    <div className="localName">
                        <p className="localEnglish">CHUNCHEONG</p> <p className="localKorea">충청</p>
                    </div>
                    <div className="localImg">
                        <img src={local5} alt="충청도"/>
                    </div>

                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("전라");
                }}>

                    <div className="localName">
                        <p className="localEnglish">JEOLLA</p> <p className="localKorea">전라</p>
                    </div>
                    <div className="localImg">
                        <img src={local6} alt="전라도"/>
                    </div>

                </div >

                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("경상");
                }}>

                    <div className="localName">
                        <p className="localEnglish">GYEONGSANG</p> <p className="localKorea">경상</p>
                    </div>
                    <div className="localImg">
                        <img src={local7} alt="경기도"/>
                    </div>

                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("제주");
                }}>

                    <div className="localName">
                        <p className="localEnglish">JEJU</p> <p className="localKorea">제주</p>
                    </div>
                    <div className="localImg">
                        <img src={local8} alt="제주"/>
                    </div>

                </div>
            </div>
            <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={modalTitle}
                    content={<p>{modalMessage}</p>}
                    actions={modalActions}
            />
            {/* 클릭시 팝업 페이지 */}
            {whiteBox && (
                <div className="overlay">
                    <div className="boxContent">
                        <MainLocal select={select} content={content}/>
                        <div id="mainbtFrame">
                        <button id="mainBackBt" onClick={() => setWhiteBox(false)}>돌아가기</button>
                        <button id="mainNewBt" onClick={()=>{navigate("/newtrip")}}>일정 만들기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;