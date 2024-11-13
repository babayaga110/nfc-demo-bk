import * as React from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { storage, db_firestore } from "./firebase/config";
import {
  getDownloadURL,
  listAll,
  ref,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const docPath = doc(db_firestore, "demo", "E8MUqjXy0V3Otj4Nrz2n");

function App() {
  const [images, setImages] = React.useState([]);

  const fetchImages = async () => {
    try {
      const listRef = ref(storage, "images");
      const res = await listAll(listRef);

      const imagePromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { url, name: itemRef.name };
      });

      const imageList = await Promise.all(imagePromises);
      setImages(imageList);
    } catch (error) {
      alert("Failed to fetch images: " + error.message);
    }
  };



  // Call fetchImages on component mount
  React.useEffect(() => {
    fetchImages();
  }, []);

  const handleSet = async (url) => {
    try {
      await updateDoc(docPath, { nfcToken: url });
      alert("NFC read successfully!");
    } catch (error) {
      console.error("Error setting NFC:", error);
      alert("Failed to set NFC.");
    }
  };

  const handleReset = async () => {
    try {
      await updateDoc(docPath, { nfcToken: "" });
      alert("NFC close successfully!");
    } catch (error) {
      console.error("Error setting NFC:", error);
      alert("Failed to set NFC.");
    }
  };

  const handleDelete = async (name) => {
    const desertRef = ref(storage, `images/${name}`);
    try {
      await deleteObject(desertRef);
      alert("File deleted successfully!");
      setImages((prevImages) =>
        prevImages.filter((image) => image.name !== name)
      );
      await updateDoc(docPath, { nfcToken: "" });
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  const handleFileChange = async (file) => {
    if (file) {
      const mountainsRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(mountainsRef, file);
        alert("File uploaded successfully!");
        fetchImages(); // Fetch updated list after upload
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file.");
      }
    }
  };
  const handleAvailable = async (data) => {
    try {
      await updateDoc(docPath, { available:  data});
      alert(`Doctor ${data ? 'available' : 'unavailable'} successfully!`);
    } catch (error) {
      console.error("Error setting NFC:", error);
      alert("Failed to set NFC.");
    }
  }

  return (
    <div>
      <Navbar handleFileChange={handleFileChange} />
      <div className="flex flex-col gap-2 mt-2 px-2">
        {images.map((image) => (
          <Card
            key={image.name}
            url={image.url}
            name={image.name}
            handleDelete={handleDelete}
            handleSet={handleSet}
            handleReset={handleReset} 
            handleAvailable={handleAvailable}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
