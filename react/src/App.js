import logo from './logo.svg';
import './App.css';
import Login from './screen/Login';
import EntirePlan from './screen/EntirePlan';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './screen/Main';
import Map from './components/Map';
import SignUp from './screen/SignUp';
import NewTrip from './screen/NewTrip';
import AddData from './components/AddData';


function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/addData" element={<AddData/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/entireplan" element={<EntirePlan/>}/>
          <Route path="/newtrip" element={<NewTrip/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
