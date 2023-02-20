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
  const [noBlog, setNoBlog] = useState(false);
  const toastId = React.useRef(null);

  const fetchData = () => {
    axios
      .get('https://blogger-app-gomr.onrender.com/fetch-blog')
      .then((res) => {
        console.log(res);
        setHomeItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchUserData = () => {
    axios
      .get(`https://blogger-app-gomr.onrender.com/users/fetch-userblog/${id}`)
      .then((res) => {
        if (res.data.length == 0) {
          setNoBlog(true);
        }
        setHomeItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = (title) => {
    console.log(title);
    axios
      .put(
        `https://blogger-app-gomr.onrender.com/users/delete-blog/${id}?blogTitle=${title}`
      )
      .then((res) => {
        toast.success('Blog deleted', { onClick: window.location.reload() });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBlogCategory = (blogCategory) => {
    axios
      .post(
        `https://blogger-app-gomr.onrender.com/users/getblog-category/${id}`,
        {
          category: blogCategory,
        }
      )
      .then((res) => {
        if (res.data.length == 0) {
          setNoBlog(true);
          setHomeItems(null);
        } else {
          setNoBlog(false);
          setHomeItems(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchHomeBlogCategory = (blogCategory) => {
    axios
      .post(`https://blogger-app-gomr.onrender.com/fetchblog-category`, {
        category: blogCategory,
      })
      .then((res) => {
        if (res.data.length == 0) {
          setNoBlog(true);
          setHomeItems(null);
        } else {
          setNoBlog(false);
          setHomeItems(res.data);
        }
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
  }, []);

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (id) {
                fetchBlogCategory(e.target[0].value);
              } else {
                fetchHomeBlogCategory(e.target[0].value);
              }
            }}
          >
            <select>
              <option>Search By Category</option>
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
              <option value="Finance">Finance</option>
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
        {noBlog ? (
          <div className="noblogfound-div">
            <h1>NO BLOGS FOUND!! </h1>
            <h4>CLICK ON THE BELOW BUTTON TO START CREATING YOUR OWN BLOG!!</h4>
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
          </div>
        ) : (
          <></>
        )}
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
