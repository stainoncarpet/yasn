const fs = require('fs');

const extractFriendsFromFriendships = (friendships = [], userName) => {
    const friends = friendships.map(({_id, user1, user2, friendshipStatus, dateOfFormation}) => {
        const friend = user1.userName.toLowerCase() === userName.toLowerCase() ? user2 : user1;

        const statusObject = friendshipStatus === "friends" 
                                                        ? {status: friendshipStatus, fshipId: _id } 
                                                        : friendshipStatus === "pending"
                                                            ? {status: friendshipStatus, initiatorId: user1._id, fshipId: _id}
                                                            : {status: friendshipStatus} 
        
        return {user: friend, friendshipStatus: statusObject, dateOfFormation}
    });

    return friends;
};

const decodeBase64ImageAndSaveToDisk = async (dataString, uid) => {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const response = {};

    if (matches.length !== 3) { return new Error('Invalid input string'); }

    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    const filename = `avatar-uid-${uid}.png`;

    fs.writeFile("uploads/" + filename, response.data, function (err) { 
        console.log(err);
    });

    return filename;
};

const adjustForDateFormattingInconsistencies = (date, step = 0) => {
        const DOB = new Date(date);
        const fixedDOB = new Date(date);
        fixedDOB.setDate(DOB.getDate() + step);

        return fixedDOB;
};

module.exports = {extractFriendsFromFriendships, decodeBase64ImageAndSaveToDisk, adjustForDateFormattingInconsistencies};