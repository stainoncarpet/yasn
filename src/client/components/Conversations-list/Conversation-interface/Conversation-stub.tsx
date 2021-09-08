import React from 'react';

const ConversationStub = ({participants}) => {
    return (
        <React.Fragment>
        <div className="conversation-start">
            {participants?.map((p) => <figure className="image is-64x64" key={p._id}>
                <img className="is-rounded" src={`http://localhost:3000/${p.avatar}`} />
            </figure>)}
        </div>
        <div style={{ textAlign: "center" }}>This conversation is on!</div>
    </React.Fragment>
    );
};

export default ConversationStub;
