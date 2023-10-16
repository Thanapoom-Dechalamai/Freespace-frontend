import React, { useEffect, useState } from 'react';
import ProfileImage from '../profileImage';
import { useIsClientUser } from '../../hooks/users';
import { useNavigate } from 'react-router';
import { formatTimeAgo } from '../../hooks/tools';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDeleteCommentMutation, useLikeReplyMutation, useUnlikeReplyMutation } from '../../redux/apiSlice';
import { useSelector } from 'react-redux';
import LikesListModal from '../modals/postLikesModal';
import { Dropdown } from 'react-bootstrap';

const Reply = (props) =>
{
    const { reply, postId } = props;
    const user = useSelector(state => state.authentication.user);
    const isClient = useIsClientUser(reply?.profile?.username);
    const navigate = useNavigate();
    const gotoProfile = (username) =>
    {
        navigate(`/profile?username=${username}`);
    };
    const createdAt = new Date(reply?.createdAt);
    const timeAgo = formatTimeAgo(createdAt);
    const [like] = useLikeReplyMutation();
    const [unlike] = useUnlikeReplyMutation();
    const [isLiked, setIsLiked] = useState(false);
    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
    const [deleteComment] = useDeleteCommentMutation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleLike = async () =>
    {
        if (isLiked)
        {
            await unlike({ postId, userId: reply?.profile?.userId });
        } else
        {
            await like({ postId, userId: reply?.profile?.userId });
        }
        setIsLiked(!isLiked);
    };
    useEffect(() =>
    {
        const isUserLiked = reply?.likes?.some((userId) => userId === user?.userId);
        setIsLiked(isUserLiked);
    }, [reply?.likes, user]);

    return (
        <>
            <div>
                <div className='d-flex mb-3'>
                    <ProfileImage
                        className="mt-1 pointer"
                        style={{ width: "2.5rem", height: "2.5rem" }}
                        src={reply?.profile?.picture}
                        onClick={() => gotoProfile(reply?.profile?.username)}
                    />
                    <div className="d-flex justify-content-between flex-grow-1 ms-2 d-inline-block underline-container-gray">
                        <div className="mb-3 flex-grow-1">
                            <div className='d-flex justify-content-between'>
                                <p
                                    className="m-0 mb-1 fw-bold underline pointer"
                                    onClick={() => gotoProfile(reply?.profile?.username)}
                                >
                                    {reply?.profile?.username}
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
                                                        const dataObj = {
                                                            postId,
                                                            commentId: reply?._id,
                                                        };
                                                        await deleteComment(dataObj);
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
                            <div className='d-flex justify-content-between'>
                                <p className="m-0 mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                                    {reply?.content}
                                </p>
                                <div className='pointer' onClick={handleLike}>
                                    {isLiked ?
                                        <AiFillHeart style={{ width: "1.5rem", height: "1.5rem", color: "#FA383E" }} /> :
                                        <AiOutlineHeart style={{ width: "1.5rem", height: "1.5rem" }} />
                                    }
                                </div>
                            </div>
                            {
                                reply?.likes?.length > 0 &&
                                <span className='opacity-50 pointer underline' onClick={() => setIsLikesModalOpen(true)}>
                                    {reply?.likes?.length} likes
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LikesListModal
                show={isLikesModalOpen}
                onHide={() => setIsLikesModalOpen(false)}
                likes={reply?.likes}
            />
        </>
    );
};

export default Reply;