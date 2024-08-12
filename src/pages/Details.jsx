import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";

const Details = () => {
  //
  const { id } = useParams();
  const [data, setdata] = useState(null);
  //
  useEffect( () =>
  {
    const docRef = doc(db, "blog", id);
    getDoc( docRef ).then( ( data ) =>
    {
      console.log(data)
      if (data.exists()) {
        setdata(data.data());
      }
    } );
    
  }, [id]);
  // 

  //
  return (
  <section className="py-5"><div className="container  w-[800px] mx-auto px-3 py-4 border-2 border-solid border-blue-500 ">
  <img src={ data?.img } alt="" />
  <h2>{ data?.discription}</h2>
    </div>
    </section>
  );
};

export default Details;
