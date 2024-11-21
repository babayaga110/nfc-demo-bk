import * as React from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { storage, db_firestore } from "./firebase/config";
import {
  getDownloadURL,
  ref,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useModal } from "./useContext/ModalContext";

const docPath = doc(db_firestore, "demo", "E8MUqjXy0V3Otj4Nrz2n");

function App() {
  const [loading, setLoading] = React.useState(false);
  const [doctors, setDoctors] = React.useState([]);
  const { closeModal } = useModal();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db_firestore, "doctors"),
      (snapshot) => {
        const doctors = snapshot.docs.map((doc) => ({
          id: doc.id,

          ...doc.data(),
        }));
        setDoctors(doctors);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSet = async (data) => {
    try {
      await updateDoc(docPath, {
        ...data,
        available: true,
        show: true,
      });
      alert("NFC read successfully!");
    } catch (error) {
      console.error("Error setting NFC:", error);
      alert("Failed to set NFC.");
    }
  };

  const handleReset = async () => {
    try {
      await updateDoc(docPath, { 
        show: false
       });
      alert("NFC close successfully!");
    } catch (error) {
      console.error("Error setting NFC:", error);
      alert("Failed to set NFC.");
    }
  };

  const handleDelete = async (data) => {
    const desertRef = ref(storage, `doctors/${data?.imageRef}`);
    try {
      await deleteObject(desertRef);
      await deleteDoc(doc(db_firestore, "doctors", data.id));
      alert("File deleted successfully!");
      setDoctors(doctors.filter((doctor) => doctor.id !== data.id));
      // await updateDoc(docPath, { nfcToken: "" });
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  const handleAvailable = async (data) => {
    try {
      await updateDoc(docPath, { available: data });
      alert(`Doctor ${data ? "available" : "unavailable"} successfully!`);
    } catch (error) {
      console.error("Error setting NFC:", error);
      alert("Failed to set NFC.");
    }
  };

  const handleDoctor = async (data) => {
    setLoading(true);
    const file = data.image[0];
    const mountainsRef = ref(storage, `doctors/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      const uploadResult = await uploadBytes(mountainsRef, file);

      // Get the download URL of the uploaded file
      const imageUrl = await getDownloadURL(uploadResult.ref);

      // Add doctor data to Firestore with the image URL
      const doctor = await addDoc(collection(db_firestore, "doctors"), {
        inputName: data.name,
        inputDesc: data.designation,
        image: imageUrl, 
        imageRef: file.name,
      });

      await updateDoc(doc(db_firestore, "doctors", doctor.id), {
        id: doctor.id,
      });

      alert(`Doctor added successfully!`);
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor.");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div>
      <Navbar handleDoctor={handleDoctor} loading={loading} />
      <div className="flex flex-col gap-2 mt-2 px-2">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            doctor={doctor}
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
