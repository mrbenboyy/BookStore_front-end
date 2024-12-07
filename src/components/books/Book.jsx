import React, { useEffect } from 'react'
import axios from 'axios'

function Book({ book, onDelete, onEdit, showDetails }) {
    return (
        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td class="px-6 py-4">
                {book.title}
            </td>
            <td class="px-6 py-4">
                {book.price}
            </td>
            <td class="px-6 py-4">
                {book.author}
            </td>
            <td class="px-6 py-4">
                {book.date_publication.split('T')[0]}
            </td>
            <td class="px-6 py-4">
                <button onClick={() => onDelete(book._id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Supprimer</button>
            </td>
            <td class="px-6 py-4">
                <button onClick={()=>onEdit(book._id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Modifier</button>
            </td>
            <td class="px-6 py-4">
                <button onClick={() => showDetails(book._id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Détails</button>
            </td>
        </tr>
    )
}

export default Book