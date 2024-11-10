import * as React from "react";
import Upload from "../assets/Upload";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
export default function Navbar({handleFileChange}) {
  const fileInputRef = React.useRef(null);

  // Function to handle button click and trigger the file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

 
  return (
    <div className="bg-gray-100 text-white p-3 flex justify-between items-center">
      <h4 className="text-gray-800 font-bold">Admin Panel</h4>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white px-3 p-1 rounded"
        onClick={handleButtonClick}
      >
        <Upload />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files[0])}
        style={{ display: "none" }}
      />
    </div>
  );
}
