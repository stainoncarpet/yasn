const timer = {
    calculateTimeDifference: (origin) => {
        const differenceInSeconds = Math.round((new Date().getTime() - origin) / 1000);
        const differenceInMinutes = Math.round(differenceInSeconds / 60);
        const differenceInHours = Math.round(differenceInSeconds / 3600);
        const differenceInDays = Math.round(differenceInSeconds / 86400);

        if(differenceInSeconds < 60) {
            return `${differenceInSeconds} seconds ago`;
        } else if (differenceInMinutes < 60) {
            return `${differenceInMinutes} minutes ago`;
        } else if (differenceInHours < 24) {
            return `${differenceInHours} hours ago`
        } else {
            return `${differenceInDays} days ago`;
        }
    }
};

export default timer;