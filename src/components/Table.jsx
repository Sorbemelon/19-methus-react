import { useState, useEffect } from "react";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import axios from "axios";

export default function Table({admin}) {
  const {update, API} = useContext(MessageContext)
//   const backendURL = "https://67eca027aa794fb3222e43e2.mockapi.io/members";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delState, setDelState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [editId, setEditId] = useState("");
  const [editing, setEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    role: ""
  });

  const fetchData = async () => {
    try {
      let response = await axios.get(API);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditState = async (e) => {
    if (editId === e._id && editState) {
        setEditState(false);
        setEditFormData({
            username: "",
            email: "",
            role: ""
        });
    } else setEditState(true);
    setEditId(e._id);

    setEditFormData({
        username: e.username,
        email: e.email,
        role: e.role
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
      await axios.patch(`${API}/${editId}`, editFormData);
      setEditFormData({
        username: "",
        email: "",
        role: ""
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
    await axios.delete(`${API}/${id}`);
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
                    <th className="px-1 md:px-63py-3">
                        Username
                    </th>
                    <th className="px-1 md:px-3 py-3">
                        Email
                    </th>
                    <th className="px-1 md:px-3 py-3">
                        Role
                    </th>
                    { admin && 
                    <th className="px-1 md:px-3 py-3 text-sm text-end">
                        Edit/<br className="md:hidden" />Delete
                    </th> }
                </tr>
            </thead>
            <tbody className="text-black font-semibold divide-y">
                {data.length > 0 ? (
                    data.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 h-8">
                            { ((user._id === editId) && editState) ?
                                <td className="px-1 md:pl-3 py-1">
                                    <input className="col-span-3 xl:col-span-1 w-18 md:w-30 bg-amber-50 border border-gray-300 rounded-md px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" name="username" value={editFormData.username} onChange={handleChange} placeholder="username" />
                                </td>
                                : <td className="px-1 md:px-3 py-1">{user.username}</td>
                            }
                            { ((user._id === editId) && editState) ?
                                <td className="px-1 md:pl-3 py-1">
                                    <input className="col-span-3 xl:col-span-1 w-22 xl:w-30 bg-amber-50 border border-gray-300 rounded-md px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" name="email" value={editFormData.email} onChange={handleChange} placeholder="email" />
                                </td>
                                : <td className="px-1 md:px-3 py-1">{user.email}</td>
                            }
                            { ((user._id === editId) && editState) ?
                                <td className="px-1 md:pl-3 py-1">
                                    <input className="col-span-3 xl:col-span-1 w-18 xl:w-30 bg-amber-50 border border-gray-300 rounded-md px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" name="role" value={editFormData.role} onChange={handleChange} placeholder="role" />
                                </td>
                                : <td className="px-1 md:px-3 py-1">{user.role}</td>
                            }
                            { admin && 
                                <td className="px-1 md:px-3 py-1 text-center">
                                    <div className="flex gap-1 justify-end md:gap-4">
                                        { (editState && ((user._id === editId)) ) &&
                                        <button className=" w-6 rounded text-white hover:cursor-pointer hover:bg-amber-200" onClick={() => handleEditClick()}>
                                            ✅
                                        </button>
                                        }
                                        <button className=" w-6 rounded text-white hover:cursor-pointer hover:bg-amber-200"  disabled={editing} onClick={() => handleEditState(user)}>
                                            <img src="assets/edit-button.png" />
                                        </button>
                                        <button className="bg-red-500 w-6 rounded text-white hover:cursor-pointer hover:bg-red-700" onClick={() => handleDelete(user._id)}>
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