import './App.css';
import SearchApp from './SearchApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/search' element={< SearchApp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
