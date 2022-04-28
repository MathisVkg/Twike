import './assets/Style/App.css';
import './assets/Style/Base.css'
import { Routes, Route } from "react-router-dom";
import Auth from './Component/Login/Auth';
import Home from './Component/Homepage/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}
