import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export default function Table({admin}) {
  const {upload} = useContext(MessageContext)
  const backendURL = "https://67eca027aa794fb3222e43e2.mockapi.io/members";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delState, setDelState] = useState(true);

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

const handleDelete = async (id) => {
    const isConfirm = confirm("จะลบแล้วน้าาาาา");
    if (!isConfirm) return;
    const response = await axios.delete(`https://67eca027aa794fb3222e43e2.mockapi.io/members/${id}`);
    setDelState(!delState);
  };

  useEffect(() => {
    fetchData();
  }, [upload, delState]);

  return (
    <div className="">
        {loading && <div className="text-4xl font-bold animate-bounce text-white text-center">Loading...</div>}
        {!loading && <table className="w-fit overflow-hidden rounded-xl mx-auto mb-10 bg-white">
            <thead className="text-left font-medium text-white text-lg bg-linear-to-br from-black to-gray-600">
                <tr>
                    <th className="px-6 py-3">
                        ID
                    </th>
                    <th className="px-6 py-3">
                        Name
                    </th>
                    <th className="px-6 py-3">
                        Last Name
                    </th>
                    <th className="px-6 py-3">
                        Position
                    </th>
                    { admin && 
                    <th className="px-6 py-3">
                        Delete
                    </th> }
                </tr>
            </thead>
            <tbody className="text-black font-semibold divide-y">
                {data.length > 0 ? (
                    data.map((employee) => (
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-1">{employee.id}</td>
                            <td className="px-6 py-1">{employee.name}</td>
                            <td className="px-6 py-1">{employee.lastname}</td> 
                            <td className="px-6 py-1">{employee.position}</td>
                            { admin && 
                                <td className="px-6 py-1 text-center">
                                    <button className="bg-red-500 w-6 rounded text-white hover:cursor-pointer hover:bg-red-700" onClick={() => handleDelete(employee.id)}>
                                    x
                                    </button>
                            </td>}
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