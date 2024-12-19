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



    const requestData = (item) => {

       const response = axios.get(`${API_BASE_URL}/123`, {
            params: { signguNm: item },
        })
        console.log(response) ;
    }



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
                    <div className="localImg">
                        <img src={local5} alt="충청도" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">JEOLLA</p>
                        <p className="localKorea">전라</p>
                    </div>
                    <div className="localImg">
                        <img src={local6} alt="전라도" />
                    </div>
                </div>

                <div className="localtrip">
                    <div className="localName">
                        <p className="localEnglish">GYEONGSANG</p>
                        <p className="localKorea">경상</p>
                    </div>
                    <div className="localImg">
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
                onClose={() => setIsModalOpen(false)} // 닫기 함수
                title={select} // 제목
                content={
                    signguNm && signguNm.length > 0 ? (
                        signguNm.map((item, index) => (
                            <button className="guBt"
                                key={index}
                                onClick={requestData(item)}
                            >{item}</button>
                        ))
                    ) : (
                        "데이터가 없습니다."
                    )
                } // 내용 (데이터 기반 버튼 생성)
                actions={[
                    {
                        label: "닫기",
                        onClick: () => setIsModalOpen(false),
                        className: "close-button",
                    },
                ]} // 모달 하단 버튼들
            />
        </div>
    );
};

export default Maintest;
