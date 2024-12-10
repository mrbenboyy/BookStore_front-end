import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bookPic from '../images/book.jpg'

function BookDetails() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [author, setAuthor] = useState("");
    const [pubDate, setPubDate] = useState("");
    const params = useParams()

    useEffect(() => {
        bookFound()
    }, [])

    async function bookFound() {
        const book = await axios.get(`http://localhost:9090/api/books/${params.id}`)
        setTitle(book.data.title)
        setPrice(book.data.price);
        setAuthor(book.data.author);
        setPubDate(book.data.date_publication.split('T')[0]); // Si la date est au format ISO
    }
    return (
        <>
            <div class="bg-gray-100 dark:bg-gray-800 py-8">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row -mx-4">
                        <div class="md:flex-1 px-4">
                            <div class="h-[560px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img class="w-full h-full object-cover" src={bookPic} alt="Book Image" />
                            </div>
                            <div class="flex -mx-2 mb-4">
                                <div class="w-1/2 px-2">
                                    <button class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                                </div>
                                <div class="w-1/2 px-2">
                                    <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                                </div>
                            </div>
                        </div>
                        <div class="md:flex-1 px-4">
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
                            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                                ante justo. Integer euismod libero id mauris malesuada tincidunt.
                            </p>
                            <div class="flex mb-4">
                                <div class="mr-4">
                                    <span class="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                    <span class="text-gray-600 dark:text-gray-300">{price} Dhs</span>
                                </div>
                                <div>
                                    <span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                    <span class="text-gray-600 dark:text-gray-300">In Stock</span>
                                </div>
                            </div>
                            <div>
                                <span class="font-bold text-gray-700 dark:text-gray-300">Book Description:</span>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                    lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                    ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                    sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                                </p>
                            </div><br/>
                            <div>
                                <span class="font-bold text-gray-700 dark:text-gray-300">Auhtor:</span>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {author}
                                </p>
                            </div><br/>
                            <div>
                                <span class="font-bold text-gray-700 dark:text-gray-300">Publication Date:</span>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {pubDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookDetails