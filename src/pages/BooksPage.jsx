import React from 'react'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import BookDetails from '../components/BookDetails'
import { Route, Routes } from 'react-router-dom'

function BooksPage() {
  return (
    <div>
        <BookList/>
    </div>
  )
}

export default BooksPage