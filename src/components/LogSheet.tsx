import React from "react";

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

interface LogSheetProps {
  log: LogEntry;
}

const LogSheet: React.FC<LogSheetProps> = ({ log }) => {
  const totalHours = log.off_duty_hours + log.driving_hours + log.on_duty_hours;
  const scale = 500 / totalHours;

  const truckTrailerNumbers = "Truck: ABC123, Trailer: XYZ789";
  const carrierName = "XYZ Transport";
  const mainOfficeAddress = "123 Main St, City, Country";
  const homeTerminalAddress = "456 Home Rd, City, Country";
  const shippingDocuments = "Doc #12345";
  const shipperCommodity = "Electronics";
  const remarks = "No issues reported";

  return (
    <div className="border border-gray-300 m-4 p-6 bg-white rounded-lg shadow-lg">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">
        Driver's Daily Log - Day {log.day} - {log.date}
      </h4>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p>
            <strong>Original:</strong> File at home terminal
          </p>
          <p>
            <strong>Duplicate:</strong> Retained by driver for 8 days
          </p>
        </div>
        <div>
          <p>
            <strong>Date:</strong> {log.date}
          </p>
        </div>
      </div>

      <div className=" mt-4">
        <div>
          <p>
            <strong>Carrier:</strong> {carrierName}
          </p>
          <p>
            <strong>Main Office:</strong> {mainOfficeAddress}
          </p>
          <p>
            <strong>Home Terminal:</strong> {homeTerminalAddress}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p>
          <strong>Truck/Trailer Numbers:</strong> {truckTrailerNumbers}
        </p>
      </div>

      <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <svg className="w-full max-w-[500px] h-[40px]">
          <rect
            x="0"
            y="5"
            width={log.off_duty_hours * scale}
            height="30"
            className="fill-green-500 stroke-black"
          />
          <rect
            x={log.off_duty_hours * scale}
            y="5"
            width={log.driving_hours * scale}
            height="30"
            className="fill-blue-500 stroke-black"
          />
          <rect
            x={(log.off_duty_hours + log.driving_hours) * scale}
            y="5"
            width={log.on_duty_hours * scale}
            height="30"
            className="fill-yellow-500 stroke-black"
          />
        </svg>
        <div className="flex justify-center gap-6 mt-3">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 border border-black mr-2"></div>
            <span className="text-xs font-medium text-gray-800">Off Duty</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 border border-black mr-2"></div>
            <span className="text-xs font-medium text-gray-800">Driving</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 border border-black mr-2"></div>
            <span className="text-xs font-medium text-gray-800">On Duty</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-6">
        <p>
          <strong>Start Time:</strong> {log.start_time}
        </p>
        <p>
          <strong>End Time:</strong> {log.end_time}
        </p>
        <p>
          <strong>Driving Hours:</strong> {log.driving_hours.toFixed(2)}
        </p>
        <p>
          <strong>On Duty Hours:</strong> {log.on_duty_hours.toFixed(2)}
        </p>
        <p>
          <strong>Off Duty Hours:</strong> {log.off_duty_hours.toFixed(2)}
        </p>
        <p>
          <strong>Fuel Stops:</strong> {log.fuel_stops}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Remarks:</strong> {remarks}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Shipping Documents:</strong> {shippingDocuments}
        </p>
        <p>
          <strong>Shipper & Commodity:</strong> {shipperCommodity}
        </p>
      </div>

      <div className="mt-4 text-xs"></div>

      <div className="mt-4">
        <p>
          <strong>Recap:</strong> Complete at end of day
        </p>
        <p>
          <strong>70 Hour/8 Day Drivers:</strong>
        </p>
        <p>
          A. Total hours on duty last 7 days including today:{" "}
          {(log.on_duty_hours * 7).toFixed(2)} hrs
        </p>
      </div>
    </div>
  );
};

export default LogSheet;
