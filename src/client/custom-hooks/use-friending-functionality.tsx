import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import userSlice from '../redux/slices/user/user';
import { startConversation } from '../redux/slices/user/thunks';

const useFriendingFunctionality = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sendFriendRequest = userSlice.actions['server/send/frequest'];
    const cancelFriendship = userSlice.actions["server/cancel/friendship"];
    const acceptFriendRequest = userSlice.actions["server/accept/frequest"];
    const rejectFriendRequest = userSlice.actions["server/reject/frequest"];
    const withdrawFriendRequest = userSlice.actions["server/withdraw/frequest"];

    const handleSendFriendRequest = (userName, token) => dispatch(sendFriendRequest({ userName: userName, senderToken: token }));

    const handleWithdrawFriendRequest = (token, fshipId) => dispatch(withdrawFriendRequest({ withdrawerToken: token, fshipId: fshipId }));

    const handleCancelFriendship = (token, fshipId) => dispatch(cancelFriendship({ cancelerToken: token, fshipId: fshipId }));

    const handleAcceptFriendRequest = (token, fshipId) => dispatch(acceptFriendRequest({accepterToken: token, fshipId: fshipId}));

    const handleRejectFriendRequest = (token, fshipId) => dispatch(rejectFriendRequest({rejecterToken: token, fshipId: fshipId}));

    const handleSendMessage = async (userName, token) => { 
        const {payload}: any = await dispatch(startConversation({userName, token}));
        
        history.push(`/conversations/${payload.conversation._id}`);
    };

    return [handleSendFriendRequest, handleWithdrawFriendRequest, handleCancelFriendship, handleAcceptFriendRequest, handleRejectFriendRequest, handleSendMessage];
};

export default useFriendingFunctionality;
