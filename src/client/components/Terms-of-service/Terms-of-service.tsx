import React from 'react';

import Heading from '../common/Heading/Heading';

const TermsOfService = () => {
  return (
    <section className="section">
      <div className="content is-normal">
        <Heading type={1}>Terms of Service</Heading>
        <h2 className="title is-size-2">The terms are simple - we don't mess with you and you don't mess with us.</h2>
        <ul>
          <li>Users have utmost privacy - we don't listen in on your conversations, but hackers still exist.</li>
          <li>We don't censor posts - it is up to users to decide what to share.</li>
          <li>Some things may sometimes malfunction - we are not to be held liable for losses caused by such malfunctions.</li>
        </ul>
      </div>
    </section>
  );
};

export default TermsOfService;
