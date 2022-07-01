import './App.css';
import Table from './components/Table';
import {BrowserRouter, Routes,Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Table/>}/>
      </Routes>
      </BrowserRouter>

  );
}

export default App;
