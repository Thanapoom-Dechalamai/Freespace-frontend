import { useSelector } from 'react-redux';
import { useGetProfileImageQuery, useGetProfileQuery } from '../../redux/apiSlice';
import { useNavigate } from 'react-router';

export const useIsAuthenticated = () =>
{
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    return isAuthenticated;
};

export const useGetProfile = (username) =>
{
    const { data, error, isLoading } = useGetProfileQuery(username, { skip: !username });

    if (isLoading)
    {
        return { isLoading: isLoading };
    }

    if (error)
    {
        return { error: error };
    }

    return { ...data?.result };
};

export const useGetProfileImage = (userId) =>
{
    const { data, error, isLoading } = useGetProfileImageQuery(userId, { skip: !userId });

    if (isLoading)
    {
        return { isLoading: isLoading };
    }

    if (error)
    {
        console.error(error);
        return { error: error };
    }

    return data?.result;
};
export const useIsClientUser = (username) =>
{
    return username === useSelector((state) => state.authentication.user?.username);
};
export const useIsFollowing = (userId) =>
{
    return useSelector((state) => state.authentication.user?.following)?.includes(userId);
};
export const useIsFollowedByUser = (userId) =>
{
    return useSelector((state) => state.authentication.user?.followers)?.includes(userId);
};
