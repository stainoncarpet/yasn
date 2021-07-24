const timer = {
    calculateTimeDifference: (origin) => {
        const now = new Date().getTime();
        const then = new Date(origin).getTime()
        
        const differenceInSeconds = Math.round((now - then) / 1000);
        const differenceInMinutes = Math.round(differenceInSeconds / 60);
        const differenceInHours = Math.round(differenceInSeconds / 3600);
        const differenceInDays = Math.round(differenceInSeconds / 86400);

        if(differenceInSeconds < 60) {
            if (differenceInSeconds === 1) return `${differenceInSeconds} second ago`;

            return `${differenceInSeconds} seconds ago`;
        } else if (differenceInMinutes < 60) {
            if (differenceInMinutes === 1) `${differenceInMinutes} minute ago`;

            return `${differenceInMinutes} minutes ago`;
        } else if (differenceInHours < 24) {
            if (differenceInHours === 1) return `${differenceInHours} hour ago`

            return `${differenceInHours} hours ago`
        } else {
            if(differenceInDays === 1) return `${differenceInDays} day ago`;

            return `${differenceInDays} days ago`;
        }
    }
};

export default timer;   