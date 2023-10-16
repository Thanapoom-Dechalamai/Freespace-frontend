import { useFollowMutation, useUnfollowMutation } from "../../../redux/apiSlice";
import { useIsFollowedByUser, useIsFollowing } from "../../../hooks/users";
import OutlineButton from "../outlineButton";
import PrimaryButton from "../primaryButton";

const FollowButton = (props) =>
{
    const { targetId, style, className } = props;
    const isFollowing = useIsFollowing(targetId);
    const isFollowed = useIsFollowedByUser(targetId);

    const [follow] = useFollowMutation();
    const [unfollow] = useUnfollowMutation();
    const handleFollow = async () =>
    {
        await follow(targetId);
    };
    const handleUnFollow = async () =>
    {
        await unfollow(targetId);
    };

    return (
        <>
            {
                isFollowing ?
                    <OutlineButton style={style} className={className} onClick={handleUnFollow} text="Following" /> :
                    isFollowed ?
                        <PrimaryButton style={style} className={className} onClick={handleFollow} text="Follow back" /> :
                        <OutlineButton style={style} className={className} onClick={handleFollow} text="Follow" />
            }
        </>
    );
};

export default FollowButton;