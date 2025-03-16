# Trip Planning

## Overview

This is the frontend of the Trip Planning and Logging System, a web application designed to assist drivers in planning routes and generating daily log sheets. Built with React, it provides an intuitive interface for users to input trip details, visualize routes on a map, and view detailed log sheets for each day of the trip. The frontend communicates with a Django REST API backend to fetch route data, fuel stop locations, and log sheet information.

### Features
- **Input Form**: Enter trip details including current location, pickup, dropoff, and cycle hours used.
- **Map Visualization**: Displays the route with markers for start, midpoint, end, and fuel stops using Leaflet.
- **Log Sheets**: Visualizes daily driver logs with timelines for off-duty, driving, and on-duty hours, formatted to match standard driver log sheets.
- **Responsive Design**: Built with Tailwind CSS for a clean and responsive UI.

## Prerequisites

- Node.js 14.x+ (includes npm)
- npm or yarn (JavaScript package manager)
- Git (for version control)
- A running backend server (Django REST API) at `http://localhost:8000` 

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/uno36/trip-planning.git
cd trip-planning/trip-frontend
```
or
```bash
git clone https://github.com/uno36/trip-planning.git
cd trip-frontend
```

### 2. Install Dependencies
Install the required Node.js packages using npm or yarn:
```bash
npm install
# or
yarn install
```

### 3. Configure API Endpoint
The frontend communicates with the backend at `http://localhost:8000`. Ensure the backend server is running. If the backend is hosted elsewhere, update the API URL in `src/components/InputForm.tsx`:
```typescript
const res = await axios.post<TripResponse>(
  "http://your-backend-url/api/calculate_route/",
  trip,
  { headers: { "Content-Type": "application/json" } }
);
```

### 4. Run the Development Server
Start the React development server:
```bash
npm start
# or
yarn start
```
The frontend will be available at `http://localhost:5174`.

### 5. Verify Setup
- Open `http://localhost:5174` in your browser.
- Enter sample trip details (e.g., Current Location: "New York, NY", Pickup Location: "Chicago, IL", Dropoff Location: "Los Angeles, CA", Current Cycle Used: 0).
- Click "Plan Trip" to fetch the route, map, and log sheets from the backend.

## Usage

### Input Form
- **Current Location**: Starting point of the trip (e.g., "New York, NY").
- **Pickup Location**: Intermediate stop for pickup (e.g., "Chicago, IL").
- **Dropoff Location**: Final destination (e.g., "Los Angeles, CA").
- **Current Cycle Used (Hrs)**: Hours already used in the 70-hour/8-day cycle (default 0).
- **Action**: Click the "Plan Trip" button to calculate the route and generate log sheets.

### Output
- **Map**: A Leaflet map showing the route with markers for:
  - Starting Point
  - Midpoint
  - Ending Point
  - Fuel Stops (every 1000 miles)
- **Trip Summary**: Displays the total distance (miles) and total hours (including pickup/dropoff).
- **Log Sheets**: One sheet per day, including:
  - Timeline visualization (off-duty, driving, on-duty hours).
  - Details such as start/end times, driving hours, on-duty hours, off-duty hours, and fuel stops.
  - Formatted to match standard driver log sheets with fields like total miles, carrier info, and remarks.

## Project Structure

```
trip-frontend/
├── public/               # Static assets
│   ├── index.html
│   ├── favicon.ico
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── InputForm.tsx # Main form for user input
│   │   ├── MapView.tsx   # Map visualization with Leaflet
│   │   ├── LogSheet.tsx  # Daily log sheet visualization
│   ├── App.tsx           # Main app component
│   ├── index.tsx         # Entry point
│   ├── App.css           # Global styles
│   ├── index.css         # Tailwind CSS integration
├── package.json          # Dependencies and scripts
├── README.md             # This file
```

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for API requests.
- **React-Leaflet**: React wrapper for Leaflet to render maps.
- **Leaflet**: Open-source JavaScript library for interactive maps.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Adds static typing to JavaScript.

Run `npm list --depth=0` to see all top-level dependencies:
```
├── axios@1.x.x
├── leaflet@1.7.1
├── react@17.x.x
├── react-dom@17.x.x
├── react-leaflet@3.x.x
├── typescript@4.x.x
├── tailwindcss@3.x.x
```

## Development Scripts

- Start the development server:
  ```bash
  npm start
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Eject from Create React App (if needed):
  ```bash
  npm run eject
  ```

## Troubleshooting

- **CORS Issues**: If you encounter CORS errors, ensure the Django backend has CORS configured. Install `django-cors-headers` in the backend and add:
  ```python
  # settings.py
  INSTALLED_APPS = [
      ...
      'corsheaders',
  ]

  MIDDLEWARE = [
      ...
      'corsheaders.middleware.CorsMiddleware',
      ...
  ]

  CORS_ALLOWED_ORIGINS = True
  ```
- **Map Not Rendering**: Ensure Leaflet CSS is correctly imported in `MapView.tsx`:
  ```typescript
  import "leaflet/dist/leaflet.css";
  ```
- **API Errors**: Check the console for error messages. Verify the backend is running and the API URL is correct.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit (`git commit -m "Description of changes"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, contact [emmanuelutofa@gmail.com](mailto:your-email@example.com).

## Acknowledgments
- [React](https://reactjs.org/)
- [Leaflet](https://leafletjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

---

