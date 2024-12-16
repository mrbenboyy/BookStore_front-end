import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddOrderForm() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCustomerID, setSelectedCustomerID] = useState(null);
    const [selectedBookID, setSelectedBookID] = useState([]); // Array of book titles

    useEffect(() => {
        fetchCustomers();
        fetchBooks();
    }, []);

    async function fetchCustomers() {
        const res = await axios.get("http://localhost:9090/api/customers");
        setCustomers(res.data);
    }

    async function fetchBooks() {
        const res = await axios.get("http://localhost:9090/api/books");
        setBooks(res.data);
    }

    async function handleForm(e) {
        e.preventDefault();
        // Ensure that the data is valid
        if (!selectedCustomerID || selectedBookID.length === 0 || isNaN(totalAmount)) {
            alert("Please select a customer, add books, and enter a valid amount.");
            return;
        }

        const order = { "totalAmount": totalAmount, "customer": selectedCustomerID, "books": selectedBookID };
        try {
            await axios.post("http://localhost:9090/api/orders", order);
        } catch (error) {
            console.error("Error posting the order:", error);
        }
    }

    function removeBook(title) {
        try {
            setSelectedBookID(selectedBookID.filter((item) => item !== title));
        } catch (error) {
            console.log(error);
        }
    }

    function selectBook(selectedTitle) {
        if (!selectedBookID.includes(selectedTitle))
            setSelectedBookID([...selectedBookID, selectedTitle]);
    }

    return (
        <center>
            <div className="w-full max-w-xs">
                <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <input className="shadow border-red-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fName" type="number" placeholder="Enter the total amount"
                            onChange={(e) => setTotalAmount(e.target.value)} />
                    </div>
                    <select onChange={(e) => setSelectedCustomerID(e.target.value)} id="countries"
                        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected disabled>Select customer</option>
                        {customers.map((item, index) => (
                            <option value={item._id} key={index}>{item.fName} {item.lName}</option>
                        ))}
                    </select>
                    <select onChange={(e) => selectBook(e.target.value)} id="countries"
                        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected disabled>Select book</option>
                        {books.map((item, index) => (
                            <option value={item.title} key={index}>{item.title}</option>
                        ))}
                    </select>
                    <ul>
                        {selectedBookID.map((item, index) => (
                            <li key={index}>
                                {item}
                                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    onClick={() => removeBook(item)}> Remove </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Ajouter
                        </button>
                        <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type="reset">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </center>
    );
}

export default AddOrderForm;
