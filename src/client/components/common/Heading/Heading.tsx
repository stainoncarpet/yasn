import React from 'react';

const Heading = ({type = 1, isCentered = false, children}) => {
    switch(type){
        case 1: 
            return <h1 className={isCentered 
                                            ? "title is-size-1-desktop is-size-1-tablet is-size-2-mobile has-text-centered mb-5" 
                                            : "title is-size-1-desktop is-size-1-tablet is-size-2-mobile mb-5"}>
                        {children}
                    </h1>
        case 2: 
            return <h2 className={isCentered 
                                            ? "title is-size-2-desktop is-size-3-desktop is-size-3-mobile has-text-centered mb-5" 
                                            : "title is-size-2-desktop is-size-3-desktop is-size-3-mobile mb-5"}>
                        {children}
                    </h2>
        case 3: 
            return <h3 className={isCentered 
                                            ? "title is-size-3-desktop is-size-4-tablet is-size-4-mobile has-text-centered mb-5" 
                                            : "title is-size-3-desktop is-size-4-tablet is-size-4-mobile mb-5"}>
                        {children}
                    </h3>
        default: 
            return <h3 className={isCentered ? "title is-size-3 has-text-centered mb-5" : "title is-size-3 mb-5"}>{children}</h3>
    }
};

export default Heading;