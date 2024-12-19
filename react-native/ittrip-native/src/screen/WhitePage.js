import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const WhitePage = ({ route , navigation}) => {
    const { select } = route.params; 

    const [content,setContent] = useState({});

    //임시데이터
    const guData =['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구']
    
    useEffect(() => {
        const contentEvent = () => {
            switch (select) {
                case "서울":
                    setContent({img:require('../../assets/main/local1.png'),english:"SEOUL",explan:"서울은 현대적이고 전통적인 매력을 모두 갖춘 도시로, 고궁과 전통 시장, 쇼핑과 음식이 풍성한 명소, 북촌 한옥마을, 경복궁, 남산타워 등 다양한 명소가 방문객을 맞이합니다."});
                    break;
                case "경기":
                    setContent({img:require('../../assets/main/local2.png'),english:"GYEONGGI",explan:"경기도는 아름다운 자연과 풍성한 문화유산을 자랑하는 여행지로, 서울 근교에서 쉽게 접근할 수 있습니다. 인기 있는 명소로는 수원 화성, 가평의 북한강, 파주의 DMZ가 있습니다."});
                    break;
                case "인천":
                    setContent({img:require('../../assets/main/local3.png'),english:"INCHEON",explan:"인천은 아름다운 바다와 다양한 문화가 어우러진 도시로, 차이나타운과 송도 국제도시가 유명합니다. 또한, 인천공항을 중심으로 편리한 교통과 풍성한 쇼핑, 맛집도 즐길 수 있는 여행지입니다."});
                    break;
                case "강원":
                    setContent({img:require('../../assets/main/local4.png'),english:"GANGWON",explan:"강원도는 청정 자연과 아름다운 산과 바다가 어우러진 곳으로, 설악산과 동해의 해변이 유명합니다. 하이킹, 스키, 해양 스포츠 등 다양한 활동을 즐기며 자연의 매력을 만끽할 수 있는 여행지입니다."});
                    break;
                case "충청":
                    setContent({img:require('../../assets/main/local5.png'),english:"CHUNCHEONG",explan:"충청도는 고즈넉한 전통과 자연의 아름다움이 어우러진 지역으로, 공주와 부여의 역사 유적지와 청풍호수의 경치가 유명합니다. 또한, 맛있는 음식과 다양한 축제들이 있어 여행객들에게 풍성한 경험을 제공합니다."});
                    break;
                case "전라":
                    setContent({img:require('../../assets/main/local6.png'),english:"JEOLLA",explan:"전라도는 풍부한 역사와 문화유산을 자랑하는 지역으로, 전주 한옥마을과 광주 문화가 유명합니다. 또한, 맛있는 음식과 아름다운 자연 경관, 특히 남해안의 섬들이 매력적인 여행지입니다."});
                    break;
                case "경상":
                    setContent({img:require('../../assets/main/local7.png'),english:"GYEONGSANG",explan:"경상도는 풍부한 역사와 자연을 자랑하는 지역으로, 부산의 해변과 경주의 고대 유적이 매력적입니다. 전통적인 문화와 맛있는 음식도 함께 즐길 수 있어 여행하기 좋은 곳입니다."});
                    break;
                case "제주":
                    setContent({img:require('../../assets/main/local8.png'),english:"JEJU",explan:"제주도는 아름다운 자연경관과 독특한 문화가 어우러진 섬으로, 한라산과 해변, 오름을 탐험할 수 있습니다. 신선한 해산물과 전통적인 음식도 즐기며 휴식을 취하기 좋은 여행지입니다."});
                    break;
                default:
                    setContent(""); // select가 비어 있을 경우 content 초기화
            }
        };
        contentEvent(); // `select` 값이 변경될 때마다 `contentEvent` 실행
    }, [select]); // `select`가 변경될 때마다 실행

    
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleKorea}>{select}</Text>
                <Text style={styles.titleEnglish}>{content.english}</Text>
                <Text style={styles.explan}>{content.explan}</Text>
                <Image style={styles.image} source={content.img}/>
                <Text style={styles.askSelect}>여행할 곳을 선택해 주세요</Text>
                <View style={styles.localBtFrame}> 
                    {guData.map((gu,index)=>(<TouchableOpacity style={styles.localBt} key={index}><Text style={styles.localBtText}>{gu}</Text></TouchableOpacity>))}
                </View>
                <View style={styles.pageBtFrame}>
                    <TouchableOpacity style={styles.newPlan} onPress={()=>{navigation.navigate('일정만들기')}}><Text style={styles.pageText}>일정만들기</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.goBack} onPress={()=>{navigation.navigate('main')}}><Text style={styles.pageText}>돌아가기</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1, alignItems:'center',
        backgroundColor:'#fff'
    },
    titleKorea:{
        fontSize:33,
        fontWeight:600,
        marginTop:20,
        color:'#575756'
    },
    titleEnglish:{
        fontSize:18, 
        marginBottom:5,
        color:'#9D9D9C'
    },
    explan:{
        margin:20,
        lineHeight:27,
        color:'#575756'
    },
    image:{width:"100%",height:250, marginVertical:11},
    askSelect:{color:'#F6A354',fontWeight:600, marginBottom:10, marginTop:20},
    localBtFrame:{
        flexDirection:'row',
        flexWrap: 'wrap', 
        height:"auto", 
        justifyContent:'center', 
        alignItems:'center',
        padding:10,
        marginHorizontal:20,
        borderColor:'#F6A354',
        borderWidth:2,
        borderRadius:10
    },
    localBt:{margin:6},
    localBtText:{
        color:'#575756',
        fontWeight:600
    },
    pageBtFrame:{
        flexDirection:'row',
        justifyContent: 'space-between',
        padding: 10,
        margin:20
    },
    newPlan:{
        width:100,
        height:34,
        backgroundColor:'#F6A354',
        borderRadius:17,
        justifyContent:'center',
        marginHorizontal:5
    },
    goBack:{
        width:100,
        height:34,
        backgroundColor:'#878787',
        borderRadius:17,
        justifyContent:'center',
        marginHorizontal:5
    },
    pageText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:600
    }
})

export default WhitePage;

