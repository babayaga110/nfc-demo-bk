import * as React from "react";
import { useModal } from "../useContext/ModalContext";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
export default function Navbar({  handleDoctor ,loading}) {
  const fileInputRef = React.useRef(null);
  const { openModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        name: "",
        designation: "",
        image: "",
      },
    }
  );

  const onSubmit = (data) => {
    handleDoctor(data);
  };

  // Function to handle button click and trigger the file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gray-100 text-white p-3 flex justify-between items-center">
      <h4 className="text-gray-800 font-bold">Admin Panel</h4>
      <div className="flex gap-2">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white px-3 p-1 rounded"
          onClick={openModal}
        >
          Add Doctor
        </button>
      </div>

      <Modal title="My Modal">
        <form
          className="flex flex-col gap-4 text-black"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            required
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input
            type="text"
            placeholder="Designation"
            className="border p-2 rounded"
            required
            {...register("designation", { required: true })}
          />
          {errors.designation && <span>This field is required</span>}
          <input
            type="file"
            className="border p-2 rounded"
            placeholder="Upload Image"
            required
            accept="image/*"
            {...register("image", { required: true })}
          />
          {errors.image && <span>This field is required</span>}
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white px-3 p-1 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Doctor"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
