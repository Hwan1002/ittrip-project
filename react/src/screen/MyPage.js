import React from "react";
import '../css/MyPage.css'

const MyPage = () => {
    return (
        <div className="container">
            <div id="myPage">
                <div id="profileFrame">
                    <div></div>
                    <button>프로필 변경</button>
                </div>

                <div id="myInfoFrame">
                    <button>내정보 수정</button>
                    <div id="myInfo">
                        <p>아이디  |  asdf1234</p>
                        <p>비밀번호 |  ****</p>
                        <p>이름 | 아이티</p>
                        <p>이메일 | asdf1234@naver.com</p>
                        <p>주소 | 인천시 부평구 부평로 123번길</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MyPage;