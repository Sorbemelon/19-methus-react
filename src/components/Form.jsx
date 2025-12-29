import { useState } from "react";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import axios from "axios";
import Table from "./Table.jsx";

const Form = () => {
  const {update, setUpdate, API} = useContext(MessageContext)
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: ""
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
      await axios.post(`${API}`, formData);
      setFormData({
        username: "",
        email: "",
        role: "",
        password: ""
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
      <div className="flex flex-col w-[80%] md:w-fit px-4 mx-auto">
        <h2 className="text-gray-200 mb-2">Create User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
          <input className="col-span-3 xl:col-span-1 xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="username" value={formData.username} onChange={handleChange} placeholder="username" disabled={submitting} required />
          <input className="col-span-3 xl:col-span-1 xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="email" value={formData.email} onChange={handleChange} placeholder="email" disabled={submitting} required />
          <input className="col-span-3 xl:col-span-1 xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="role" value={formData.role} onChange={handleChange} placeholder="role" disabled={submitting} required />
          <input className="col-span-3 xl:col-span-1 xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="password" value={formData.password} onChange={handleChange} placeholder="password (>8)" disabled={submitting} required />

          <button type="submit" className="px-6 py-2 ml-auto font-bold bg-lime-400 rounded-xl hover:bg-green-600 hover:text-white hover:cursor-pointer" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      
      <Table admin={true} />
    </div>
  );
};

export default Form;
