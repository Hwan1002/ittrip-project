import logo from './logo.svg';
import './App.css';
import Login from './screen/Login';
import EntirePlan from './screen/EntirePlan';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './screen/Main';
import Map from './components/Map';
import SignUp from './screen/SignUp';
import AddData from './components/AddData';
import AddRoot from './components/AddRoot';
import { ProjectProvider } from './context/ProjectContext';

import MyPage from './screen/MyPage';
import NewTrip from './screen/NewTrip'
import MainLocal from './components/MainLocal';


import SocialLogin from './components/SocialLogin';


function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
      <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/addData" element={<AddData/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/entireplan" element={<EntirePlan/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/test" element={<AddRoot/>}/>
          <Route path="/newtrip" element={<NewTrip/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/mainlocal" element={<MainLocal/>}/>
          <Route path="/socialLogin" element={<SocialLogin/>}/>
        </Routes>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
