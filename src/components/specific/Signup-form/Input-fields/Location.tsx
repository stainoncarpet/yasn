import React from 'react';

const Location = ({ selectedCountry, selectedState, selectedCity, handleCountrySelect, handleStateSelect, handleCitySelect, countryRef, stateRef, cityRef, countryOptions, stateOptions, cityOptions, isCountryOptionsLoading, isStateOptionsLoading, isCityOptionsLoading }) => {

    return (
        <div className="field">
            <label className="label">Location</label>
            <div className="control has-icons-left" style={{maxWidth: "15rem", minWidth: "15rem", width: "15rem"}}>
                <div className={isCountryOptionsLoading ? "select is-loading" : "select"} style={{width: "100%"}}>
                    <select ref={countryRef} style={{width: "100%"}} onChange={handleCountrySelect} value={selectedCountry}>
                        <option value={"placeholder-country"} key={"placeholder-country"} hidden>Country</option>
                        {countryOptions.map((country) => <option value={country} key={country}>{country}</option>)}
                    </select>
                </div>
                <span className="icon is-left">
                    <i className="fas fa-globe"></i>
                </span>
            </div>
            <div className="control has-icons-left mt-3" style={{maxWidth: "15rem", minWidth: "15rem", width: "15rem"}}>
                    <div className={isStateOptionsLoading ? "select is-loading" : "select"} style={{width: "100%"}}>
                        <select ref={stateRef} style={{width: "100%"}} onChange={handleStateSelect} value={selectedState} disabled={isStateOptionsLoading}>
                            <option value={"placeholder-state"} key={"placeholder-state"} hidden>State/Province/Region</option>
                            {stateOptions?.length > 0 
                                ? stateOptions?.map((state) => <option key={state}>{state}</option>) 
                                : <option key={"state-unknown"}>{"None"}</option>
                            }
                        </select>
                    </div>
                    <span className="icon is-left">
                        <i className="far fa-building"></i>
                    </span>
                </div>

            <div className="control has-icons-left mt-3" style={{maxWidth: "15rem", minWidth: "15rem", width: "15rem"}}>
                    <div className={isCityOptionsLoading ? "select is-loading" : "select"} style={{width: "100%"}}>
                        <select ref={cityRef} style={{width: "100%"}} onChange={handleCitySelect} value={selectedCity} disabled={isCityOptionsLoading}>
                            <option value={"placeholder-city"} key={"placeholder-city"} hidden>City/Town</option>
                            {cityOptions?.length > 0 
                                ? cityOptions?.map((city) => <option key={city}>{city}</option>)
                                : <option key={"city-unknown"}>{"None"}</option>
                            }
                        </select>
                    </div>
                    <span className="icon is-left">
                        <i className="far fa-building"></i>
                    </span>
            </div>
        </div>
    );
};

export default Location;
