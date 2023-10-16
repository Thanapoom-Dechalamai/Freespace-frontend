import React from 'react';
import PostContainer from '../../components/postContainer';
import { useGetAllPostsQuery } from '../../redux/apiSlice';

function HomePage()
{
    const { data } = useGetAllPostsQuery();
    const posts = data?.result;
    return (
        <main className="page container">
            <PostContainer posts={posts} />
        </main>
    );
}

export default HomePage;