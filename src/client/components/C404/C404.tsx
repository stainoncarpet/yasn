import React from 'react';

import Heading from '../common/Heading/Heading';

//@ts-ignore
import image from "./not-found.jpg";

const C404: React.FC<{}> = () => {
    return (
        <section className="section">
            <div className="content is-normal">
                <div className="has-text-centered">
                    <img src={image} alt="" style={{maxWidth: "100%"}} />
                    <Heading type={3}>Page couldn't be found :\</Heading>
                </div>
            </div>
        </section>
    );
};

export default C404;