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
        }
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/dashboard',
          element:<Notes></Notes>
        }
      ]
    }
  ]);
  export default router;