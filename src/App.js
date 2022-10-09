import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserLayout from "./components/user/UserLayout";
import Movies from "./components/Movies";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/admin/AdminLayout";
import Users from "./components/Users";
import EditUser from "./components/user/EditUser";
import GetUser from "./components/user/GetUser";
import MoviesList from "./components/admin/MoviesList";
import AddMovie from "./components/admin/AddMovie";
import EditMovie from "./components/admin/EditMovie";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="/user/movies" element={<Movies />}></Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/" element={<Users />}></Route>
          <Route path="/admin/:id" element={<GetUser />}></Route>
          <Route path="/admin/edit/:id" element={<EditUser />}></Route>
          <Route path="/admin/movies" element={<MoviesList />}></Route>
          <Route path="/admin/movie/add" element ={<AddMovie />}></Route>
          <Route path="/admin/movie/update/:id" element={<EditMovie />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </div>
  );
}

export default App;
