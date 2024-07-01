import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import FooterComp from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import AllBooks from "./components/Books/AllBooks";
import BookItem from "./components/Books/BookItem";
import About from "./views/About";
import CreatePost from "./views/Post";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/post-book" element={<CreatePost />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users/profile" element={<Profile />} />
        </Route>
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:book_id" element={<BookItem />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App;
