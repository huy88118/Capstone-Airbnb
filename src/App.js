import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Loading from "./components/Loading/Loading";
import AuthLayoutout from "./layouts/AuthLayout/AuthLayout"
import ProtectedRoute from "./routes/ProtectedRoute"


const Booking = lazy(() => import("./modules/Booking/Booking.jsx"));
const Signin = lazy(() => import("./modules/Auth/Signin/Signin"));
const Signup = lazy(() => import("./modules/Auth/Signup/Signup"));
const Home = lazy(() => import("./modules/Home/Home"));
const RoomDetails = lazy(() => import("./modules/RoomDetails/RoomDetails"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/roomdetails/:maViTri" element={<RoomDetails />} />
            
          <Route
              path="/booking/:id"
              element={   
                <ProtectedRoute>
                   <Booking/>
                </ProtectedRoute>
              }
            />
          </Route>

          
          <Route path="/" element={<AuthLayoutout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
