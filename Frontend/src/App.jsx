import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup.Jsx";
import { Provider } from "react-redux";
import appStore from "./Redux/Appstore";
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="signup" element={<Signup />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
