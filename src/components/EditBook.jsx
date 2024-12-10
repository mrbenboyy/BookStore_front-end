import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [author, setAuthor] = useState("");
  const [pubDate, setPubDate] = useState("");
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    bookFound();
  }, []);

  async function bookFound() {
    const book = await axios.get(`http://localhost:9090/api/books/${param.id}`);
    if (book) {
      setTitle(book.data.title);
      setPrice(book.data.price);
      setAuthor(book.data.author);
      setPubDate(book.data.date_publication.split('T')[0]); // Si la date est au format ISO
    }
  }

  function resetForm() {
    setTitle("");
    setPrice(0);
    setAuthor("");
    setPubDate("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formattedDate = new Date(pubDate).toISOString(); // Formatage de la date
    await axios.patch(`http://localhost:9090/api/books/${param.id}`, { title, price, author, date_publication: formattedDate });
    navigate('/');
  }

  return (
    <center>
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input className="shadow border-red-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Titre du livre..." onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="..." onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="John Wick" onChange={(e) => setAuthor(e.target.value)} value={author} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Publication Date
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" onChange={(e) => setPubDate(e.target.value)} value={pubDate} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Modifier
            </button>
            <button onClick={(e) => { e.preventDefault(); resetForm(); }} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </center>
  );
}

export default EditBook;
