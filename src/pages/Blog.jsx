import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { db } from "./firebase";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";
//
const Blog = ({ user }) => {
  //
  const uploaddata = {
    catagory: "",
    tittle: "",
    discription: "",
  };
  //
  const catagoryoption = [
    "social",
    "politic",
    "education",
    "sceince",
    "health",
    "entertenment",
    "tour",
  ];
  //
  const [uploadvalue, setuploadvalue] = useState(uploaddata);
  const [file, setfile] = useState(null);
  const [catgoryerror, setcatagoryerror] = useState("");
  const [tittleerror, settittle] = useState("");
  const [discriptionerror, setdiscription] = useState("");
  const [fileerror, setfileerror] = useState("");
  const [progress, setprogress] = useState(0);
  const [handelprogress, sethandelprogress] = useState(true);
  // const navigate = useNavigate();
  const { catagory, tittle, discription } = uploadvalue;
  const { up } = useParams();
  console.log(uploadvalue);
  //
  const uploadpost = async (e) => {
    e.preventDefault();
    if (!catagory) {
      setcatagoryerror("catagori den");
    } else if (!tittle) {
      settittle("tittle den");
    } else if (!discription) {
      setdiscription("discription den");
    } else if (!file) {
      setfileerror("file den");
    } else if (!user || !user.uid) {
      console.log("aikhane user na thakle ono akta page a niya jamu");
    } else {
      try {
        const docRef = await addDoc(collection(db, "blog"), {
          ...uploadvalue,
          time: serverTimestamp(),
          name: user?.displayName,
          authorid: user?.uid,
        });
        // console.log("Document written with ID: ", docRef.id);
        console.log("post succes");

        // navigate("/");
      } catch (e) {
        console.error("Error adding documen");
      }
    }
  };
  //
  useEffect(() => {
    const updatesblogs = async () => {
      const docRef = doc(db, "blog", up);
      const docsnap = await getDoc(docRef);
      if (docsnap.exists()) {
        setuploadvalue({ ...docsnap.data() });
      } else {
        console.log("No such document!");
      }
    };
    updatesblogs();
  }, [up]);
  //
  //
  useEffect(() => {
    const imageupload = () => {
      const storageRef = ref(storage, file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setuploadvalue({ ...uploadvalue, img: downloadURL });
          });
        }
      );
    };
    file && imageupload();
  }, [file]);
  //
  return (
    <div className="container mx-auto">
      <div className="text-center">
        {up ? (
          <h1 className="font-bold text-black text-5xl my-5">
            Update your Blog
          </h1>
        ) : (
          <h1 className="font-bold text-black text-5xl my-5">
            This is Blog page ,
          </h1>
        )}
      </div>
      <div className="bg-[#E5EEF4] w-[600px] mx-auto pt-2 pb-5 px-2 my-10">
        <h2 className="text-black font-4xl font-semibold my-3">
          Creat your post here
        </h2>
        <form onSubmit={uploadpost}>
          <div>
            <select
              onChange={(e) => {
                setuploadvalue({
                  ...uploadvalue,
                  [e.target.name]: e.target.value,
                });
              }}
              name="catagory"
              className="px-2 py-2 bg-white rounded "
            >
              <option> Catagory</option>
              {catagoryoption.map((singeloption, index) => (
                <option key={index}>{singeloption}</option>
              ))}
            </select>

            <p className="mt-2 text-red-400">{catgoryerror}</p>
          </div>
          <div className=" my-2">
            <input
              className="px-4 py-2 mt-3 outline-none rounded"
              onChange={(e) => {
                setuploadvalue({
                  ...uploadvalue,
                  [e.target.name]: e.target.value,
                });
              }}
              name="tittle"
              type="text"
              placeholder="Write your post tittle"
            />
            <p className="mt-2 text-red-400">{tittleerror}</p>
          </div>

          <div>
            <textarea
              onChange={(e) => {
                setuploadvalue({
                  ...uploadvalue,
                  [e.target.name]: e.target.value,
                });
              }}
              name="discription"
              className="my-2 px-2 py-2 rounded"
              placeholder="Write your post blog here "
            ></textarea>
            <p className="mt-2 text-red-400">{discriptionerror}</p>
          </div>

          <div>
            <input onChange={(e) => setfile(e.target.files[0])} type="file" />
            <p className="mt-2 text-red-400">{fileerror}</p>
          </div>

          {handelprogress ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 rounded-sm text-white mt-4"
            >
              {up ? "update" : "post"}
            </button>
          ) : (
            <button>{progress}%</button>
          )}
        </form>
      </div>
      {/* <h2 onClick={()=>{getupdatedata()}}>click</h2> */}
    </div>
  );
};
//

export default Blog;
