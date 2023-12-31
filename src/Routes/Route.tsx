import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/Home/Home";
import SignUp from "../components/pages/SignUp/SignUp";
import SignIn from "../components/pages/SignIn/SignIn";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Notes from "../Layouts/Dashboard/Notes";
import AddNote from "../Layouts/Dashboard/AddNote";
import PrivateRoute from "./PrivateRoute";
import About from "../components/About/About";
import Feature from "../components/Features/Feature";
import SearchNote from "../Layouts/Dashboard/SearchNote";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
        {
          path:'/signin',
          element:<SignIn></SignIn>
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/features',
          element:<Feature></Feature>
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/dashboard',
          element:<PrivateRoute><Notes></Notes></PrivateRoute>
        },
        {
          path:'addNote',
          element:<PrivateRoute><AddNote></AddNote></PrivateRoute>
        },
        
        {
          path:'search',
          element:<SearchNote></SearchNote>
        }
      ]
    }
  ]);
  export default router;