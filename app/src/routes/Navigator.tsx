import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../screens/Home/Home';

const Navigator = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/home" element={ <Home />} />
      </Routes>
    </div>
    </Router>
  );
}


export default Navigator;
