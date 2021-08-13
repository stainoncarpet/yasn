import React from 'react';

import Heading from '../common/Heading/Heading';

const About = () => {
    return (
        <section className="section">
            <Heading type={1}>About</Heading>
            <h2 className="subtitle">
                Nothing too fancy. All of a sudden I decided to create my own social network site because it's cool. I admit, this design probably leaves much to be desired, but I am not a visual visionary.
            </h2>
        </section>
    );
};

export default About;