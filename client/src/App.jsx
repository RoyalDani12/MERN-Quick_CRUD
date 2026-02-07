import React from "react"
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Adduser from "./pages/Adduser";
import Update from "./pages/Update";
function App() {

  return (
    <div >
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/adduser' element={<Adduser/>}/>
    <Route path="/update/:id" element={<Update/>}/>
  </Routes>
  </BrowserRouter>
      
    </div>
  );
}

export default App;