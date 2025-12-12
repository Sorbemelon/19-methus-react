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
        id: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

    const handleEditClick = async () => {
      setLoading(true);
      try {
        const response = await axios.put(`https://67eca027aa794fb3222e43e2.mockapi.io/members/${formData.id}`, formData);
        setFormData({
          name: "",
          lastname: "",
          position: "",
          id: "",
        });
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
    <form onSubmit={handleSubmit} className="w-[80%] xl:w-fit grid grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 mb-8 mx-auto">
      <input className="xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="name" value={formData.name} onChange={handleChange} placeholder="name" disabled={loading} required />
      <input className="xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="lastname" disabled={loading} required />
      <input className="xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="position" value={formData.position} onChange={handleChange} placeholder="position" disabled={loading} required />
      <input className="xl:w-40 bg-amber-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" name="id" value={formData.id} onChange={handleChange} placeholder="id" disabled={loading} />
      <button type="submit" className="font-bold bg-lime-400 rounded-xl w-[50%] xl:w-full hover:bg-green-600 hover:text-white hover:cursor-pointer ml-auto" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button type="button" className="font-bold bg-sky-400 w-[50%] xl:w-full py-2 rounded-xl hover:bg-blue-600 hover:text-white hover:cursor-pointer" onClick={handleEditClick}>
        Edit
      </button>
    </form>
  );
};

export default Form;
