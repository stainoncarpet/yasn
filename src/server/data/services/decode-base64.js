var fs = require('fs');

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

module.exports = {decodeBase64ImageAndSaveToDisk};