const tokenator = {
    setToken: (id, token) => {
        window.localStorage.setItem(`${id}`, `${token}`)
    },
    removeToken: () => {
        window.localStorage.clear();
    },
    getToken: () => {

    }
};


export default tokenator;