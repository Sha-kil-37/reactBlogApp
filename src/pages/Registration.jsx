import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 
const Registration = () => {
  const [username, setusername] = useState("");
  const [nameerror, seterror] = useState("");
  const [email, setemail] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [password, setpassword] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
 
  const navigate = useNavigate();
  //
  const register = async (e) => {
    e.preventDefault();
    if (username === "") {
      seterror("inter your name");
    } else if (email === "") {
      setemailerror("inter your email");
    } else if (password === "") {
      seterrorpassword("inter your password");
    } else {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        //
        await updateProfile(user, { displayName: username });
      } catch (error) {
        const errorCode = error.code;
        // console.log(errorCode);
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  //
  const handelusername = (e) => {
    setusername(e.target.value);
  };
  //
  const handeluseremail = (e) => {
    setemail(e.target.value);
  };
  //
  const handeluserpassword = (e) => {
    setpassword(e.target.value);
  };
  //
  return (
    <div className="container mx-auto">
      <div className="text-center py-4 bg-red-200">
        <h1 className="mb-5">this is registation page</h1>
        <form onSubmit={register}>
          <div>
            <input
              onChange={handelusername}
              className="mt-3 px-2 py-2"
              type="text"
              name=""
              id=""
              placeholder="inter your name"
            />
            <p className="mt-2 text-red-700">{nameerror}</p>
          </div>
          <div>
            <input
              onChange={handeluseremail}
              className="mt-3 px-2 py-2"
              type="email"
              placeholder="inter your email"
            />
            <p className="mt-2 text-red-700">{emailerror}</p>
          </div>
          <div>
            <input
              onChange={handeluserpassword}
              className="mt-3 px-2 py-2"
              type="password"
              placeholder="inter your password"
            />
            <p className="mt-2 text-red-700">{errorpassword}</p>
          </div>
          <button
            type="submit"
            className="px-2 py-2 mt-3 bg-blue-600 text-blue-50"
          >
            register
          </button>
          <Link to={'/login'} className="ml-5 text-white cursor-pointer">You have an account?</Link>
        </form>
      </div>
    
    </div>
  );
};

export default Registration;
