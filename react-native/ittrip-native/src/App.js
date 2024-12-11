
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
                        <Image source={require('./img/logo.png')} style={{width:50}}/>
                )}}
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

})

export default App;