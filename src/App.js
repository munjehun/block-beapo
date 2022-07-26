import "./App.css";
import Main from "./pages/Main";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupChoice from "./pages/SignupChoice";
import SignupPainter from "./pages/SignupPainter";
import SignupUser from "./pages/SignupUser";
import Workregister from "./pages/Workregister";
import Mypage1 from "./pages/Mypage1";
import Mypage2 from "./pages/Mypage2";
import DetailPainter from "./pages/DetailPainter";
import DetailUser from "./pages/DetailUser";
import OfflineContract_Painter from "./pages/OfflineContract_Painter";
import ContractReservation from "./pages/ContractReservation";
import NFT_Success from "./pages/NFT_Success";
import OfflineContract_User from "./pages/OfflineContract_User";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupChoice" element={<SignupChoice />} />
        <Route path="/signupPainter" element={<SignupPainter />} />
        <Route path="/signupUser" element={<SignupUser />} />
        <Route path="/detailPainter/:id" element={<DetailPainter />} />
        <Route path="/detailUser/:id" element={<DetailUser />} />
        <Route path="/NFT_Success" element={<NFT_Success />} />

        {/* 작가 계약 예약 취소 페이지 */}
        <Route
          path="/contractReservation/:id/:trade_user_id"
          element={<ContractReservation />}
        />

        {/* 작품 등록 페이지 */}
        <Route path="/workregister" element={<Workregister />} />

        {/* 작가 마이페이지 */}
        <Route path="/mypage1" element={<Mypage1 />} />

        {/* 일반 유저 마이페이지 */}
        <Route path="/mypage2" element={<Mypage2 />} />

        <Route
          path="/offlineContract_painter/:id/:trade_user_id"
          element={<OfflineContract_Painter />}
        />

        {/* 일반 유저 계약 페이지 */}
        <Route
          path="/offlineContract_user/:id/:trade_user_id"
          element={<OfflineContract_User />}
        />

        {/*<Route path="/usercontract" element={<ContractUser/>} />*/}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
