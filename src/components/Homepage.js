import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './css/Homepage.css';
import cardImg1 from './images/photo-1453928582365-b6ad33cbcf64.avif';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Homepage() {
  const navigate = useNavigate();
  var id = sessionStorage.getItem('user_id');
  const [homeItems, setHomeItems] = useState(null);
  const toastId = React.useRef(null);

  const fetchData = () => {
    axios
      .get('http://localhost:4000/fetch-blog')
      .then((res) => {
        console.log(res);
        setHomeItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchUserData = () => {
    axios
      .get(`http://localhost:4000/users/fetch-userblog/${id}`)
      .then((res) => {
        setHomeItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = (title) => {
    console.log(title);
    axios
      .put(`http://localhost:4000/users/delete-blog/${id}?blogTitle=${title}`)
      .then((res) => {
        toast.success('Blog deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchUserData();
    } else {
      fetchData();
    }
  }, [homeItems]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <section className="home-section">
        <div className="home-headtop">
          <div>
            <h1>Publish your passions, your way</h1>
          </div>
          <div>
            <h4>Create a unique and beautiful blog. It's easy and free.</h4>
          </div>
        </div>
        <div className="home-category-option">
          <form>
            <select>
              <option>Search By Category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="health">Health</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="fashion">Fashion</option>
              <option value="photography">Photography</option>
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="sports">Sports</option>
              <option value="movie">Movie</option>
              <option value="news">News</option>
              <option value="sports">Finance</option>
            </select>
            <button>GO</button>
            <button
              onClick={(e) => {
                if (id) {
                  navigate(`/create-blog/${id}`);
                } else {
                  e.preventDefault();
                  navigate('/');
                  toast.error('Login first to create your blog!!');
                }
              }}
            >
              CREATE YOUR BLOG
            </button>
          </form>
        </div>
      </section>
      <article className="home-maincontent">
        <div className="home-contentinsidemain">
          {homeItems &&
            homeItems.map((item, index) => {
              return (
                <div className="home-card" key={index}>
                  <img src={item.image} alt="card-img1" />
                  <div className="home-card-content">
                    <div className="homecard-category">
                      <p>{item.category}</p>
                    </div>
                    <h3>{item.blogTitle}</h3>
                    <p className="home-card-contentfull">{item.content}</p>
                    <div className="home-card-button">
                      <button
                        type="submit"
                        onClick={() => {
                          if (id) {
                            navigate(
                              `/view-blog/${id}?title=${item.blogTitle}`
                            );
                          } else {
                            navigate(`/view-blog/${item._id}`);
                          }
                        }}
                      >
                        Read More&nbsp;&nbsp;&nbsp;&gt;&gt;
                      </button>
                    </div>
                    {id && (
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          deleteHandler(item.blogTitle);
                        }}
                      >
                        Delete&nbsp;&nbsp;<i class="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </article>
      <Footer />
    </div>
  );
}
