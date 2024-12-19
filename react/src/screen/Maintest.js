import React, { useContext, useEffect, useState } from "react";
import "../css/Main.css";
import banner2 from "../img/MainPage/banner/banner2.jpg";
import local1 from "../img/MainPage/local1.gif";
import local2 from "../img/MainPage/local2.gif";
import local3 from "../img/MainPage/local3.gif";
import local4 from "../img/MainPage/local4.gif";
import local5 from "../img/MainPage/local5.gif";
import local6 from "../img/MainPage/local6.gif";
import local7 from "../img/MainPage/local7.gif";
import local8 from "../img/MainPage/local8.png";
import { ProjectContext } from "../context/ProjectContext";
import { API_BASE_URL } from "../service/api-config";
import axios from "axios";
import Modal from "../components/Modal";

const Maintest = () => {

    // 지역명에대한 state
    const [select, setSelect] = useState("");
    // areaCd state 
    const [areaCd, setAreaCd] = useState("");

    const [signguNm, setSignguNm] = useState([])

    // 모달표시여부 state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 선택된 상위 지역 (충청도 , 경상도 ,전라도)
    const [selectedRegion, setSelectedRegion] = useState("");

    // 하위 지역 데이터
    const [subRegions, setSubRegions] = useState([]);

    // 모달

    // 지역 코드 
    const regionData = {
        충청도: [
            { name: "충북", areaCd: "43" },
            { name: "충남", areaCd: "44" },
            { name: "세종", areaCd: "36" },
            { name: "대전", areaCd: "30" },
        ],
        경상도: [
            { name: "경북", areaCd: "47" },
            { name: "경남", areaCd: "48" },
            { name: "대구", areaCd: "27" },
            { name: "울산", areaCd: "31" },
            { name: "부산", areaCd: "26" },
        ],
        전라도: [
            { name: "전북", areaCd: "52" },
            { name: "전남", areaCd: "46" },
            { name: "광주", areaCd: "29" },
        ],
    };




    const regionClick = (region) => {
        setSelectedRegion(region); // 선택된 상위 지역 설정
        setSubRegions(regionData[region]); // 하위 지역 데이터 설정
        setIsModalOpen(true);
        setSelect(region)
    };



    // 하위지역데이터에 값이 들어왔을때 axios요청을 보낼 함수 
    if (subRegions) {

    }



    useEffect(() => {

        if (areaCd) {
            const requestAreaNm = async () => {
                try {
                    // Axios 요청 (비동기 처리)
                    const response = await axios.get(`${API_BASE_URL}/1`, {
                        params: { areaCd: areaCd },
                    });
                    // 응답 데이터 확인
                    console.log("Response Data:", response.data.data);
                    // context의 상태 업데이트
                    setSignguNm(response.data.data);

                    // 데이터가 성공적으로 설정된 후 팝업창 열기
                    setIsModalOpen(true);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            requestAreaNm();
        } //if end
    }, [areaCd]) // useEffect end



    const requestData = async (item) => {
        try {
            // API 요청
            const response = await axios.get(`${API_BASE_URL}/123`, {
                params: { signguNm: item },
            });
            console.log("Response Data:", response.data.response.body.items.item);

            const items = response.data.response.body.items.item;

            // 'rlteCtgryLclsNm' 값이 '음식'인 항목만 필터링
            const filteredItems = items.filter((data) => data.rlteCtgryLclsNm === "음식");

            console.log("Filtered Items:", filteredItems);
            // 필요한 추가 작업 수행
        } catch (error) {
            console.error("Error fetching data:", error);
            // 에러 메시지 표시 등 추가 처리
        }
    };








    return (
        <div id="main">
            {/* 큰 배너 */}
            <div id="bigbanner">
                <img src={banner2} alt="banner" />
            </div>

            {/* 지역 4개 */}
            <div className="localSet">
                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">SEOUL</p>
                        <p className="localKorea">서울</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            setAreaCd("11");
                            setSelect("서울");
                        }}>
                        <img src={local1} alt="서울" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">GYEONGGI</p>
                        <p className="localKorea">경기</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            setAreaCd("41");
                            setSelect("경기");
                        }}>
                        <img src={local2} alt="경기" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">INCHEON</p>
                        <p className="localKorea">인천</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            setAreaCd("28");
                            setSelect("인천");
                        }}>
                        <img src={local3} alt="인천" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">GANGWON</p>
                        <p className="localKorea">강원</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            setAreaCd("51");
                            setSelect("강원");
                        }}>
                        <img src={local4} alt="강원" />
                    </div>
                </div>
            </div>

            {/* 지역 4개 */}
            <div className="localSet">
                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">CHUNCHEONG</p>
                        <p className="localKorea">충청</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            regionClick("충청도");
                        }}>
                        <img src={local5} alt="충청도" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">JEOLLA</p>
                        <p className="localKorea">전라</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            regionClick("전라도");
                        }}>

                        <img src={local6} alt="전라도" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">GYEONGSANG</p>
                        <p className="localKorea">경상</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            regionClick("경상도");
                        }}>
                        <img src={local7} alt="경상도" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">JEJU</p>
                        <p className="localKorea">제주</p>
                    </div>
                    <div className="localImg"
                        onClick={() => {
                            setAreaCd("50");
                            setSelect("제주");
                        }}>
                        <img src={local8} alt="제주" />
                    </div>
                </div>
            </div>


            <Modal
                className="mainModal"
                isOpen={isModalOpen} // 모달 열림 여부
                onClose={() => {
                    setIsModalOpen(false)
                    setAreaCd("")
                    setSignguNm("")
                    console.log(areaCd , signguNm)
                }} // 닫기 함수
                title={select} // 제목

                content={
                    signguNm && signguNm.length > 0 ? (
                        signguNm.map((item, index) => (
                            <button className="guBt"
                                key={index}
                                onClick={() => requestData(item)}
                            >{item}</button>
                        ))
                    ) :
                        subRegions.map((item, index) => (
                            <button className="guBt"
                                key={index}
                                onClick={() => {
                                    setSelect(item.name);
                                    setAreaCd(item.areaCd);
                                }}>{item.name}</button>
                        ))




                } // 내용 (데이터 기반 버튼 생성)
                actions={[
                    {
                        label: "닫기",
                        onClick: () => {
                            setIsModalOpen(false);
                            setAreaCd("");
                            setSignguNm("")
                        },
                        className: "close-button",

                    },
                ]} // 모달 하단 버튼들
            />
        </div>
    );
};

export default Maintest;
