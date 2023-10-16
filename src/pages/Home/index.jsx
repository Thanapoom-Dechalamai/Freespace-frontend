import React from 'react';
import PostContainer from '../../components/postContainer';
import { useGetAllPostsQuery } from '../../redux/apiSlice';

function HomePage()
{
    const { data } = useGetAllPostsQuery();
    const posts = data?.result;
    let sortedPosts = Array.isArray(posts) ? [...posts].reverse() : [];
    return (
        <main className="page container">
            <PostContainer posts={sortedPosts} />
        </main>
    );
}

export default HomePage;