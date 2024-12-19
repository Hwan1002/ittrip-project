import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const MyPage =()=>{
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/profile.jpeg')}/>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>프로필 변경</Text>
                <Image style={{width:19,height:27,}} source={require('../../assets/update.png')}/>
            </Pressable>
            <Text style={styles.infoText}>
                아이디  |  asdf1234 {'\n'}
                비밀번호 |  **** {'\n'}
                이름 | 아이티 {'\n'}
                이메일 | asdf1234@naver.com {'\n'}
                주소 | 인천시 부평구 부평로 123번길 {'\n'}
            </Text>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>내정보 수정</Text>
                <Image style={{width:20,height:27,}} source={require('../../assets/update.png')}/>
            </Pressable>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        backgroundColor:'white',
        paddingBottom:50,
        paddingTop:40
    },

    image:{
        width:200,
        height:200,
        borderRadius:100
    },
    button:{
        width:150, 
        height:40, 
        backgroundColor:'#F6A354',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        marginTop:25,
        flexDirection:'row',
    },
    buttonText:{
        fontSize:17, 
        color:'#fff', 
        fontWeight:600,
        textAlign:"center",
        marginLeft:15,
        marginRight:11
    },
    infoText: {
        height:145,
        fontSize: 16,   // 텍스트 크기 조정
        marginTop:50,
        paddingHorizontal: 20, // 좌우 패딩 추가
        textAlign: 'center', // 텍스트 중앙 정렬
        flexWrap: 'wrap', // 텍스트가 넘칠 경우 자동으로 줄 바꿈
        textAlign: 'left',
        color:'#575756',
        lineHeight:30
    },
})
export default MyPage