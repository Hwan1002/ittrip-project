import React from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";


const NewPlan =()=>{
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>새로운 여행하기</Text>
                <TextInput style={styles.input} placeholder="여행제목을 입력해주세요" placeholderTextColor="#706F6F"/>
                <TextInput style={styles.input} placeholder="여행지역을 입력해주세요" placeholderTextColor="#706F6F"/>
                <TextInput style={styles.input} placeholder="몇 일 계획인가요?(숫자입력)" placeholderTextColor="#706F6F"/>
                <Text style={styles.detailTitle}>경로 설정</Text>
                <View style={styles.map}></View>
                <Text style={styles.detailTitle}>체크리스트</Text>
                <View style={styles.checkList}></View>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>새로운 여행 추가</Text>
                    <Image style={styles.icon} source={require('../../assets/plus2.png')}/>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:1, 
        alignItems:'center',
        backgroundColor:'white',
        paddingBottom:50
    },

    title:{
        color:'#F6A354', 
        fontSize:20, 
        fontWeight:600, 
        textAlign:'center',
        padding:10
    },

    input:{
        
        width:300, 
        height:50, 
        borderWidth:2, 
        borderRadius:25, 
        borderColor:'#DADADA', 
        textAlign:'center', 
        fontSize: 15, 
        marginVertical: 15,
        padding:5,
        backgroundColor:'white'
    },
    
    detailTitle:{
        fontSize:18,
        color:'#706F6F',
        fontWeight:600, 
        margin:15
    },

    map:{
        width:'100%',
        height:430, 
        backgroundColor:'#DADADA',
        marginBottom:18
    },
    checkList:{
        width:'100%',
        height:300, 
        borderTopWidth: 2,  // 위쪽 border
        borderBottomWidth: 2,  // 아래쪽 border
        borderColor: "#DADADA",  // 테두리 색상
        marginBottom:18
    },
    button:{
        width:300, 
        height:50, 
        backgroundColor:'#F6A354',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        marginVertical:20,
        flexDirection:'row'
    },
    buttonText:{
        fontSize:20, 
        color:'#fff', 
        fontWeight:600,
        textAlign:"center",
        marginLeft:60
    },
    
    icon: {
        marginLeft: 10, // 텍스트와 아이콘 사이에 간격 추가
        width: 28, // 아이콘 크기 조정
        height: 28, // 아이콘 크기 조정
        marginLeft:45
    },
    
})


export default NewPlan