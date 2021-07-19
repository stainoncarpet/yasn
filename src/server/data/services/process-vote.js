const processVote = async (entity, oldLikedEntities, oldDislikedEntities, entityId, userId, voteResult) => {
    let likedEntities = oldLikedEntities;
    let dislikedEntities = oldDislikedEntities;

    // liking 2nd time = unlike
    if(entity.likers.includes(userId) && voteResult == 1) {
        console.log("CASE 1");
        entity.likers = entity.likers.filter((likerId) => likerId.toString().trim() !== userId.toString().trim());
        likedEntities = likedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
    // revoting for the opposite
    } else if (entity.likers.includes(userId) && voteResult == -1) {
        console.log("CASE 2");
        entity.likers = entity.likers.filter((likerId) => likerId.toString().trim() !== userId.toString().trim());
        entity.dislikers = [...entity.dislikers, userId];
        likedEntities = likedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
        dislikedEntities = [...dislikedEntities, entityId];
    // revoting for the opposite
    } else if (entity.dislikers.includes(userId) && voteResult == 1){
        console.log("CASE 3");
        entity.dislikers = entity.dislikers.filter((dislikerId) => dislikerId.toString().trim() !== userId.toString().trim());
        entity.likers = [...entity.likers, userId];
        dislikedEntities = dislikedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
        likedEntities = [...dislikedEntities, entityId];
    // disliking 2nd time = undislike
    } else if (entity.dislikers.includes(userId) && voteResult == -1) {
        console.log("CASE 4");
        entity.dislikers = entity.dislikers.filter((dislikerId) => dislikerId.toString().trim() !== userId.toString().trim());
        dislikedEntities = dislikedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
    // voting for the first time on post
    } else  {
        console.log("CASE 5");
        if (voteResult == 1) {
            entity.likers = [...entity.likers, userId];
            likedEntities = [...likedEntities, entityId]
        } else if (voteResult == -1) {
            entity.dislikers = [...entity.dislikers, userId];
            dislikedEntities = [...dislikedEntities, entityId]
        }
    }

    return [likedEntities, dislikedEntities];
};

module.exports = {processVote};