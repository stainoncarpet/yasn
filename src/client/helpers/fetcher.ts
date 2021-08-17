const fetcher = {
    fetchExternalImage: async (url): Promise<File | null> => {
        try {
            const res = await fetch("http://localhost:3000/user/relay", {
                method: "POST",
                body: JSON.stringify({ url }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            const blob = await res.blob();

            const file = new File([blob], "dede", { type: "image/jpeg" });

            return file;
        } catch (error) {
            console.log(error);

            return null;
        }
    }
};

export default fetcher;