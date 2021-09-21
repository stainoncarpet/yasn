//@ts-ignore
const app_address = APP_ADDRESS;

const fetcher = {
    fetchExternalImage: async (url): Promise<any | null> => {
        try {
            const res = await fetch(`${app_address}/user/relay`, {
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
    },
    fetchAccountSettingsData: async (token) => {
        try {
            const res = await fetch(`${app_address}/auth/account-settings`, {
                method: "POST",
                body: JSON.stringify({ 
                    token
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );

            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);

            return null;
        }
    }
};

export default fetcher;