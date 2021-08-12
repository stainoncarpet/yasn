import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const useStringParser = () => {

    const parseEventContent = (contentArray, eventId): Array<ReactElement> => {
        const parsed = (JSON.parse(contentArray)).map((obj, i) => {
            if(obj.type === "link") {
                return <Link to={obj.href} key={eventId}>{obj.anchor}</Link>
            } else {
                return <span key={i}>{obj.content}</span>
            }
        });
    
        return parsed;
    };

    return parseEventContent;
};

export default useStringParser;




