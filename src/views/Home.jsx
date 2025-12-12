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
                {view === "" && <h1>React Assessment</h1>}
                {view === "user" && <h1>Home - User Section</h1>}
                {view === "admin" && <h1>Home - Admin Section</h1>}
                <div className="flex gap-x-4 mb-8">
                    <ViewToggleButton 
                    onClick={() => {
                        setView("user");
                    }}
                    >
                        <Link to="/user">
                            User Home View
                        </Link>
                    </ViewToggleButton>
                    
                    <ViewToggleButton 
                    onClick={() => {
                        setView("admin");
                    }}
                    >
                        <Link to="/admin">
                            Admin Home View
                        </Link>
                    </ViewToggleButton>
                </div>
            </div>
        </div>
    )
}