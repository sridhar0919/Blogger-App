import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import FileBase64 from 'react-file-base64';
import './css/Createblog.css';
import createBlogImg from '../components/images/thom-milkovic-FTNGfpYCpGM-unsplash.jpg';
import { Navigate, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Createblog() {
  const [item, setItem] = useState({
    blogTitle: '',
    category: '',
    image: '',
    content: '',
    publishedDate: dateFormat(Date.now(), 'mmmm dS, yyyy'),
  });
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmitHandler = () => {
    axios
      .post(`http://localhost:4000/users/add-blog/${id}`, item)
      .then((res) => {})
      .catch((err) => console.log(err));

    toast.success('Blog added successfully');
    navigate('/');
  };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post('http://localhost:4000/upload-blog', item)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  // const fetchData = () => {
  //   axios
  //     .get('http://localhost:4000/fetch-blog')
  //     .then((res) => {
  //       setItems(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="createblog-form-container">
        <div>
          <img src={createBlogImg} alt="" className="createblog-img" />
        </div>
        <div className="createblog-formcontent">
          <h1 style={{ textAlign: 'center' }}>WRITE YOUR NEW BLOG</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitHandler();
            }}
          >
            <input
              type="text"
              placeholder="Blog Title"
              required
              onChange={(e) => {
                setItem({ ...item, blogTitle: e.target.value });
              }}
            />
            <select
              onClick={(e) => {
                setItem({ ...item, category: e.target.value });
              }}
            >
              <option>Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Fashion">Fashion</option>
              <option value="Photography">Photography</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Sports">Sports</option>
              <option value="Movie">Movie</option>
              <option value="News">News</option>
              <option value="Sports">Finance</option>
            </select>
            <h3>Choose a Blog title image below</h3>
            <FileBase64
              type="file"
              multiple={false}
              style={{ padding: '10px' }}
              onDone={({ base64 }) => setItem({ ...item, image: base64 })}
            />

            <textarea
              placeholder="Enter your blog content"
              onChange={(e) => {
                setItem({ ...item, content: e.target.value });
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <button className="submit-blog-button">POST</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
