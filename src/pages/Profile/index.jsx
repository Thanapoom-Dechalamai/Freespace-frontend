import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Row, Col, Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useGetProfile, useGetProfileImage, useIsClientUser } from "../../hooks/users";
import OutlineButton from "../../components/button/outlineButton";
import EditProfileModal from "../../components/modals/editProfileModal";
import FollowListModal from "../../components/modals/followListModal";
import ProfileImage from "../../components/profileImage";
import FollowButton from "../../components/button/followButton";
import CopyButton from "../../components/button/copyButton";
import 'react-toastify/dist/ReactToastify.css';
import PostContainer from "../../components/postContainer";
import { useGetPostsByUserIdQuery } from "../../redux/apiSlice";

function ProfilePage()
{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let user = useSelector((state) => state.authentication.user);
    let username = queryParams.get('username') ?? user?.username;
    let profile = useGetProfile(username);
    const isClient = useIsClientUser(username);
    const follwersPic = useGetProfileImage(profile?.followers ? profile?.followers[0] : "");
    const [editModalShow, setEditModalShow] = useState(false);
    const [followListModalShow, setFollowListModalShow] = useState(false);
    const { data } = useGetPostsByUserIdQuery(profile?.userId, { skip: !profile?.userId });
    const posts = data?.result;
    let sortedPosts = Array.isArray(posts) ? [...posts].reverse() : [];

    useEffect(() =>
    {
        setEditModalShow(false);
        setFollowListModalShow(false);

    }, [window.location.href]);

    if (profile?.isLoading)
    {
        return (
            <main className="page container">
                <div className="d-flex justify-content-center">
                    <h2>Loading profile...</h2>
                </div>
            </main>
        );
    }

    if (profile?.error)
    {
        return (
            <main className="page container">
                <div className="text-center">
                    <h1>{profile?.error?.status}</h1>
                    <h3>{profile?.error?.data?.message}</h3>
                </div>
            </main>
        );
    }


    return (
        <main className="page container">
            <Container>
                {/* User info */}
                <Row>
                    <Col xs={8}>
                        <div className="d-flex flex-column h-100 justify-content-center">
                            <p className="m-0 fw-bold fs-4 overflow-hidden">{profile?.firstname}</p>
                            <p className="m-0">{profile?.username}</p>
                        </div>
                    </Col>
                    <Col xs={4} className="d-flex justify-content-end align-items-start p-0">
                        <ProfileImage style={{ display: "inline-block", width: "6rem", height: "6rem" }} src={profile?.picture} />
                    </Col>
                </Row>
                {/* Bio */}
                <Row>
                    <Col>
                        <p className="m-0 mt-2 long-text">{profile?.caption}</p>
                    </Col>
                </Row>
                {/* Follower */}
                <Row>
                    <Col className="mt-3">
                        <div className="pointer underline" onClick={() => setFollowListModalShow(true)}>
                            {follwersPic === undefined ?
                                null :
                                <ProfileImage style={{ display: "inline-block", width: "16px", height: "16px" }} src={follwersPic} />
                            }
                            <span className="opacity-50 ms-1">{profile?.followers?.length.toLocaleString('en-US')} followers</span>
                        </div>
                    </Col>
                </Row>
                {/* Interactions button */}
                <Row className="mt-2 gap-3 ps-2 pe-2">
                    <Col className="p-0 d-flex justify-content-center">
                        {isClient ?
                            <OutlineButton onClick={() => setEditModalShow(true)} text="Edit profile" /> :
                            <FollowButton targetId={profile?.userId} />
                        }
                    </Col>
                    <Col className="p-0 d-flex justify-content-center">
                        <CopyButton text="Share profile" value={window.location.host + `/profile?username=${username}`} />
                    </Col>
                </Row>
                {/* Threads */}
                <Row className="mt-2">
                    <Col className="p-0">
                        <div className="w-100 d-flex justify-content-center align-items-center threads-header">
                            Threads
                        </div>
                    </Col>
                </Row>
                <div className="mt-3">
                    <PostContainer posts={sortedPosts} />
                </div>
                {/* Edit profile modal */}
                <EditProfileModal
                    profile={profile}
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                />
                {/* Follow list modal */}
                <FollowListModal
                    show={followListModalShow}
                    onHide={() => setFollowListModalShow(false)}
                    profile={profile}
                />
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </main >
    );
}

export default ProfilePage;
