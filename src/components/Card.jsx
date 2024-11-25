import * as React from "react";
import Plus from "../assets/Plus";
import Delete from "../assets/Delete";
import Minus from "../assets/Minus";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db_firestore } from "../firebase/config";
import Template from "./Template";

export default function Card({
  doctor,
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
    <div className="flex w-[100%] max-w-[500px] h-[250px] border border-gray-300 rounded-md shadow-sm overflow-hidden">
      <div className="flex flex-col w-3/4">
        <Template doctor={doctor} />
      </div>
      <div className="flex flex-col w-1/4">
        {data?.show ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1"
            onClick={() => handleReset(doctor)}
          >
            <Minus />
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1"
            onClick={() => handleSet(doctor)}
          >
            <Plus />
          </button>
        )}
        {data?.show ? (
          <label class="inline-flex items-center cursor-pointer flex-1 w-[100%]">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              onChange={(e) => handleAvailable(e.target.checked)}
              checked={data?.available}
            />
            <div class="relative w-full h-full bg-red-400 peer-focus:outline-none dark:peer-focus:ring-blue-800  peer dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10%] after:start-[5%] after:bg-white after:border-gray-300 after:border after:rounded-md  after:h-[80%] after:w-[45%] after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
          </label>
        ) : null}
        <button
          className="bg-orange-400 hover:bg-orange-600 text-white flex justify-center items-center flex-1"
          onClick={() => handleDelete(doctor)}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
}
