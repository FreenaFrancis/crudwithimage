import './App.css';
import UserForm from './components/Form';
import UserTable from './components/View';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<UserForm/>}/>
    <Route path='/view' element={<UserTable/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
