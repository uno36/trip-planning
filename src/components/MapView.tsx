import React from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [12, -20],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapViewProps {
  coordinates: [number, number][];
  fuel_stop_coordinates: [number, number][];
}

const MapView: React.FC<MapViewProps> = ({
  coordinates,
  fuel_stop_coordinates,
}) => {
  if (!coordinates || coordinates.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No valid coordinates available
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <MapContainer center={coordinates[0]} zoom={5} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={coordinates} color="blue" />

        {/* Start Point */}
        <Marker position={coordinates[0]} icon={customIcon}>
          <Tooltip permanent direction="right">
            Starting Point
          </Tooltip>
        </Marker>

        {/* Midpoint */}
        {coordinates.length > 1 && (
          <Marker
            position={coordinates[Math.floor(coordinates.length / 2)]}
            icon={customIcon}
          >
            <Tooltip permanent direction="right">
              Midpoint
            </Tooltip>
          </Marker>
        )}

        {/* End Point */}
        {coordinates.length > 2 && (
          <Marker
            position={coordinates[coordinates.length - 1]}
            icon={customIcon}
          >
            <Tooltip permanent direction="right">
              Ending Point
            </Tooltip>
          </Marker>
        )}

        {/* Fuel Stops */}
        {fuel_stop_coordinates.map((coord, index) => (
          <Marker key={index} position={coord} icon={customIcon}>
            <Tooltip permanent direction="right">
              Fuel Stop {index + 1}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
