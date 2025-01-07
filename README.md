# Taxigo

Taxigo is a modern website built using React.js, Vite, HTML, CSS, Tailwind CSS, and Mapbox API. It allows users to book and manage taxi rides, providing a seamless and user-friendly experience.

## Homepage

The Taxigo homepage features a clean and intuitive design, showcasing the app's key features and capabilities. Users can easily access the ride booking functionality, track driver locations in real-time, and view their ride history.

![image](https://github.com/user-attachments/assets/9f8398b9-4e23-47bc-bbba-02b3803f3b12)

## Features

- User registration and authentication
- Ride booking with pick-up and drop-off locations using Mapbox API
- Real-time tracking of taxi driver location
- Estimated time of arrival (ETA) and ride duration calculations
- Secure payment processing
- Ride history and records

## Technologies Used
- Frontend: HTML,Css,React.js, Vite, Tailwind CSS
- UI/UX: figma ,canva..
- Mapping and Geolocation: Mapbox API

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (version 4.2 or higher)
- Mapbox API access token
- Stripe account and API keys
- Firebase project and API credentials

### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/taxigo.git
```
2. Install dependencies:
```
cd taxigo
npm install
```
3. Create a `.env` file and add the following environment variables:
```
MONGO_URI=<your-mongodb-connection-string>
MAPBOX_ACCESS_TOKEN=<your-mapbox-access-token>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
FIREBASE_CONFIG=<your-firebase-config-json>
```
4. Start the development server:
```
npm run dev
```
5. Open your browser and navigate to `http://localhost:5173` to access the Taxigo application.

## Contributing

We welcome contributions to the Taxigo project. If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your changes to your forked repository
5. Submit a pull request to the original repository
..
