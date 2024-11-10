import * as React from "react";
import Upload from "../assets/Upload";
import {  ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
export default function Navbar() {
  const fileInputRef = React.useRef(null);

  // Function to handle button click and trigger the file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const mountainsRef = ref(storage, `images/${file.name}`);
      uploadBytes(mountainsRef, file)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          alert("File uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          alert("Failed to upload file.");
        });
    }
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
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
