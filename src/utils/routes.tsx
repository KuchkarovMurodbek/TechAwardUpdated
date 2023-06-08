import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/Activeposts";
import Users from "../pages/Users";
import NewPost from "../pages/Newposts";
import Cities from "../pages/Cities";
import PostId from "../pages/PostId";
import ActivePost from "../pages/Activeposts";
import ActivePostId from "../pages/ActivepostId";
import Category from "../pages/Category";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    index: true,
    errorElement: <ErrorPage />,
    element: <Login />,
  },
]);

export const privateRoutes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/newpost",
    element: <NewPost />,
  },
  { 
    path: "/newpost/:id", 
    element: <PostId /> 
  },
  {
    path: "/activepost",
    element: <ActivePost />,
  },
  {
    path: "/activepost/:id",
    element: <ActivePostId />,

  },
  {
    path: "/cities",

    element: <Cities />,
  },
  {
    path: "/category",

    element: <Category />,
  },
]);
