import React from 'react';

import Heading from '../common/Heading/Heading';

const TermsOfService = () => {
  return (
    <section className="section">
      <div className="content is-normal">
        <Heading type={1}>Some generic terms of service</Heading>
        <h2 className="title is-size-2">Read carefully</h2>
        <ul>
          <li>Term 1</li>
          <li>Term 2</li>
          <li>Term 3</li>
        </ul>
      </div>
    </section>
  );
};

export default TermsOfService;
