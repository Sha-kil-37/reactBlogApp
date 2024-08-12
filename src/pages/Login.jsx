import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [email, setemail] = useState("");
  const [ password, setpassword ] = useState( "" );
  const navigate = useNavigate();
  // 
  const handleloginemail = (e) => {
    setemail( e.target.value )
  };
  // 
  const handleloginpassword = (e) => {
    setpassword( e.target.value )
  };

  //
  const handlelogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then( ( userCredential ) =>
      {
        navigate('/')
        // Signed in
        // console.log("signin succes");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  //
  return (
    <div className="container mx-auto">
      <div className="text-center py-4 bg-slate-400">
        <h1 className="mb-5">this is login page</h1>
        <form onSubmit={handlelogin}>
          <div>
            <input
              onChange={handleloginemail}
              className="mt-3 px-2 py-2"
              type="email"
              placeholder="inter your email"
            />
          </div>
          <div>
            <input
              onChange={handleloginpassword}
              className="mt-3 px-2 py-2"
              type="password"
              placeholder="inter your password"
            />
            <p className="mt-2 text-red-700"></p>
          </div>
          <button className="px-2 py-2 mt-3 bg-blue-600 text-blue-50">
            login
          </button>
          <Link
            to={"/registration"}
            className="ml-5 text-pink-300 cursor-pointer"
          >
            are you new ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
