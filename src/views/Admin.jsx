import { useState } from "react";
import { MessageContext } from "../context/MessageContext";
import Home from "./Home.jsx";
import Table from "../components/Table";
import Form from "../components/Form.jsx"

export default function Admin() {
    const [admin, setAdmin] = useState("admin");

    return (
        <div>
            <Home />
            <Form />
            <Table admin={admin} />
        </div>
    )
}