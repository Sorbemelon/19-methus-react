import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const Form = () => {
  const {upload, setUpload} = useContext(MessageContext)
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    position: "",
    id: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://67eca027aa794fb3222e43e2.mockapi.io/members", formData);
      console.log(response);
      setFormData({
        name: "",
        lastname: "",
        position: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

    const handleEditClick = async () => {
      setLoading(true);
      setFormData({
        name: "",
        lastname: "",
        position: "",
        id: "",
      });
      try {
        const response = await axios.put(`https://67eca027aa794fb3222e43e2.mockapi.io/members/${formData.id}`, formData);
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        setLoading(false);
      }
    };
  
  useEffect(() => {
    setUpload(!upload);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center gap-4 mx-auto mb-8">
      <input className="bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="name" value={formData.name} onChange={handleChange} placeholder="name" disabled={loading} required />
      <input className="bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="lastname" disabled={loading} required />
      <input className="bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="position" value={formData.position} onChange={handleChange} placeholder="position" disabled={loading} required />
      <input className="bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="id" value={formData.id} onChange={handleChange} placeholder="id" disabled={loading} />
      <button type="submit" className="font-bold bg-green-400 rounded-4xl w-24" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button type="button" className="bg-blue-500 text-white w-full mt-4 py-2 rounded" onClick={handleEditClick}>
        Edit
      </button>
    </form>
  );
};

export default Form;
