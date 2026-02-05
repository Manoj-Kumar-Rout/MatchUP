import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup.Jsx";
import { Provider } from "react-redux";
import appStore from "./Redux/Appstore";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import Connections from "./Components/Connection";
import UserConnection from "./Components/UserConnections";
import ConnectionRequest from "./Components/ConnectionRequest";
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/userconnections" element={<UserConnection />} />
            <Route path="/requests" element={<ConnectionRequest />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
