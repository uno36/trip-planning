import React, { useState } from "react";
import axios from "axios";
import MapView from "./MapView";
import LogSheet from "./LogSheet";

interface TripData {
  current_location: string;
  pickup_location: string;
  dropoff_location: string;
  current_cycle_used: number;
}

interface LogEntry {
  day: number;
  date: string;
  start_time: string;
  end_time: string;
  driving_hours: number;
  on_duty_hours: number;
  off_duty_hours: number;
  fuel_stops: number;
}

interface TripResponse {
  coordinates: [number, number][];
  fuel_stop_coordinates: [number, number][];
  distance_miles: number;
  total_hours: number;
  log_sheets: LogEntry[];
}

const InputForm: React.FC = () => {
  const [trip, setTrip] = useState<TripData>({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_used: 0,
  });
  const [response, setResponse] = useState<TripResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrip((prev) => ({
      ...prev,
      [name]: name === "current_cycle_used" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);
    try {
      const res = await axios.post<TripResponse>(
        "https://trip-planner-2hh2.onrender.com/api/calculate_route/",
        trip,
        { headers: { "Content-Type": "application/json" } }
      );
      setResponse(res.data);
    } catch (err) {
      setError("Failed to calculate route. Check server logs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <div className="space-y-4">
        <input
          type="text"
          name="current_location"
          placeholder="Current Location"
          value={trip.current_location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="pickup_location"
          placeholder="Pickup Location"
          value={trip.pickup_location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="dropoff_location"
          placeholder="Dropoff Location"
          value={trip.dropoff_location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="current_cycle_used"
          placeholder="Current Cycle Used (Hrs)"
          value={trip.current_cycle_used || ""}
          onChange={(e) => {
            const value = e.target.value;
            setTrip((prev) => ({
              ...prev,
              current_cycle_used:
                value === "" ? 0 : Math.max(0, parseInt(value, 10) || 0),
            }));
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-sky-900 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <span className="loader border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block animate-spin"></span>
          ) : (
            "Plan Trip"
          )}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {response && (
        <div className="mt-6 space-y-6">
          <MapView
            coordinates={response.coordinates}
            fuel_stop_coordinates={response.fuel_stop_coordinates}
          />{" "}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Trip Summary</h3>
            <p>Distance: {response.distance_miles.toFixed(2)} miles</p>
            <p>Total Hours: {response.total_hours.toFixed(2)} hrs</p>
          </div>
          <div className="space-y-4">
            {response.log_sheets.map((log) => (
              <LogSheet key={log.day} log={log} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;
