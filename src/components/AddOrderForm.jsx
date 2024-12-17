import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddOrderForm() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCustomerID, setSelectedCustomerID] = useState(null);
    const [selectedBookID, setSelectedBookID] = useState([]); // Array of book IDs
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
        fetchBooks();
    }, []);

    // Fetch customers from API
    async function fetchCustomers() {
        const res = await axios.get("http://localhost:9090/api/customers");
        setCustomers(res.data);
    }

    // Fetch books from API
    async function fetchBooks() {
        const res = await axios.get("http://localhost:9090/api/books");
        setBooks(res.data);
    }

    // Handle form submission
    async function handleForm(e) {
        e.preventDefault();
        const order = {
            totalAmount: totalAmount,
            customer: selectedCustomerID,
            books: selectedBookID
        };
        console.log("Sending Order Data:", order);
        try {
            const response = await axios.post("http://localhost:9090/api/orders", order);
            console.log("Order successfully added:", response.data);
            window.location.href = '/orders';
        } catch (error) {
            console.error("Error posting the order:", error);
        }
    }

    // Remove a selected book and update total amount
    function removeBook(bookId) {
        const updatedBooks = selectedBookID.filter((id) => id !== bookId);
        setSelectedBookID(updatedBooks);
        calculateTotalAmount(updatedBooks);
    }

    // Add a book and update total amount
    function selectBook(bookId) {
        if (!selectedBookID.includes(bookId)) {
            const updatedBooks = [...selectedBookID, bookId];
            setSelectedBookID(updatedBooks);
            calculateTotalAmount(updatedBooks);
        }
    }

    // Calculate the total amount by summing book prices
    function calculateTotalAmount(bookIds) {
        const total = bookIds.reduce((sum, id) => {
            const book = books.find((b) => b._id === id);
            return sum + (book ? parseInt(book.price) : 0);
        }, 0);
        setTotalAmount(total);
    }

    return (
        <center>
            <div className="w-full max-w-xs">
                <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Total Amount: {totalAmount} MAD</h3>
                    </div>
                    <select onChange={(e) => setSelectedCustomerID(e.target.value)} id="customers"
                        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected disabled>Select customer</option>
                        {customers.map((item, index) => (
                            <option value={item._id} key={index}>
                                {item.fName} {item.lName}
                            </option>
                        ))}
                    </select>
                    <select onChange={(e) => selectBook(e.target.value)} id="books"
                        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected disabled value="">Select book</option>
                        {books.map((item, index) => (
                            <option value={item._id} key={index}>
                                {item.title} - ${item.price}
                            </option>
                        ))}
                    </select>

                    <ul>
                        {selectedBookID.map((id, index) => {
                            const book = books.find((b) => b._id === id);
                            return (
                                <li key={index}>
                                    {book?.title} - ${book?.price}
                                    <button
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2"
                                        type="button"
                                        onClick={() => removeBook(id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Ajouter
                        </button>
                        <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            type="reset">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </center>
    );
}

export default AddOrderForm;
