import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export default function Table({admin}) {
  const {update} = useContext(MessageContext)
  const backendURL = "https://67eca027aa794fb3222e43e2.mockapi.io/members";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delState, setDelState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [editId, setEditId] = useState("");
  const [editing, setEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    lastname: "",
    position: "",
    id: ""
  });

  const fetchData = async () => {
    try {
      let response = await axios.get(backendURL);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditState = async (e) => {
    if (editId === e.id && editState) {
        setEditState(false);
        setEditFormData({
            name: "",
            lastname: "",
            position: "",
            id: "",
        });
    } else setEditState(true);
    setEditId(e.id);

    setEditFormData({
        id: e.id,
        name: e.name,
        lastname: e.lastname,
        position: e.position,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = async () => {
    const isConfirm = confirm("จะแก้จริงๆใช่ม้ายยยยย");
    if (!isConfirm) return;
    setEditing(true);
    try {
      const response = await axios.put(`https://67eca027aa794fb3222e43e2.mockapi.io/members/${editId}`, editFormData);
      setEditFormData({
        name: "",
        lastname: "",
        position: "",
        id: "",
      });
      setEditId("");
      setEditState(false)
    } catch (error) {
    console.error("Error editing user:", error);
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirm = confirm("จะลบแล้วน้าาาาา");
    if (!isConfirm) return;
    const response = await axios.delete(`https://67eca027aa794fb3222e43e2.mockapi.io/members/${id}`);
    setDelState(!delState);
  };

  useEffect(() => {
    fetchData();
  }, [update, delState, editFormData]);

  return (
    <div className="">
        {loading && <div className="text-4xl font-bold animate-bounce text-white text-center">Loading...</div>}
        {!loading && <table className="w-fit max-w-[95%] overflow-hidden rounded-xl mx-auto mb-10 bg-white">
            <thead className="text-left font-medium text-white text-lg bg-linear-to-br from-black to-gray-600">
                <tr>
                    { admin && 
                    <th className="px-1 md:px-3 py-3">
                        ID
                    </th> }
                    <th className="px-1 md:px-63py-3">
                        Name
                    </th>
                    <th className="px-1 md:px-3 py-3">
                        Last <br className="md:hidden" />Name
                    </th>
                    <th className="px-1 md:px-3 py-3">
                        Position
                    </th>
                    { admin && 
                    <th className="px-1 md:px-3 py-3 text-sm text-end">
                        Edit/<br className="md:hidden" />Delete
                    </th> }
                </tr>
            </thead>
            <tbody className="text-black font-semibold divide-y">
                {data.length > 0 ? (
                    data.map((employee) => (
                        <tr className="hover:bg-gray-50 h-8">
                            { admin && 
                                <td className="px-1 md:px-3 py-1 text-center">
                                {employee.id}
                            </td>}
                            { ((employee.id === editId) && editState) ?
                                <td className="px-1 md:pl-3 py-1">
                                    <input className="col-span-3 xl:col-span-1 w-18 md:w-30 bg-amber-50 border border-gray-300 rounded-md px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" name="name" value={editFormData.name} onChange={handleChange} placeholder="name" />
                                </td>
                                : <td className="px-1 md:px-3 py-1">{employee.name}</td>
                            }
                            { ((employee.id === editId) && editState) ?
                                <td className="px-1 md:pl-3 py-1">
                                    <input className="col-span-3 xl:col-span-1 w-22 xl:w-30 bg-amber-50 border border-gray-300 rounded-md px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" name="lastname" value={editFormData.lastname} onChange={handleChange} placeholder="lastname" />
                                </td>
                                : <td className="px-1 md:px-3 py-1">{employee.lastname}</td>
                            }
                            { ((employee.id === editId) && editState) ?
                                <td className="px-1 md:pl-3 py-1">
                                    <input className="col-span-3 xl:col-span-1 w-18 xl:w-30 bg-amber-50 border border-gray-300 rounded-md px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" name="position" value={editFormData.position} onChange={handleChange} placeholder="position" />
                                </td>
                                : <td className="px-1 md:px-3 py-1">{employee.position}</td>
                            }
                            { admin && 
                                <td className="px-1 md:px-3 py-1 text-center">
                                    <div className="flex gap-1 justify-end md:gap-4">
                                        { (editState && ((employee.id === editId)) ) &&
                                        <button className=" w-6 rounded text-white hover:cursor-pointer hover:bg-amber-200" onClick={() =>handleEditClick()}>
                                            ✅
                                        </button>
                                        }
                                        <button className=" w-6 rounded text-white hover:cursor-pointer hover:bg-amber-200"  disabled={editing} onClick={() => handleEditState(employee)}>
                                            <img src="assets/edit-button.png" />
                                        </button>
                                        <button className="bg-red-500 w-6 rounded text-white hover:cursor-pointer hover:bg-red-700" onClick={() => handleDelete(employee.id)}>
                                            D
                                        </button>
                                    </div>
                                </td>
                            }
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                            No employee data found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>}
    </div>  );
}