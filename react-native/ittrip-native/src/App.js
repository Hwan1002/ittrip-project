
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Main from './screen/Main.js'
import NewPlan from './screen/NewPlan.js'
import PlanView from './screen/PlanView.js'
import MyPage from './screen/MyPage.js'

const Tab = createBottomTabNavigator()


const App = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='main'
                screenOptions={{
                    headerTitle:()=>(
                        <View style={styles.headerContainer}>
                            <Image style={styles.image} source={require('../assets/logo.png')}/>
                        </View>
                    ),
                    headerTitleAlign:'center'
                }}

            >
                <Tab.Screen name='main' component={Main} />
                <Tab.Screen name='newPlan' component={NewPlan} />
                <Tab.Screen name="planView" component={PlanView} />
                <Tab.Screen name="myPage" component={MyPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerContainer:{flex:1, justifyContent:'center', alignItems:'center'},
    image:{width:90, height:40, resizeMode:'contain'}
})

export default App;