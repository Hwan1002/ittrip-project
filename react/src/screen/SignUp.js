//css
import '../css/SignUp.css';
import '../css/Reset.css';
//component
import Logo from "../components/Logo";
//react import
import React,{useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../service/api-config';

const SignUp = () => {

    let config =new Headers({
        "Content-Type":"application/json"
    })

    //useState
    
    //input 값 상태 관리
    const [formData, setFormData] = useState({
        id : '',
        password : '',
        userName : '',
        email : '',
        address : '',
        profilePhoto : '',
    })
    //비밀번호 확인 상태만 따로 관리 (용도 : 입력한 비밀번호와 비교 용도)
    const [userPwdConfirm, setUserPwdConfirm] = useState('');

    //프로필 이미지 미리보기 상태값
    const[ imagePreview, setImagePreview] = useState(null);
    
    //useRef
    const inputImgRef = useRef(null);

    //useNavigate
    const navigate = useNavigate();

    //config
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json', // JSON 형식
    //     },
    // };

    //state handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleProfileClick = () => {
        // 버튼 클릭 시 숨겨진 input 요소 클릭
        // 버튼 스타일을 위해서 적용
        if (inputImgRef.current) {
            inputImgRef.current.click();
        }
    };
    //handleProfileClick 함수가 실행되면 자동 클릭되어 실행됌
    const ImageUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0]; // 업로드된 파일 가져오기
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: file.name, // 파일 저장 임시로 이름만 저장
            }));
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);// 파일 미리보기 URL 저장
            };
            reader.readAsDataURL(file);
        }
    }

    //중복 아이디 체크
    const idCheck = async() => {
        
        try {
            if(formData.id === '') {
                alert("아이디를 입력하세요.")
            }else{
                const response = await axios.post(`${API_BASE_URL}/check`,{"id" : formData.id})
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
                alert(`중복 체크 함수 Error 상태 ${status}: ${message}`);
            } else {
                console.error('Unexpected error:', error);
                alert('중복 체크 함수 쪽 에러남 스프링 연결 확인');
            }
        }
    }

   
    // 회원가입 버튼
    const signUp = async(e) => {
        e.preventDefault();
        
        //formData에서 빈값 체크
        const emptyValue = Object.keys(formData).find((key) => {
            const value = formData[key];
            return  typeof value === 'string' && value.trim() === '';
        });

        if(emptyValue){
            alert("빈값이 존재합니다. 확인 후 다시 시도하세요.");
            return;
        }else if(userPwdConfirm === ''){
            alert("비밀번호 확인란을 입력해 주세요.")
        }else if(formData.password !== userPwdConfirm){
            alert("비밀번호가 일치하지 않습니다.")
        }else if(!formData.profilePhoto){
            alert("프로필 사진을 설정해주세요.")
        }else{
            debugger;
            try{  
                console.log(formData);
                const response = await axios.post(`${API_BASE_URL}/signup`,formData,config);
                console.log(response.data.data);
                if(response.status === 200){
                    alert("회원가입 완료");
                    navigate("/login");
                }
            } catch (error) {
                if(error.response){
                    const { message, status } = error.response.data;
                    alert(`회원가입 Error 상태 ${status} : ${message}`);
                } else {
                    alert('회원가입 함수 쪽 에러남 스프링 연결 확인.');
                }
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
                    <form className='sigup_formData' onSubmit={(e) => signUp(e)}>
                        <div className='profilePhoto'>
                            {imagePreview !== null? (
                                <div className='photoImg'>
                                    <img src={imagePreview} alt="preview"/>
                                </div>    
                            ) : ''}
                            <button type="button" onClick={handleProfileClick}>프로필 사진</button>
                            <input name="profilePhoto" type="file" accept="image/*" ref={inputImgRef} onChange={ImageUpload}/>
                        </div>
                        <div className='signUp_id'>
                            <input name="id" type="text" placeholder='아이디를 입력하세요.' onChange={handleInputChange} value={formData.id}/>
                            <button type="button" onClick={idCheck}>중복체크</button>
                        </div>
                        <div>
                            <input name="password" type="password" placeholder='비밀번호를 입력하세요.' onChange={handleInputChange} value={formData.password}/>
                        </div>
                        <div>
                            <input type="password" placeholder='비밀번호 확인.' onChange={(e)=>setUserPwdConfirm(e.target.value)}/>
                        </div>
                        <div>
                            <input name="userName" type="text" placeholder='이름을 입력하세요.' onChange={handleInputChange} value={formData.userName}/>
                        </div>
                        <div>
                            <input name="email" type="email" placeholder='이메일을 입력하세요' onChange={handleInputChange} value={formData.email}/>
                        </div>
                        <div>
                            <input name="address" type="text" placeholder='주소를 입력하세요' onChange={handleInputChange} value={formData.address}/>
                        </div>
                        <div className="sigUp_Btns">
                            <button className="sigupBtn" type="submit">회원가입</button>
                            <button className="backByn" type="button" onClick={()=>navigate("/")}>돌아가기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignUp;