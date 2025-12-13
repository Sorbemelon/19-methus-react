import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import Table from "./Table.jsx";

const Form = () => {
  const {update, setUpdate} = useContext(MessageContext)
  const [admin, setAdmin] = useState("admin");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    position: "",
    id: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post("https://67eca027aa794fb3222e43e2.mockapi.io/members", formData);
      setFormData({
        name: "",
        lastname: "",
        position: "",
        id: "",
      });
      setUpdate(!update)
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <di className="flex flex-col w-[80%] md:w-fit px-4 mx-auto">
        <h2 className="text-gray-200 mb-2">Create User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
          <input className="col-span-3 xl:col-span-1 xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="name" value={formData.name} onChange={handleChange} placeholder="name" disabled={submitting} required />
          <input className="col-span-3 xl:col-span-1 xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="lastname" disabled={submitting} required />
          <input className="col-span-3 xl:col-span-1 xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="position" value={formData.position} onChange={handleChange} placeholder="position" disabled={submitting} required />

          <button type="submit" className="px-6 py-2 ml-auto font-bold bg-lime-400 rounded-xl hover:bg-green-600 hover:text-white hover:cursor-pointer" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </di>
      
      <Table admin={admin} />
    </div>
  );
};

export default Form;
