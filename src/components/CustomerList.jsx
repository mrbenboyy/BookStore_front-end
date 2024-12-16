import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, [])

    async function fetchCustomers() {
        const res = await axios.get("http://localhost:9090/api/customers");
        setCustomers(res.data);
    }
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Address
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((item, index) => {
                            return (
                                <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td class="px-6 py-4">
                                        {item.fName}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.lName}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.address}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CustomerList