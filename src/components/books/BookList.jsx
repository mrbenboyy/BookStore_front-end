import React, { useEffect, useState } from 'react'
import Book from './Book'
import './BookList.css'
import axios from 'axios'
import BookForm from './BookForm'
import { useNavigate } from 'react-router-dom'

function BookList() {
    const [books, setBooks] = useState([])
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        fetchBooks()
    }, [])

    async function deleteBook(id) {
        await axios.delete(`http://localhost:9090/api/books/${id}`)
        fetchBooks()
    }

    async function editBook(id) {
        navigate(`/books/edit/${id}`)
    }

    async function showDetails(id) {
        navigate(`/books/details/${id}`)
    }

    async function fetchBooks() {
        const res = await axios.get("http://localhost:9090/api/books")
        // console.log(data)
        setBooks(res.data)
    }
    return (
        <>
            <div className='flex mt-11 mb-2'>
                <div class="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                        class="fill-gray-600 mr-3 rotate-90">
                        <path
                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                        </path>
                    </svg>
                    <input onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="Search Something..." class="w-full outline-none bg-transparent text-gray-600 text-sm" />
                </div>
                <button className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 m-2 border border-green-500 hover:border-transparent rounded' onClick={() => navigate('/books/new')}>Ajouter</button>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Author
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Publication date
                            </th>
                            <th scope="col" colSpan={3} class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.filter((item) => {
                                if (keyword == "") {
                                    return item
                                } else if (item.title.toLowerCase().includes(keyword.toLowerCase()) || item.author.toLowerCase().includes(keyword.toLowerCase())) {
                                    return item
                                }
                            }).map((item, index) => {
                                return (
                                    <Book book={item} key={index} onDelete={deleteBook} onEdit={editBook} showDetails={showDetails} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default BookList