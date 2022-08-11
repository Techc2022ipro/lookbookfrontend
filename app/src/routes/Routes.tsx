import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../screens/Home/Home';
import App from '../App';
const Navigator = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={ <App />} />
        <Route path="/home" element={ <Home />} />
      </Routes>
    </div>
    </Router>
  );
}


export default Navigator;
