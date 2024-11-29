//css
import '../css/SignUp.css';
import '../css/Reset.css';
//component
import Logo from "../components/Logo";
//react import
import React,{useState, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {

    //userState 
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userPwdConfirm, setUserPwdConfirm] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [error, setError] = useState(null);


    //config
    const config = {
        headers: {
            'Content-Type': 'application/json', // JSON 형식
        },
    };
    //useNavigate
    const navigate = useNavigate();

    const userInfo = {
        "userId" : userId,
        "password" : userPwd,
        "userName" : userName,
        "email" : email,
        "address" : address,
    }

    //useRef
    const inputUserId = useRef();
    const inputImg = useRef(null);

    //중복 아이디 체크
    const idCheck = async(userId) => {
        const id = inputUserId.current.value;
        try {
            if(userId === ''){
                alert("아이디를 입력하세요.")
            }else{
                const response = await axios.post('http://localhost:9090/check',{userId :id})
            if(response.data){
                alert("중복된 아이디 입니다.");
            }else{
                alert("사용 가능한 아이디 입니다.");
            }
            }
        } catch (error) {
            if(error.response){
                const { message, status } = error.response.data;
                console.error(`서버측에서 에러던진 내용 (${status}): ${message}`);
                alert(`중복체크 Error: ${message}`);
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred.');
            }
        }
    }
    
    //프로필 이미지 업로드
    const ImageUpload = (e) => {
        setProfileImg(inputImg.current?.click());
    }

   
    // 회원가입 버튼
    const signUp = async() => {
        try {
            const response = await axios.post('http://localhost:9090/signup',userInfo,config);
            console.log(userInfo);
            console.log('서버 응답:', response.data);
            alert("회원가입 완료");
            navigate("/login");

        } catch (error) {
            if(error.response){
                const { message, status } = error.response.data;
                console.error(`서버측에서 에러던진 내용 (${status}): ${message}`);
                alert(`회원가입 Error: ${message}`);
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred.');
            }
        }
    };

    return(
        <div className="signUp">
            <div className="logoImg">
                <Logo/>
            </div>
                <div className="signUp_container container">
                    <div className="signUp_contents">
                        <h2 className="title">회원가입</h2>
                        <button
                            onClick={() => {
                                ImageUpload();
                            }}
                        >
                            프로필 사진
                        </button>
                        {/* <input className='profilePhoto' type="file" accept="image/*" onChange={ImageUpload} ref={inputImg}/> */}
                        <div className='signUp_id'>
                            <input ref={inputUserId} type="text" placeholder='아이디를 입력하세요.' onChange={(e)=>{setUserId(e.target.value)}} value={userId}/>
                            <button onClick={()=> idCheck(userId)}>중복체크</button>
                        </div>
                        <div>
                            <input type="password" placeholder='비밀번호를 입력하세요.' onChange={(e)=>{setUserPwd(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="password" placeholder='비밀번호 확인.' onChange={(e)=>{setUserPwdConfirm(e.target.value)}} />
                        </div>
                        <div>
                            <input type="text" placeholder='이름을 입력하세요.' onChange={(e) => {setUserName(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="email" placeholder='이메일을 입력하세요' onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="text" placeholder='주소를 입력하세요' onChange={(e)=>{setAddress(e.target.value)}} />
                        </div>
                        {/* <input type="date" onChange={handleBirthChange} value={birth}/> */}
                        <div className="sigUp_Btns">
                            <button className="sigupBtn" type="submit" onClick={signUp}>회원가입</button>
                            <button className="backByn" type="submit" onClick={()=>navigate("/")}>돌아가기</button>
                        </div>
                    </div>
                </div>
        </div>
       
    )
}

export default SignUp;