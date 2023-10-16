import { useIsClientUser } from "../../hooks/users";
import { useNavigate } from 'react-router-dom';
import FollowButton from "../button/followButton";
import ProfileImage from "../profileImage";

const UserProfile = ({ profile }) =>
{
    const isClient = useIsClientUser(profile.username);
    const navigate = useNavigate();

    const gotoProfile = () =>
    {
        navigate(`/profile?username=${profile.username}`);
    };

    return (
        <div className="d-flex mb-3">
            <ProfileImage
                className="mt-1 pointer"
                style={{ width: "2.5rem", height: "2.5rem" }}
                src={profile?.picture}
                onClick={gotoProfile}
            />
            <div className="d-flex justify-content-between flex-grow-1 ms-2 d-inline-block underline-container-gray">
                <div className="mb-3">
                    <p
                        className="m-0 fw-bold underline pointer"
                        onClick={gotoProfile}
                    >
                        {profile?.username}
                    </p>
                    <p className="m-0 opacity-50">
                        {profile?.firstname} {profile?.lastname}
                    </p>
                </div>
                <div>
                    {!isClient && (
                        <FollowButton
                            style={{ width: "7rem" }}
                            className="mt-2"
                            targetId={profile?.userId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
