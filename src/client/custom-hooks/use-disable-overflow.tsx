import React from 'react';

const useDisableOverflow = () => {
    React.useEffect(() => {
        //@ts-ignore
        document.body.parentNode.style.overflow = "hidden";

        //@ts-ignore
        document.body.parentNode.classList.toggle("hidden");

        return () => {
            //@ts-ignore
            document.body.parentNode.style.overflow = "initial";

            //@ts-ignore
            document.body.parentNode.classList.toggle("hidden");
        };
    }, [])
};

export default useDisableOverflow;
