import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Questionare from './components/questionare/Questionare'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Test from './components/questionare/Test';

function App() {    
    return (
        <BrowserRouter>
            <Routes>                
                <Route index path='appsumo-integration/' element={<Questionare />} />
            </Routes>
        </BrowserRouter>
        )
}

export default App
