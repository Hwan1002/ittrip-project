import axios from "axios";
import {API_BASE_URL} from './api-config'

export async function call(api,method,request){

    let headers=new Headers({
        "Content-Type":"application/json"
    })

    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if(accessToken && accessToken !== null){
        headers.append("Authorization","Bearer "+accessToken);
    }


    //기본 옵션 설정
    let option = {
        headers:headers,
        url : API_BASE_URL + api,
        method : method,
       
    }

    if(request){
        option.data=JSON.stringify(request);
    }
    return await axios(option)
    .then(response=>{
        return response.data;
    })
    .catch(error =>{
        console.log("http error");
        console.log(error.status);
        if(error.status===403){
            window.location.href="/login";
        }
    })
}

export function signin(userDTO){
    return call("/signin","POST",userDTO)
        .then((response)=>{
            console.log("response: " , response);
            if(response.token){ //null이 아니면 true
                localStorage.setItem("ACCESS_TOKEN",response.token);
                window.location.href="/";
            }
        })
} //signin end

//로그아웃
export function signout(){
    localStorage.setItem("ACCESS_TOKEN",null);
    window.location.href="/login"
}

//회원생성
export function signup(userDTO){
    return call("/signup","POST",userDTO)
}

export function socialLogin(provider){
    window.location.href=API_BASE_URL + "/auth/authorize/"+provider+"?redirect_url="+window.location.origin; 
}