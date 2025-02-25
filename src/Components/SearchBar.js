import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BsXCircle } from "react-icons/bs";
import "./SearchBar.css";

const SearchBar = ( {results, onSearchResultsList, selectedResult} ) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchList, setSearchList] = useState(results);

    let searchList2 = results;

    // put a string into the Searchbar when the address is selected from the list
    useEffect(() => {
        if (selectedResult.length !== 0) {
            let valueString =
                `${selectedResult.name} - ${selectedResult.address.suite}, ${selectedResult.address.street}, ${selectedResult.address.city}, ${selectedResult.address.zipcode}`;
            setSearchValue(valueString);
            }
        onSearchResultsList([])
        }, [selectedResult]
    )

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);

        // compare of each word of the input with addresses:
        const valueSplited = (event.target.value).toLowerCase().split(/[\s,]+/);

        for (let i = 0; i < valueSplited.length; i++) {
            // skip iteration if it's an empty string
            if (!valueSplited[i]) {
                continue;
            }
            const newSearchList = (searchList2).filter((location) => {
                return (
                    location.name.toLowerCase().includes(valueSplited[i])
                    || location.email.toLowerCase().includes(valueSplited[i])
                    || location.phone.toLowerCase().includes(valueSplited[i])
                    || location.website.toLowerCase().includes(valueSplited[i])
                    || location.address.street.toLowerCase().includes(valueSplited[i])
                    || location.address.city.toLowerCase().includes(valueSplited[i])
                    || location.address.suite.toLowerCase().includes(valueSplited[i])
                    || location.address.zipcode.toLowerCase().includes(valueSplited[i])
                )
            });
            searchList2 = newSearchList.map((location) => {
                return location;
            });
        }
        setSearchList(searchList2);
        onSearchResultsList(searchList2);


        if ((event.target.value).length < 1) {
            onSearchResultsList([]);
        }

    }

    const handleClearClick = () => {
        setSearchValue("");
        onSearchResultsList([]);
    }

    const displayButton = searchValue.length > 0;

    return (
        <div className='input-wrapper'>
            <FaSearch id="search-icon" />
            <input placeholder="Enter a city, street or postal code..." type="text" value={searchValue}
                style={{"zIndex": "15"}} onChange={handleInputChange} onFocus={handleInputChange}/>
            {displayButton && <button className='clear-btn' onClick={handleClearClick}><BsXCircle id="clear-icon" /></button>}
            
        </div>
    )
}

export default SearchBar