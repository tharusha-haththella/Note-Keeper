import Home from "./components/Home"
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
