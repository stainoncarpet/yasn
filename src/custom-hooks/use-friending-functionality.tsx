import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { startConversation, cancelFriendship, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, withdrawFriendRequest } from '../redux/slices/user/thunks';

const useFriendingFunctionality = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSendFriendRequest = (userName) => dispatch(sendFriendRequest({ userName: userName }));

    const handleWithdrawFriendRequest = (fshipId) => dispatch(withdrawFriendRequest({fshipId: fshipId }));

    const handleCancelFriendship = (fshipId) => dispatch(cancelFriendship({fshipId: fshipId }));

    const handleAcceptFriendRequest = (fshipId) => dispatch(acceptFriendRequest({fshipId: fshipId}));

    const handleRejectFriendRequest = (fshipId) => dispatch(rejectFriendRequest({fshipId: fshipId}));

    const handleSendMessage = async (userName) => { 
        const {payload}: any = await dispatch(startConversation({userName}));
        
        history.push(`/conversations/${payload.conversation._id}`);
    };

    return [handleSendFriendRequest, handleWithdrawFriendRequest, handleCancelFriendship, handleAcceptFriendRequest, handleRejectFriendRequest, handleSendMessage];
};

export default useFriendingFunctionality;
