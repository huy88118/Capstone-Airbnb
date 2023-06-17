import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import NotFound from "../components/NotFound";
import Access from "../modules/Access/Access";
import Protected from "./Protected";



const Auth = lazy(() =>import("../modules/Auth"));
const Login = lazy(() =>import("../modules/Auth/Login"));
const Register = lazy(() =>import("../modules/Auth/Register"));
const RootAdmin = lazy(() =>import("../modules/RootAdmin"));
const AddBookingRoom = lazy(() =>import("../modules/RootAdmin/Home/BookingRoomManagement/AddBookingRoom/AddBookingRoom"));
const BookedRoom = lazy(() =>import("../modules/RootAdmin/Home/BookingRoomManagement/BookingRoom"));
const AddComment = lazy(() =>import("../modules/RootAdmin/Home/CommentManagement/AddComment"));
const Comments = lazy(() =>import("../modules/RootAdmin/Home/CommentManagement/Comments"));
const Home = lazy(() =>import("../modules/RootAdmin/Home"));
const AddLocation = lazy(() =>import("../modules/RootAdmin/Home/LocationManagement/AddLocation"));
const Locations = lazy(() =>import("../modules/RootAdmin/Home/LocationManagement/Locations"));
const AddRoom = lazy(() =>import("../modules/RootAdmin/Home/RoomManagement/AddRoom"));
const Rooms = lazy(() =>import("../modules/RootAdmin/Home/RoomManagement/Room"));
const AddUser = lazy(() =>import("../modules/RootAdmin/Home/UserManagement/AddUser"));
const UserId = lazy(() =>import("../modules/RootAdmin/Home/UserManagement/IdUser"));
const Users = lazy(() =>import("../modules/RootAdmin/Home/UserManagement/User"));



const routes = createBrowserRouter([
  // Access
  { path: "/", element: <Access />},

  // Auth
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Admin
  {
    path: "/admin",
    element: (
      <Protected>
        <RootAdmin />
      </Protected>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/admin", element: <Home /> },

      // User
      { path: "/admin/users", element: <Users /> },
      { path: "/admin/addUser", element: <AddUser /> },
      { path: "/admin/users/:id", element: <UserId /> },

      // Room
      { path: "/admin/rooms", element: <Rooms /> },
      { path: "/admin/addRoom", element: <AddRoom /> },

      // Booking
      { path: "/admin/bookedRoom", element: <BookedRoom /> },
      { path: "/admin/bookingRoom", element: <AddBookingRoom /> },

      // Comment
      { path: "/admin/comments", element: <Comments /> },
      { path: "/admin/addComment", element: <AddComment /> },

      // Location
      { path: "/admin/locations", element: <Locations /> },
      { path: "/admin/addLocation", element: <AddLocation /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;