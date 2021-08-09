import React from 'react';

const Location = () => {
    const [countryOptions, setCountryOptions] = React.useState<Array<string>>([]);
    const [stateOptions, setStateOptions] = React.useState<Array<string>>([]);
    const [cityOptions, setCityOptions] = React.useState<Array<string>>([]);

    const [selectedCountry, setSelectedCountry] = React.useState("Country");
    const [selectedState, setSelectedState] = React.useState("State/Province/Region");
    const [selectedCity, setSelectedCity] = React.useState("City/Town");

    const countryRef = React.useRef<any>(null);
    const stateRef = React.useRef<any>(null);
    const cityRef = React.useRef<any>(null);

    React.useEffect(() => {
        (async () => {
            const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");

            const {data} = await res.json();

            setCountryOptions(data.map((c) => c.name));
        })();
    }, []);
    
    React.useEffect(() => {
        if (selectedCountry !== "Country") {
            (async () => {
                setStateOptions(["Loading..."]);

                const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
                    method: "POST",
                    body: JSON.stringify({"country": selectedCountry.toLowerCase()}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                const {data} = await res.json();
    
                setStateOptions(data.states.map((s) => s.name));
            })();
        }
    }, [selectedCountry]);

    React.useEffect(() => {
        if(selectedState !== "State/Province/Region") {
            (async () => {
                setCityOptions(["Loading..."]);

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
    
                setCityOptions(data)
                
            })();
        }
    }, [selectedCountry, selectedState]);

    const handleCountrySelect = (e) => {
        console.log(countryRef.current?.selectedOptions[0].value);
        setSelectedCountry(countryRef.current?.selectedOptions[0].value);
    };

    const handleStateSelect = (e) => {
        console.log(stateRef.current?.selectedOptions[0].value);
        setSelectedState(stateRef.current?.selectedOptions[0].value);
    };

    const handleCitySelect = (e) => {
        console.log(cityRef.current?.selectedOptions[0].value);
        setSelectedCity(cityRef.current?.selectedOptions[0].value);
    };


    return (
        <div className="field">
            <label className="label">Location</label>
            <div className="control has-icons-left" style={{maxWidth: "15rem", minWidth: "15rem", width: "15rem"}}>
                <div className="select" style={{width: "100%"}}>
                    <select ref={countryRef} style={{width: "100%"}} onChange={handleCountrySelect} value={selectedCountry}>
                        <option defaultValue="none">Country</option>
                        {countryOptions.map((country) => <option value={country} key={country}>{country}</option>)}
                    </select>
                </div>
                <span className="icon is-left">
                    <i className="fas fa-globe"></i>
                </span>
            </div>

            {selectedCountry !== "Country" && <div className="control has-icons-left mt-3" style={{maxWidth: "15rem", minWidth: "15rem", width: "15rem"}}>
                <div className="select" style={{width: "100%"}}>
                    <select ref={stateRef} style={{width: "100%"}} onChange={handleStateSelect} value={selectedState}>
                        <option>State/Province/Region</option>
                        {stateOptions.map((state) => <option key={state}>{state}</option>)}
                    </select>
                </div>
                <span className="icon is-left">
                    <i className="far fa-building"></i>
                </span>
            </div>}

            {(selectedState !== "State/Province/Region" && cityOptions?.length > 0) && <div className="control has-icons-left mt-3" style={{maxWidth: "15rem", minWidth: "15rem", width: "15rem"}}>
                <div className="select" style={{width: "100%"}}>
                    <select ref={cityRef} style={{width: "100%"}} onChange={handleCitySelect} value={selectedCity}>
                        <option>City/Town</option>
                        {cityOptions?.map((city) => <option key={city}>{city}</option>)}
                    </select>
                </div>
                <span className="icon is-left">
                    <i className="far fa-building"></i>
                </span>
            </div>}
        </div>
    );
};

export default Location;
