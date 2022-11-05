import './App.css';
import {Route, Routes} from 'react-router-dom'
import LoanView from './routes/LoanView';
import LoanCalculate from './routes/LoanCalculate';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './components/Navbar';

import { AuthContextProvider } from './config/authConfig';

function App() {
  return (
    <div >
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/calculateloans' element={<LoanCalculate/>}/>
          <Route path='/viewloans' element={<LoanView/>}/>
        </Routes>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
