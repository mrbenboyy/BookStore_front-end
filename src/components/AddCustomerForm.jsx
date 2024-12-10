import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddCustomerForm() {
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("");
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post("http://localhost:9090/api/customers", { fName, lName, email, address })
        navigate('/customers')
    }
    return (
        <center>
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <input className="shadow border-red-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fName" type="text" placeholder="Enter your first name" onChange={(e) => setFName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" id="lName" type="text" placeholder="Enter your last name" onChange={(e) => setLName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" onChange={(e) => setAddress(e.target.value)} placeholder='Enter your address' />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Ajouter
                        </button>
                        <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type='reset'>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </center>
    )
}

export default AddCustomerForm