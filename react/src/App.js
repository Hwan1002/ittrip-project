import Login from './screen/Login';
import EntirePlan from './components/EntirePlan';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './screen/Main';
import Map from './components/Map';
import SignUp from './screen/SignUp'


function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/entireplan" element={<EntirePlan/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
