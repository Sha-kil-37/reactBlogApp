import { Route, Routes } from "react-router-dom";
import Menubar from "./pages/Menubar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { auth } from "./pages/firebase";
import About from "./pages/About";
import Blog from "./pages/Blog";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Error from "./pages/Error";
import Details from "./pages/Details";
//
const App = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
      return () => unsubcribe();
    }, []);
  });
  //
  const handelsignout = () => {
    signOut(auth)
      .then(() => {
        setuser(null);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  //
  //
  return (
    <>
      <Menubar user={user} signout={handelsignout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/blog"
          element={
            user ? (
              <Blog user={user} />
            ) : (
              <Navigate to={"/login"} replace={true} />
            )
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/update/:up" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
