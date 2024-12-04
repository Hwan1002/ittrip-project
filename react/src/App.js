import Login from './screen/Login';
import EntirePlan from './components/EntirePlan';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './screen/Main';
import Map from './components/Map';
import SignUp from './screen/SignUp'
import { ProjectProvider } from './context/ProjectContext';
import MyPage from './components/MyPage';
import NewTrip from './screen/NewTrip';
import SocialLogin from './components/SocialLogin';

function App() {
  return (
    <BrowserRouter>
    <ProjectProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/entireplan" element={<EntirePlan/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/newtrip" element={<NewTrip/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/socialLogin" element={<SocialLogin/>}/>
        </Routes>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
