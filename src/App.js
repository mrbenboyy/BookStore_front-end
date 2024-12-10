import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import EditBook from './components/EditBook';
import BookDetails from './components/BookDetails';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import Navbar from './pages/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/books' element={<BooksPage />}></Route>
        <Route path='/orders' element={<OrdersPage />}></Route>
        <Route path='/customers' element={<CustomersPage />}></Route>
        <Route path='/books/details/:id' element={<BookDetails />}></Route>
        <Route path='/books/new' element={<BookForm />}></Route>
        <Route path='/books/edit/:id' element={<EditBook />}></Route>
      </Routes>
    </div >
  );
}

export default App;
