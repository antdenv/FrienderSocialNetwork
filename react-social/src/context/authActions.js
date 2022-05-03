export const LoginStart = () => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const Follow = (userId) => ({
    type: 'FOLLOW',
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: 'UNFOLLOW',
    payload: userId,
});

export const FeedUpdated = (bool) => ({
    type: 'FEED_UPDATED',
    payload: bool,
});

export const EditProfile = (bool) => ({
    type: 'EDIT_PROFILE',
    payload: bool,
});