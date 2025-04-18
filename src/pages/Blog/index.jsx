import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Blog = () => {
    const api = import.meta.env.VITE_API;
    const token = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN;

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}user/blog?access_token=${token}&search=`, {

                });

                console.log('API javobi:', response.data); 

                if (response.data && response.data.data) {
                    const blogsData = response.data.data;
                    setBlogs(blogsData); 
                
                    localStorage.setItem('blogs', JSON.stringify(blogsData));
                } else {
                    setBlogs([]); 
                }
            } catch (error) {
                console.error('Xatolik yuz berdi:', error);
                setError('Maʼlumotni olib kelishda xatolik yuz berdi.');
            } finally {
                setLoading(false);
            }
        };

        const storedBlogs = localStorage.getItem('blogs');
        if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs)); 
        } else {
            fetchData();
        }
    }, []);

    if (loading) {
        return <p>⏳ Lodding...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <div className="max-w-[800px] text-center mx-auto">
                <h1 className='text-[30px] text-[#000000] font-bold mt-[20px]'>My Feed</h1>
                <input className='w-[700px] border hover:border-blue-500 p-[10px] mt-[18px] rounded-md' type="text" placeholder='Search...' />
            </div>

            <h2>Bloglar ro'yxati</h2>

            {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                    </div>
                ))
            ) : (
                <p>Hech qanday blog topilmadi.</p>
            )}
        </div>
    );
};

export default Blog;
