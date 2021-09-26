import React from 'react';
import { useSelector } from 'react-redux';

import { IStoreState } from '../interfaces/state/i-store-state';

const useDisableOverflow = () => {
    const isShown = useSelector((state: IStoreState) => state.misc.portal.isShown);

    React.useEffect(() => {
        //@ts-ignore
        document.body.parentNode.style.overflow = "hidden";

        //@ts-ignore
        document.body.parentNode.classList.toggle("hidden");

        return () => {
            //@ts-ignore
            document.body.parentNode.style.overflow = "scroll";

            //@ts-ignore
            document.body.parentNode.classList.toggle("hidden");
        };
    }, [isShown])
};

export default useDisableOverflow;