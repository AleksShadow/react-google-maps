import React, { useState } from "react";
import CustomMap from "./Components/CustomMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import { SearchResultsList } from './Components/SearchResultsList';


const App = () => {
const [results, setResults] = useState([]);
const [searchResultsList, setSearchResultsList] = useState([]);
const [selectedResult, setSelectedResult] = useState([]);

     return (
        <div className="app">
            <div className="search-bar-container">
                <SearchBar results={results} onSearchResultsList={setSearchResultsList} selectedResult={selectedResult}/>
                <SearchResultsList searchResultsList={searchResultsList}
                    setSelectedResult={setSelectedResult} />
            </div>
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <CustomMap onResults={setResults} selectedResult={selectedResult}/>
            </APIProvider>
        </div>
    );
};

export default App;