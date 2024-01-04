import './App.css';
import Appdata from './Appdata';
import Home from './Home';
import SearchApp from './SearchApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/search' element={< SearchApp />}></Route>
          <Route exact path='/appdata' element={< Appdata />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
