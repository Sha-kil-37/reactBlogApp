import { Link } from "react-router-dom";
const Singelblog = ({ blogdata, some, user }) => {
  //

  const shorttext = (text) => {
    if (text.length > 100) {
      text = text.substring(0, 170) + "....";
    }
    return text;
  };

  //
  return (
    <div className=" container mx-auto flex justify-between flex-wrap	">
      {blogdata.map((data, i) => (
        <div
          key={i}
          className="w-[24%] mb-5 border-2 border-solid border-blue-300 px-3 rounded py-5 overflow-hidden"
        >
          <div className="rounded-lg overflow-hidden  border-2 border-solid h-[200px]">
            <img src={data.img} alt="" className="w-full" />
          </div>
          <div className="flex justify-between mt-3 mb-5">
            <div>
              <h2 className="text-black font-semibold text-2xl">
                Post creat by
              </h2>
            </div>
            <div>
              <h3 className=" text-blue-400 font-medium "> {data.name}</h3>
            </div>
          </div>
          <h2 className=" font-medium  text-xl capitalize">{data.tittle}</h2>
          <p className="mt-2">{shorttext(data.discription)}</p>
          <div>
            <Link
              to={`/details/${data.id}`}
              className="px-2 rounded text-white  py-2 bg-blue-400  mt-4 inline-block mb-3 font-semibold"
            >
              Read More
            </Link>
          </div>
          <h5 className="font-semibold">{data?.time.toDate().toDateString()}</h5>
          {user?.uid == data?.authorid ? (
            <div className="flex justify-between mt-3">
              <div>
                <button
                  onClick={() => some(data.id)}
                  className="px-4 py-2 bg-red-400  text-white rounded font-medium"
                >
                  Delet
                </button>
              </div>
              <div>
                <Link className="px-2 py-2 rounded font-medium  bg-green-400 text-white" to={ `/update/${ data?.id }` }>
                  Update post
              </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Singelblog;
