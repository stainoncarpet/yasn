import tokenator from "../../../helpers/tokenator";

const removeAuth = () => {
    tokenator.removeToken();
    
    return {type: "REMOVE_AUTH"};
};

export default removeAuth;