import React from 'react';

const Heading1 = (props) => {
    return (
        <h1 className="title is-size-1 mb-5">{props.children}</h1>
    );
};

export default Heading1;
