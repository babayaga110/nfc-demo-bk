import * as React from "react";
import Plus from "../assets/Plus";
import Delete from "../assets/Delete";
import Minus from "../assets/Minus";
import { collection, onSnapshot } from "firebase/firestore";
import { db_firestore } from "../firebase/config";

export default function Card({
  url,
  name,
  handleSet,
  handleDelete,
  handleReset,
  handleAvailable,
}) {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db_firestore, "demo"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(data[0]);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex w-[300px] border border-gray-300 rounded-md shadow-sm overflow-hidden">
      <img
        src={url}
        alt={name}
        className="object-contain w-[200px] h-[150px] rounded-l-md"
      />
      <div className="flex flex-col flex-1">
        {data?.nfcToken === url ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1"
            onClick={handleReset}
          >
            <Minus />
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1"
            onClick={() => handleSet(url)}
          >
            <Plus />
          </button>
        )}

        <button
          className="bg-red-500 hover:bg-red-700 text-white flex justify-center items-center flex-1"
          onClick={() => handleDelete(name)}
        >
          <Delete />
        </button>
        {data?.nfcToken === url ? (
        <label class="inline-flex items-center cursor-pointer flex-1 w-[100%]">
          <input type="checkbox" value="" class="sr-only peer" onChange={(e) => handleAvailable(e.target.checked)} checked={data?.available} />
          <div class="relative w-full h-full bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800  peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10%] after:start-[5%] after:bg-white after:border-gray-300 after:border after:rounded-md  after:h-[80%] after:w-[45%] after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
        </label>) : null}
      </div>
    </div>
  );
}
