import React from "react";
import "./SearchResult.css";

export const SearchResult = ( {result, setSelectedSearchResult} ) => {
    // let row = `${result.name}\n - ${result.email}, phone: ${result.phone}, website: ${result.website}, address: ${result.address.suite}, ${result.address.street}, ${result.address.city}, ${result.address.zipcode}`;
    return (
        <div className="search-result" onClick={() =>
            { setSelectedSearchResult(result);
        }}
        >
            <b>{result.name}</b><br />
            <i>email:</i> {result.email}<br />
            <i>phone:</i> {result.phone},<br />
            <i>website:</i> {result.website},<br />
            <i>address:</i> {result.address.suite}, {result.address.street},&ensp;
            {result.address.city}, {result.address.zipcode}
            </div>
    )
}

export default SearchResult;