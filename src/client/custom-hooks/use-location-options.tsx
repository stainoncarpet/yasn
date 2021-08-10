import React from 'react';

const useLocationOptions = (selectedCountry, selectedState, selectedCity) => {
    const [countryOptions, setCountryOptions] = React.useState<any>([]);
    const [stateOptions, setStateOptions] = React.useState<any>([]);
    const [cityOptions, setCityOptions] = React.useState<any>([]);

    const [isCountryOptionsLoading, setIsCountryOptionsLoading] = React.useState<any>(true);
    const [isStateOptionsLoading, setIsStateOptionsLoading] = React.useState<any>(true);
    const [isCityOptionsLoading, setIsCityOptionsLoading] = React.useState<any>(true);

    const currentCountry = React.useRef<any>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");

                const {data} = await res.json();

                setCountryOptions(data.map((c) => c.name));
                setIsCountryOptionsLoading(false);
            } catch (error) {
                console.log("failed to fetch countries ", error);

                setCountryOptions([]);
                setIsCountryOptionsLoading(false);
            }
        })();
    }, []);

    React.useEffect(() => {
        if(selectedCountry !== "Country") {
            // reset state and city
            setStateOptions([]);
            setCityOptions([]);
            setIsStateOptionsLoading(true);
            setIsCityOptionsLoading(true);

            console.log("current country vs selected country ", currentCountry.current, selectedCountry);

            currentCountry.current = selectedCountry;
        }
        
    }, [selectedCountry]);
    
    React.useEffect(() => {
        if (selectedCountry !== "Country") {
            (async () => {

                try {
                    const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
                        method: "POST",
                        body: JSON.stringify({"country": selectedCountry.toLowerCase()}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    const {data} = await res.json();
        
                    setStateOptions(data.states.map((s) => s.name));
                    setIsStateOptionsLoading(false);
                } catch (error) {
                    console.log("failed to fetch states ", error);
                
                    setStateOptions([]);
                    setIsStateOptionsLoading(false);
                }
            })();
        }
    }, [selectedCountry]);

    React.useEffect(() => {
        if(selectedState !== "State/Province/Region" && selectedState !== "None") {
            (async () => {

                try {
                    const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
                        method: "POST",
                        body: JSON.stringify({
                            "country": selectedCountry.toLowerCase(),
                            "state": selectedState.toLowerCase()
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    const {data} = await res.json();
        
                    setCityOptions(data);
                    setIsCityOptionsLoading(false);
                } catch (error) {
                    console.log("failed to fetch cities ", error);
                
                    setCityOptions([]);
                    setIsCityOptionsLoading(false);
                }
            })();
        }

        if(selectedState === "None") {
            setIsCityOptionsLoading(false);
        }
    }, [selectedState]);

    React.useEffect(() => {

    }, [selectedCity])

    return [countryOptions, stateOptions, cityOptions, isCountryOptionsLoading, isStateOptionsLoading, isCityOptionsLoading];
};

export default useLocationOptions;
