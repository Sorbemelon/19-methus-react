import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { Link } from "react-router-dom";
import ViewToggleButton from "../components/ViewToggleButton";

export default function Home() {
    const {view, setView} = useContext(MessageContext)

    return (
        <div>
            <div className="pt-10 gap-y-4 flex flex-col justify-center items-center bg-gray-800 text-white">
                <h1 className="">Generation Thailand</h1>
                {view === "" && <h1 className="text-center">React Assessment - User Management</h1>}
                {view === "user" && <h1>Home - User View</h1>}
                {view === "admin" && <h1>Home - Admin View</h1>}
                <div className="flex gap-x-4 mb-8 mx-4">
                    <Link to="/user">
                        <ViewToggleButton>
                            User Home View
                        </ViewToggleButton>
                    </Link>
                    
                    <Link to="/admin">
                        <ViewToggleButton>
                            Admin Home View
                        </ViewToggleButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}