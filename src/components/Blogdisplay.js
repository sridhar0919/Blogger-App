import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './css/Blogdisplay.css';
import blogDisplayImg from './images/photo-1432821596592-e2c18b78144f.avif';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Blogdisplay() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const [blog, setBlog] = useSearchParams();

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/get-blog/${id}`)
      .then((res) => {
        console.log(res);
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserData = () => {
    const blogTitle = blog.get('title');
    console.log(blogTitle);
    axios
      .get(
        `http://localhost:4000/users/fetch-currentblog/${id}?title=${blogTitle}`
      )
      .then((res) => {
        console.log(res);
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (blog.get('title')) {
      fetchUserData();
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="blogdisplay-backbutton">
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          <i class="fa-solid fa-arrow-left-long"></i>&nbsp;&nbsp;Go Back
        </button>
      </div>
      {item && (
        <div className="blogdiplay-totalcontent">
          <p>Published&nbsp;{item.publishedDate}</p>
          <h1>{item.blogTitle}</h1>
          <p className="blogdisplay-category">{item.category}</p>
          <div className="blogdisplay-mainimg">
            <img src={item.image} alt="" />
          </div>
          <div className="blogdisplay-wordcontent">
            <p>{item.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
