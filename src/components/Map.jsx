import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
});
function Map({ lat, long, address }) {
    return (
        <div>
            <MapContainer center={[lat, long]} zoom={6}>
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
                <Marker position={[lat, long]} icon={customIcon}>
                    <Popup>{address}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;
