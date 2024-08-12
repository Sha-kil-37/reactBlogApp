import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import Singelblog from "../Singelblog";
const Home = ({ user }) => {
  //
  const [postdata, setpostdata] = useState([]);
  const [loading, setloading] = useState(true);
  //
  useEffect(() => {
    const getdata = onSnapshot(collection(db, "blog"), (snapshot) => {
      // Respond to data
      let data = [];
      snapshot.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setpostdata(data);
      setTimeout(() => {
        setloading(false);
      }, 1000);

      //
    });
  }, []);
  //
  const deletdata = async (id) => {
    try {
      const deletref = doc(db, "blog", id);
      await deleteDoc(deletref);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
    }
  };

  //
  return (
    <section className=" py-5 px-2 align-content-center justify-center ">
      {loading ? (
        <h1 className="text-center font-bold text-green-400 text-xl">
          Pleas wait...
        </h1>
      ) : (
        <Singelblog blogdata={postdata} some={deletdata} user={user} />
      )}
    </section>
  );
};

export default Home;
