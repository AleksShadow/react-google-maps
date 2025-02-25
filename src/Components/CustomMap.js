// import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Map,
  useMap,
  //Marker,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

const CustomMap = ( {onResults, selectedResult} ) => {

  const map = useMap();

  const [markerLocation, setMarkerLocation] = useState([]);
  const [markerLocationResult, setMarkerLocationResult] = useState([]);

  const url = "https://jsonplaceholder.typicode.com/users";

  const selectAddress = (id) => {
    const newList = markerLocation.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isActive: true,
        };
        return updatedItem;
      } else {
          const updatedItem = {
            ...item,
            isActive: false,
          };
          return updatedItem;
      };
    });
    setMarkerLocation(newList);
    newListResult(id);
    window.location.href = `#location_${id}`;
  }

  const deselectAddress = (id) => {
    const newList = markerLocation.map((item) => {
        const updatedItem = {
          ...item,
          isActive: false,
        };
        return updatedItem;
      })
      setMarkerLocation(newList);
      newListResult(-1);
  }

  // This function is partly doubled selectAddress function
  // it updates active location in filtered location list from full location list
  // Needs to redo!
  const newListResult = (id) => {
    const newList = markerLocationResult.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isActive: true,
        };
        return updatedItem;
      } else {
          const updatedItem = {
            ...item,
            isActive: false,
          };
          return updatedItem;
      };
    });
    setMarkerLocationResult(newList);
  }


  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(locationArray => {
        console.log("Loading addresses array...")
        let newMarkerLocations = locationArray.map((location) => {
              return {
                ...location,
              isActive: false,}
        })
        // Convert string coordinates to numbers
        newMarkerLocations.forEach(function(record) {
            record.address.geo.lat = +record.address.geo.lat
            record.address.geo.lng = +record.address.geo.lng
        });
        setMarkerLocation(newMarkerLocations);
        setMarkerLocationResult(newMarkerLocations);

      })
    }, []);

    // pass fetched data to parent App
    useEffect(() => {
      if (markerLocation.length !==0) {
        onResults(markerLocation);
      }
    }, [markerLocation])

  const hasMarkers = markerLocation.length > 0;

  let markerLocationCenter = hasMarkers ? markerLocation[0].address.geo : {lat: 0, lng: 0}

  const handleChange = () => {

    let markerLocationResultNew = markerLocation.filter((location) => {
      if (map.getBounds().contains(location.address.geo)) {
          return location;
        }
        return false;
    })
    setMarkerLocationResult(markerLocationResultNew);
}

useEffect(() => {
  if (selectedResult) {
    selectAddress(selectedResult.id);
  }
}, [selectedResult]);


  return (
    <div className="row ml-5 mr-3">
      <div className="map-container">
        <Map
          style={{ borderRadius: "10px" }}
          defaultZoom={5}
          defaultCenter={markerLocationCenter}
          gestureHandling={"greedy"}
          // disableDefaultUI={ true }
          mapId={process.env.REACT_APP_MAP_ID}

          onCameraChanged={ (ev: MapCameraChangedEvent) => {
            handleChange();
          }}
          >
          {hasMarkers
            ? markerLocation.map((location) => {
              return (<AdvancedMarker
                        key={location.id}
                        position={location.address.geo}
                        onClick={() => location.isActive
                          ? deselectAddress(location.id)
                          : selectAddress(location.id)}
                        zIndex={location.isActive ? 10 : 1}
                        className="custom-marker"
                        style={{transform: `scale( ${location.isActive ?  1.3 : 1} )`,}}
                      >

                      {location.isActive
                          ? <Pin
                          background={"#000000"}
                          borderColor={"#000000"}
                          glyphColor={"#f3f3f3"}
                          />
                          : <Pin
                          background={"#00558c"}
                          borderColor={"#00558c"}
                          glyphColor={"#00558c"}
                        />}
                      {location.isActive &&
                                            <InfoWindow
                                            onCloseClick={() => deselectAddress(location.id)}
                                            position={location.address.geo}pixelOffset={[0, -40]}
                                            shouldFocus={false}
                                            >
                      <p>Address: {location.address.city} {location.address.street}</p>
                      </InfoWindow>}
                      </AdvancedMarker>)
            })
            : "Loading..."
          }

            </Map>
      </div>
      <div className="scroll-container col-md-4" id="right">

            {markerLocationResult.map((record) => {
              return (
              <div key={record.id} id={`location_${record.id}`} onClick={() => selectAddress(record.id)} className={record.isActive ? 'address active' : 'address'}>
                
                <div><b><a href={record.website}>{record.name}</a></b>
                  <div>Email: {record.email}</div>
                  <div>Phone: {record.phone}</div>
                  <div>Website: <a href={record.website}>{record.website}</a></div>
                  <div>Address: {record.address.street} {record.address.suite} {record.address.city}</div>
                </div>
              </div>
              )}
            )}

      </div>
    </div>
  );
}
export default CustomMap;