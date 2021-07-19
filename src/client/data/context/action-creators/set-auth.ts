import tokenator from "../../../helpers/tokenator";

const setAuth = (id, token, shouldUpdateStorage = true, avatar = null) => {
    if (shouldUpdateStorage && (id && token)) {
        tokenator.setToken(id, token);
    } else if (shouldUpdateStorage && (!id || !token)) {
        tokenator.removeToken();
    }

    return {type: "SET_AUTH", id, token, avatar}
}

export default setAuth;