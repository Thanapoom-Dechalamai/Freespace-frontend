import { useSelector } from "react-redux";
import UserProfile from "../userProfile";

const UserListContainer = ({ profiles, showClient = true }) =>
{
    const username = useSelector((state) => state.authentication.user?.username);

    if (!profiles || !Array.isArray(profiles) || profiles.length === 0)
    {
        return (
            <div className="text-center opacity-75">
                <p>Oops, it seems like no one is here.</p>
            </div>
        );
    }

    // Filter out the client user if it exists
    const filteredProfiles = profiles.filter((profile) => profile.username !== username);

    // If showClient is true and the client user exists, add it to the beginning
    if (showClient && username)
    {
        const clientUser = profiles.find((profile) => profile.username === username);
        if (clientUser)
        {
            filteredProfiles.unshift(clientUser);
        }
    }

    return (
        <div>
            {filteredProfiles.map((profile) => (
                <UserProfile key={profile?.userId} profile={profile} />
            ))}
        </div>
    );
};

export default UserListContainer;
