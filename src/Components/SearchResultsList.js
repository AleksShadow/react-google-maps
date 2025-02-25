import React, { useState, useEffect } from 'react';
import { SearchResult } from './SearchResult';
import './SearchResultsList.css';

export const SearchResultsList = ( {searchResultsList, setSelectedResult} ) => {

    const [selectedSearchResult, setSelectedSearchResult] = useState([]);

    useEffect(() => {
        if (selectedSearchResult.length !==0) {
            setSelectedResult(selectedSearchResult);
        }

    }, [selectedSearchResult])
    return (
            <div className="results-list">
                {searchResultsList.map((result, id) => {
                    return <SearchResult result={result} key={id} setSelectedSearchResult={setSelectedSearchResult}/>
                })}
            </div>
            )
        };