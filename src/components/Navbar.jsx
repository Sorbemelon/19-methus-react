import { Link } from "react-router-dom";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export default function Navbar() {
  const {setView} = useContext(MessageContext);

    return (
        <nav className="bg-black text-white p-4 shadow-md">
            <ul className="flex justify-end gap-8 **:text-3xl">
                <li>
                    <Link 
                        to="/"
                        onClick={() => {
                        setView("");
                    }}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/owner">Owner</Link>
                </li>
            </ul>
        </nav>
    )
}