import * as React from "react";
import Plus from "../assets/Plus";
import Delete from "../assets/Delete";
import Minus from "../assets/Minus";
import { collection, onSnapshot } from "firebase/firestore";
import { db_firestore } from "../firebase/config";


export default function Card({ url, name ,handleSet, handleDelete,handleReset}) {
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
      <img src={url} alt={name} className="object-contain w-[200px] h-[150px] rounded-l-md" />
      <div className="flex flex-col flex-1">
        {data?.nfcToken === url ? ( <button
          className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1"
          onClick={handleReset}
        >
          <Minus />
        </button>) : <button
          className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1"
          onClick={() => handleSet(url)}
        >
          <Plus />
        </button>}
       
       
        <button
          className="bg-red-500 hover:bg-red-700 text-white flex justify-center items-center flex-1"
          onClick={() => handleDelete(name)}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
}
