import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Trans from "./pages/Transaction/Trans";
import Userlogin from "./pages/user/Userlogin";
import UserReg from "./pages/user/UserReg";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<Userlogin />}></Route>
        <Route path="/userreg" element={<UserReg />}></Route>
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:_id" element={<Hotel />} />
        <Route path="/usertrans" element={<Trans></Trans>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
