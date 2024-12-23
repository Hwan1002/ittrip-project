import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Main = ({ navigation }) => {

    const [select, setSelect] = useState(''); // 어떤 지역을 선택했는지 알려주는 state

    useEffect(() => {
        if (select) {
            navigation.navigate('WhitePage', { select: select });
        }
    }, [select, navigation]); // select가 변경될 때마다 실행

    return (
        <ScrollView style={{ flex: 1 }}>
        <View>
            <Image
            source={require('../../assets/main/banner2.jpg')}
            style={{ width: "100%", height: 280 }}
            />

            {/* 지역 첫줄 */}
            <View style={styles.local1Line}>
            <View style={styles.local1}>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>SEOUL</Text>
                <Text style={styles.titleKorea}>서울</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('서울')
                }}>
                <Image source={require('../../assets/main/local1.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>GYEONGGI</Text>
                <Text style={styles.titleKorea}>경기</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('경기')
                }}>
                <Image source={require('../../assets/main/local2.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>
            </View>

            {/* 지역 두번째줄 */}
            <View style={styles.local1Line}>
            <View style={styles.local1}>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>INCHEON</Text>
                <Text style={styles.titleKorea}>인천</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('인천')
                }}>
                <Image source={require('../../assets/main/local3.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>GANGWON</Text>
                <Text style={styles.titleKorea}>강원</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('강원')
                }}>
                <Image source={require('../../assets/main/local4.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>
            </View>

                    {/* 지역 세번째줄 */}
                    <View style={styles.local1Line}>
            <View style={styles.local1}>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>CHUNCHEONG</Text>
                <Text style={styles.titleKorea}>충청</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('충청')
                }}>
                <Image source={require('../../assets/main/local5.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>JEOLLA</Text>
                <Text style={styles.titleKorea}>전라</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('전라')
                }}>
                <Image source={require('../../assets/main/local6.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>
            </View>

                    {/* 지역 네번째줄 */}
                    <View style={styles.local1Line}>
            <View style={styles.local1}>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>GYEONGSANG</Text>
                <Text style={styles.titleKorea}>경상</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('경상')
                }}>
                <Image source={require('../../assets/main/local3.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.titleFrame}>
                <Text style={styles.titleEnglish}>JEJU</Text>
                <Text style={styles.titleKorea}>제주</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setSelect('제주')
                }}>
                <Image source={require('../../assets/main/local4.png')} style={styles.localImage} />
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    local1Line: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    local1: {
        marginRight: 25,
    },
    titleFrame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    titleEnglish: {
        fontSize: 18,
        marginRight: 5,
        color: '#575756',
    },
    titleKorea: {
        fontSize: 17,
        color: '#9D9D9C',
    },
    localImage: {
        width: 150,
        height: 150,
        borderRadius: 5,
        zIndex:1000
    },
});

export default Main;