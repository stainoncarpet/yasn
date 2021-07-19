const tokenator = {
    setToken: (id, token) => {
        window.localStorage.setItem(`${id}`, `${token}`)
    },
    removeToken: () => {
        window.localStorage.clear();
    }
};


export default tokenator;