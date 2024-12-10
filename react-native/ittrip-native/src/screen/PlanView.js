import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const PlanView =()=>{
    return(
        <ScrollView>
            <View style={styles.container}> 

                {/* 버튼 */}
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>새로운 여행 추가</Text>
                    <Image style={styles.icon} source={require('../../assets/plus2.png')}/>
                </Pressable>

                <Text style={styles.title}>여행 목록</Text>
                <View style={styles.tripList}></View>

                <Text style={styles.title}>여행 경로</Text>
                <View style={styles.map}></View>
                <View style={styles.tripList}></View>

                <Text style={styles.title}>체크리스트</Text>
                <View style={styles.tripList}></View>
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

    title:{
        fontSize:18,
        color:'#F6A354',
        fontWeight:600, 
        margin:15,
    },
    tripList:{
        width:'100%',
        height:300, 
        borderTopWidth: 2,  // 위쪽 border
        borderBottomWidth: 2,  // 아래쪽 border
        borderColor: "#DADADA",  // 테두리 색상
        marginBottom:18
    },
    map:{
        width:'100%',
        height:430, 
        backgroundColor:'#DADADA',
        marginBottom:18
    },
    
})

export default PlanView