import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// 화면 컴포넌트들
import Main from './screen/Main'; // Main 화면
import WhitePage from './screen/WhitePage'; // WhitePage 화면
import NewPlan from './screen/NewPlan';
import PlanView from './screen/PlanView';
import MyPage from './screen/MyPage';

// Tab Navigator 설정
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// AppStack 정의 - Main과 WhitePage 화면을 StackNavigator로 관리
function AppStack() {
  return (
        
    <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="WhitePage" component={WhitePage} />
      
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator 설정
const App = () => {
    


  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="메인"
        screenOptions={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image style={styles.image} source={require('../assets/logo.png')} />
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      >
        {/* Tab에서 AppStack을 사용하여 화면 이동 */}
        <Tab.Screen 
          name="메인" 
          component={AppStack} 
          options={{
            tabBarIcon:({focused})=>(<Image source={focused ? require('../assets/navi_icon/homeClick.png'):require('../assets/navi_icon/home.png')} style={{width:20, height:20}}/>),
            tabBarActiveTintColor:'#F6A356',
            tabBarInactiveTintColor:'#878787'
          }}
        />
        <Tab.Screen 
          name="일정만들기" 
          component={NewPlan}
          options={{
            tabBarIcon:({focused})=>(<Image source={focused ? require('../assets/navi_icon/plusClick.png'):require('../assets/navi_icon/plus.png')} style={{width:22, height:22}}/>),
            tabBarActiveTintColor:'#F6A356',
            tabBarInactiveTintColor:'#878787',
          }}
        />
        <Tab.Screen 
          name="일정보기" 
          component={PlanView} 
          options={{
            tabBarIcon:({focused})=>(<Image source={focused ? require('../assets/navi_icon/planClick.png'):require('../assets/navi_icon/plan.png')} style={{width:17, height:22}}/>),
            tabBarActiveTintColor:'#F6A356',
            tabBarInactiveTintColor:'#878787'
          }}
        />
        <Tab.Screen 
          name="마이페이지" 
          component={MyPage} 
          options={{
            tabBarIcon:({focused})=>(<Image source={focused ? require('../assets/navi_icon/myClick.png'):require('../assets/navi_icon/my.png')} style={{width:23, height:20}}/>),
            tabBarActiveTintColor:'#F6A356',
            tabBarInactiveTintColor:'#878787'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 90, height: 40, resizeMode: 'contain' },
});

export default App;