import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
    {blogs && blogs.length > 0 ? (
      blogs.map((blog) => (
        <BlogCard
          id={blog._id}
          isUser={true}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={blog.user.username}
          time={blog.createdAt}
        />
      ))
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <h1 style={{ color: 'white' }}>You Haven't Created a Blog</h1>
  <button style={{
    background: 'linear-gradient(to right, red, black)', // Linear gradient from red to black
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px', // Add some top margin to separate the h1 and the button
  }}>
    <Link to="/create-blog" style={{ textDecoration: 'none', color: 'white' }}>
      Create you first Blog
    </Link>
  </button>
</div>


    )}
  </div>
  
  );
};

export default UserBlogs;
