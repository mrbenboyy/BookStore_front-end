import React from 'react'
import BookList from '../components/books/BookList'
import BookForm from '../components/books/BookForm'
import BookDetails from '../components/books/BookDetails'
import { Route, Routes } from 'react-router-dom'

function BooksPage() {
  return (
    <div>
        <BookList/>
    </div>
  )
}

export default BooksPage