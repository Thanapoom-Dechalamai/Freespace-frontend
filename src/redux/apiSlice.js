import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, { getState }) =>
        {
            const token = getState().authentication.accessToken;
            if (token)
            {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        getAvatars: builder.query({
            query: () => ({
                url: `/image/getAllAvatars`,
            })
        }),
        getUserInfo: builder.query({
            query: () => ({
                url: '/user/getUserInfo',
            }),
            providesTags: ['Profile']
        }),
        getAllProfiles: builder.query({
            query: () => ({
                url: `/profile/getAll`,
            }),
            providesTags: ['Profile']

        }),
        getProfile: builder.query({
            query: (username) => ({
                url: `/profile/getOne?username=${username}`,
            }),
            providesTags: ['Profile']

        }),
        getProfileImage: builder.query({
            query: (userId) => ({
                url: `/profile/getImage?userId=${userId}`,
            }),
            invalidatesTags: ['Profile']
        }),
        getProfileListByUsers: builder.query({
            query: (usersId) => ({
                url: '/profile/getProfileByUsers',
                method: 'POST',
                body: {
                    usersId
                },
            }),
        }),
        editProfile: builder.mutation({
            query: (profile) => ({
                url: '/profile/edit',
                method: 'PUT',
                body: profile,
            }),
            invalidatesTags: ['Profile']
        }),
        follow: builder.mutation({
            query: (userId) => ({
                url: '/profile/follow',
                method: 'PUT',
                body: {
                    userId
                },
            }),
            invalidatesTags: ['Profile']
        }),
        unfollow: builder.mutation({
            query: (userId) => ({
                url: '/profile/unfollow',
                method: 'PUT',
                body: {
                    userId
                },
            }),
            invalidatesTags: ['Profile']
        }),
        getAllPosts: builder.query({
            query: () => ({
                url: '/post/getAll',
            }),
            providesTags: ['Post']
        }),
        getPostById: builder.query({
            query: (postId) => ({
                url: `/post/getOne?postId=${postId}`,
            }),
            providesTags: ['Post']
        }),
        getPostsByUserId: builder.query({
            query: (userId) => ({
                url: `/post/getPostsByUserId?userId=${userId}`,
            }),
            providesTags: ['Post']
        }),
        repost: builder.mutation({
            query: (payload) =>
            {
                console.log(payload);
                return ({
                    url: `/post/create`,
                    method: 'POST',
                    body: {
                        content: payload.content,
                        repost: payload.repost,
                    }
                });
            },
            invalidatesTags: ['Post']
        }),
        createPost: builder.mutation({
            query: (content) =>
            {
                const body = {
                    content: content
                };
                console.log(body);
                return ({
                    url: `/post/create`,
                    method: 'POST',
                    body
                });
            },
            invalidatesTags: ['Post']
        }),
        likePost: builder.mutation({
            query: (postId) => ({
                url: `/post/like?postId=${postId}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Post']
        }),
        unlikePost: builder.mutation({
            query: (postId) => ({
                url: `/post/unlike?postId=${postId}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Post']
        }),
        replyPost: builder.mutation({
            query: (payload) => ({
                url: `/post/comment/create?postId=${payload.postId}`,
                method: 'PUT',
                body: {
                    content: payload.content
                }
            }),
            invalidatesTags: ['Post']
        }),
        likeReply: builder.mutation({
            query: (payload) => ({
                url: `/post/comment/like?postId=${payload?.postId}`,
                method: 'PUT',
                body: {
                    userId: payload?.userId
                }
            }),
            invalidatesTags: ['Post']
        }),
        unlikeReply: builder.mutation({
            query: (payload) => ({
                url: `/post/comment/unlike?postId=${payload?.postId}`,
                method: 'PUT',
                body: {
                    userId: payload?.userId
                }
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/post/delete?postId=${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        }),
        deleteComment: builder.mutation({
            query: (payload) => ({
                url: `/post/comment/delete?postId=${payload.postId}&commentId=${payload.commentId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Post']
        }),
    }),
});

export const {
    useGetUserInfoQuery,
    useGetProfileQuery,
    useLoginMutation,
    useRegisterMutation,
    useEditProfileMutation,
    useGetAvatarsQuery,
    useFollowMutation,
    useUnfollowMutation,
    useGetProfileImageQuery,
    useGetProfileListByUsersQuery,
    useGetAllProfilesQuery,
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useGetPostsByUserIdQuery,
    useLikePostMutation,
    useUnlikePostMutation,
    useReplyPostMutation,
    useLikeReplyMutation,
    useUnlikeReplyMutation,
    useCreatePostMutation,
    useRepostMutation,
    useDeletePostMutation,
    useDeleteCommentMutation
} = api;

export default api;
