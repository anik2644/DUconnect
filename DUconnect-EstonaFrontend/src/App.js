import '@fortawesome/fontawesome-free/css/all.css';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import BloodDonation from "./pages/Blood/BloodDonation"; // Import BloodDonation component
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import Article from "./pages/article/Article";
import Settings from "./pages/settings/Settings";
import Terms from "./pages/terms/Terms";
import Notification from "./pages/notification/Notification";
import Event from "./pages/event/event";
import Articledetail from "./pages/artticledetail/articledetail";
import EditProfilePage from './pages/editprofile/editprofile';
import Share from "./components/share/Share";
import posts from './components/posts/Posts';
import Anik from './pages/anik/anik';




function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login." />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/",
          element: <Profile />,
        },
        {
          path: "/blood-donation",
          element: <BloodDonation />,
        },
        {
          path: "/article",
          element: <Article />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/notification",
          element: <Notification />,
        },
        {
          path: "/event",
          element: <Event />,
        },

      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {

    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/readmore",
      element: <Articledetail />,
    },
    {


      path: "/editprofile",
      element: <EditProfilePage />,
    },
    {
      path: "/anik",
      element: <Anik/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
