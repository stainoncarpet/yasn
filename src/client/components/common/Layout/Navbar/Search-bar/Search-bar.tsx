import React from 'react';

import "./Search-bar.scss";

const SearchBar = () => {
    return (
        <div id="search" className="bd-search mt-2">
            <p className="control has-icons-left">
                    <input className="input is-rounded" type="text" placeholder="Search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-label="search input" aria-owns="algolia-autocomplete-listbox-0" dir="auto" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-search" />
                    </span>
            </p>
        </div>
    );
};

export default SearchBar;