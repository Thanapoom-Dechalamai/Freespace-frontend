import React, { useEffect, useState } from 'react';
import ProfileImage from '../profileImage';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { useIsClientUser } from '../../hooks/users';
import { useDeletePostMutation, useGetPostByIdQuery, useLikePostMutation, useUnlikePostMutation } from '../../redux/apiSlice';
import { useSelector } from 'react-redux';
import { formatTimeAgo } from '../../hooks/tools';
import LikesListModal from '../modals/postLikesModal';
import PostReplyModal from '../modals/postReplyModal';
import { useNavigate } from 'react-router';
import PostRepliesModal from '../modals/postRepliesModal';
import RepostButton from '../button/repostButton';
import { Dropdown } from 'react-bootstrap';

const Post = ({ post, interaction = true, className }) =>
{
    const navigate = useNavigate();
    const profile = post?.profile;
    const { data, isError } = useGetPostByIdQuery(post?.repost, { skip: !post?.repost });
    let repost = data?.result;
    const isClient = useIsClientUser(profile?.username);
    const user = useSelector(state => state.authentication.user);
    const [like] = useLikePostMutation();
    const [unlike] = useUnlikePostMutation();
    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [isRepliesModalOpen, setIsRepliesModalOpen] = useState(false);
    const [deletePost] = useDeletePostMutation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const gotoProfile = () =>
    {
        navigate(`/profile?username=${profile?.username}`);
    };
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() =>
    {
        const isUserLiked = post?.likes?.some((userId) => userId === user?.userId);
        setIsLiked(isUserLiked);
    }, [post?.likes, user]);

    const handleLike = async () =>
    {
        if (isLiked)
        {
            await unlike(post?._id);
        } else
        {
            await like(post?._id);
        }
        setIsLiked(!isLiked);
    };
    const createdAt = new Date(post?.createdAt);
    const timeAgo = formatTimeAgo(createdAt);
    return (
        <>
            <div className={`d-flex mb-3 ${className}`}>
                <ProfileImage
                    className="mt-1 pointer"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    src={profile?.picture}
                    onClick={gotoProfile}
                />
                <div className="d-flex justify-content-between flex-grow-1 ms-2 d-inline-block mb-3">
                    <div className="flex-grow-1">
                        <div className='d-flex justify-content-between'>
                            <p
                                className="m-0 mb-1 fw-bold underline pointer"
                                onClick={gotoProfile}
                            >
                                {profile?.username}
                            </p>
                            <div>
                                <span className="me-3 opacity-50">{timeAgo}</span>
                                {isClient && (
                                    <Dropdown
                                        show={isDropdownOpen}
                                        onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
                                        className='d-inline'
                                    >
                                        <Dropdown.Toggle variant="transparent" className="pointer p-0">
                                            {/* "Three Dots" icon */}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={async () =>
                                                {
                                                    await deletePost(post?._id);
                                                    repost = null;
                                                    setIsDropdownOpen(false); // Close the dropdown after deletion
                                                }}
                                            >
                                                Delete
                                            </Dropdown.Item>
                                            {/* Add other dropdown items as needed */}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </div>
                        </div>
                        <p className="m-0 mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                            {post?.content}
                        </p>
                        {repost && !isError &&
                            <div className='border rounded mb-3'>
                                <Post className='mt-2' post={repost} interaction={false} />
                            </div>
                        }
                        {isError &&
                            <div className='d-flex justify-content-center align-items-center border rounded mb-3 opacity-75'
                                style={{ height: '5rem' }}
                            >
                                Content not available
                            </div>
                        }

                        {interaction && (
                            <div className='d-flex gap-3'>
                                <div className='pointer' onClick={handleLike}>
                                    {isLiked ?
                                        <AiFillHeart style={{ width: "1.5rem", height: "1.5rem", color: "#FA383E" }} /> :
                                        <AiOutlineHeart style={{ width: "1.5rem", height: "1.5rem" }} />
                                    }
                                </div>
                                <div className='pointer' onClick={() => setIsReplyModalOpen(true)}>
                                    <AiOutlineComment style={{ width: "1.5rem", height: "1.5rem", transform: "scaleX(-1)" }} />
                                </div>
                                <div className='pointer'>
                                    <RepostButton style={{ width: "1.3rem", height: "1.3rem" }} post={post} />
                                </div>
                            </div>
                        )}
                        <div className='opacity-50 mt-2'>
                            {
                                post?.comments.length > 0 &&
                                <span className='pointer underline' onClick={() =>
                                {
                                    setIsRepliesModalOpen(true);
                                }}>
                                    {post?.comments.length} {post?.comments.length > 1 ? 'replies' : 'reply'}</span>
                            }
                            {
                                post?.comments.length > 0 && post?.likes.length > 0 &&
                                <span> · </span>
                            }
                            {
                                post?.likes.length > 0 &&
                                <span className='pointer underline' onClick={() => setIsLikesModalOpen(true)}>{post?.likes.length} {post?.likes.length > 1 ? 'likes' : 'like'}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LikesListModal show={isLikesModalOpen} onHide={() => setIsLikesModalOpen(false)} likes={post?.likes} />
            <PostReplyModal show={isReplyModalOpen} onHide={() => setIsReplyModalOpen(false)} post={{ ...post, timeAgo }} />
            <PostRepliesModal show={isRepliesModalOpen} onHide={() => setIsRepliesModalOpen(false)} post={post} />
        </>
    );
};

export default Post;
