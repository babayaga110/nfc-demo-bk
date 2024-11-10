import * as React from "react";
import Plus from "../assets/Plus";
import Delete from "../assets/Delete";


export default function Card({ url, name ,handleSet, handleDelete}) {

  return (
    <div className="flex w-[300px] border border-gray-300 rounded-md shadow-sm overflow-hidden">
      <img src={url} alt={name} className="object-cover w-[200px] h-[150px] rounded-l-md" />
      <div className="flex flex-col flex-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center flex-1"
          onClick={() => handleSet(url)}
        >
          <Plus />
        </button>
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
