/**
 * Air Quality Index Monitoring & Prediction Dashboard
 * Complete Sample Air Quality Dataset & Category Breakpoints
 * 
 * Compliant with Central Pollution Control Board (CPCB) & US-EPA Standards
 * All concentrations are in µg/m³ except CO in mg/m³
 */

// AQI Category Definitions, Standard Color Schemes & Health Advisories
const AQI_CATEGORIES = {
    GOOD: {
        name: "Good",
        min: 0,
        max: 50,
        color: "#10b981", // Emerald Green
        bgColor: "rgba(16, 185, 129, 0.15)",
        borderColor: "#10b981",
        textColor: "#10b981",
        badgeClass: "badge-good",
        icon: "fa-smile-beam",
        summary: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
        advisory: "Air quality is ideal for all outdoor activities, jogging, and natural ventilation.",
        precautions: [
            "Great day for outdoor exercise and sports.",
            "Open windows for fresh air circulation in rooms.",
            "No special precautions required for sensitive individuals."
        ]
    },
    SATISFACTORY: {
        name: "Satisfactory",
        min: 51,
        max: 100,
        color: "#84cc16", // Lime Green
        bgColor: "rgba(132, 204, 22, 0.15)",
        borderColor: "#84cc16",
        textColor: "#84cc16",
        badgeClass: "badge-satisfactory",
        icon: "fa-smile",
        summary: "Air quality is acceptable; however, some pollutants may affect unusually sensitive individuals.",
        advisory: "Sensitive individuals should consider taking normal precautions.",
        precautions: [
            "Normal outdoor activities are safe for general public.",
            "Unusually sensitive individuals should monitor any minor breathing discomfort.",
            "Keep indoor plants healthy to maintain fresh indoor ambient air."
        ]
    },
    MODERATE: {
        name: "Moderate",
        min: 101,
        max: 200,
        color: "#eab308", // Amber Yellow
        bgColor: "rgba(234, 179, 8, 0.15)",
        borderColor: "#eab308",
        textColor: "#eab308",
        badgeClass: "badge-moderate",
        icon: "fa-meh",
        summary: "May cause breathing discomfort to people with asthma, heart ailments, and children.",
        advisory: "People with respiratory or cardiac conditions should limit prolonged outdoor exertion.",
        precautions: [
            "Sensitive groups (elderly, children, asthmatics) should reduce heavy outdoor exertion.",
            "Consider wearing light particulate masks during peak traffic hours.",
            "Keep windows closed during heavy traffic morning/evening rush hours."
        ]
    },
    POOR: {
        name: "Poor",
        min: 201,
        max: 300,
        color: "#f97316", // Bright Orange
        bgColor: "rgba(249, 115, 22, 0.15)",
        borderColor: "#f97316",
        textColor: "#f97316",
        badgeClass: "badge-poor",
        icon: "fa-frown",
        summary: "May cause breathing discomfort to most people on prolonged exposure.",
        advisory: "Reduce prolonged or heavy outdoor activities. Wear N95 masks when outside.",
        precautions: [
            "Avoid prolonged outdoor morning/evening jogs or heavy workouts.",
            "Wear certified N95 / KN95 masks when stepping outdoors.",
            "Use indoor air purifiers or HEPA filtration where available.",
            "Children and senior citizens should remain indoors."
        ]
    },
    VERY_POOR: {
        name: "Very Poor",
        min: 301,
        max: 400,
        color: "#ef4444", // Ruby Red
        bgColor: "rgba(239, 68, 68, 0.15)",
        borderColor: "#ef4444",
        textColor: "#ef4444",
        badgeClass: "badge-very-poor",
        icon: "fa-dizzy",
        summary: "May cause respiratory illness on prolonged exposure. Pronounced effect on sensitive groups.",
        advisory: "Avoid prolonged outdoor exposure. Keep doors and windows tightly closed.",
        precautions: [
            "Strictly avoid outdoor sports, jogging, and strenuous physical activities.",
            "Keep indoor air clean by closing doors and windows and using air purifiers.",
            "People with cardiovascular or respiratory ailments should keep emergency medications handy.",
            "Mandatory N95 mask usage for unavoidable outdoor transit."
        ]
    },
    SEVERE: {
        name: "Severe",
        min: 401,
        max: 500,
        color: "#a855f7", // Deep Purple / Maroon
        bgColor: "rgba(168, 85, 247, 0.15)",
        borderColor: "#a855f7",
        textColor: "#a855f7",
        badgeClass: "badge-severe",
        icon: "fa-skull-crossbones",
        summary: "Affects healthy people and seriously impacts those with existing diseases.",
        advisory: "Follow emergency health advisories. Avoid all outdoor physical activities.",
        precautions: [
            "Complete health emergency warning: remain indoors at all times.",
            "Run HEPA air purifiers continuously in sealed rooms.",
            "Avoid all vehicle travel through congested corridors.",
            "Seek immediate medical attention if experiencing severe chest tightness or wheezing."
        ]
    }
};

// Standard safe limits (CPCB / WHO 24-hr standards in µg/m³, CO in mg/m³)
const POLLUTANT_LIMITS = {
    pm25: { name: "PM2.5", standard: 60, unit: "µg/m³", description: "Fine Particulate Matter (≤ 2.5 µm)" },
    pm10: { name: "PM10", standard: 100, unit: "µg/m³", description: "Coarse Inhalable Particles (≤ 10 µm)" },
    co: { name: "CO", standard: 2.0, unit: "mg/m³", description: "Carbon Monoxide" },
    no2: { name: "NO2", standard: 80, unit: "µg/m³", description: "Nitrogen Dioxide" },
    so2: { name: "SO2", standard: 80, unit: "µg/m³", description: "Sulphur Dioxide" },
    o3: { name: "O3", standard: 100, unit: "µg/m³", description: "Surface Ozone" },
    temp: { name: "Temperature", standard: 35, unit: "°C", description: "Ambient Temperature" },
    humidity: { name: "Humidity", standard: 80, unit: "%", description: "Relative Humidity" }
};

// Comprehensive Sample Data for All Monitored Cities
const CITIES_DATA = {
    "Kakinada": {
        name: "Kakinada",
        state: "Andhra Pradesh",
        station: "Collectorate Ground Continuous Ambient Air Quality Monitoring Station (CAAQMS)",
        coordinates: [16.9891, 82.2475],
        weatherSummary: "Partly Cloudy • Sea Breeze 12 km/h",
        current: {
            aqi: 72,
            category: "Satisfactory",
            dominantPollutant: "PM10",
            pm25: 38.5,
            pm10: 65.2,
            co: 0.65,
            no2: 22.4,
            so2: 12.1,
            o3: 34.0,
            temperature: 29.5,
            humidity: 78,
            pressure: 1012,
            windSpeed: 12.4,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [63, 55, 61, 76, 78, 64, 53, 59, 65, 72, 84, 75],
            pm25: [32.4, 28.0, 31.8, 41.0, 42.0, 33.0, 27.0, 30.5, 34.0, 38.5, 46.0, 40.2],
            pm10: [55.6, 48.5, 54.0, 68.0, 70.5, 56.8, 47.5, 52.4, 58.5, 65.2, 76.0, 67.8],
            no2: [18.8, 16.2, 18.0, 24.5, 25.4, 19.0, 16.0, 17.5, 19.5, 22.4, 27.5, 23.8],
            so2: [10.7, 9.9, 10.8, 12.5, 13.2, 11.0, 9.8, 10.5, 11.2, 12.1, 14.0, 12.8],
            co: [0.55, 0.47, 0.54, 0.70, 0.72, 0.57, 0.48, 0.52, 0.58, 0.65, 0.79, 0.69],
            o3: [25.2, 24.5, 25.8, 27.0, 30.0, 36.5, 41.5, 40.1, 35.0, 34.0, 30.5, 27.5]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [68, 74, 62, 58, 70, 75, 72],
            pm25: [35.0, 39.5, 31.0, 29.5, 37.0, 40.2, 38.5],
            pm10: [60.2, 67.8, 54.0, 50.5, 63.4, 69.0, 65.2]
        },
        predictions: {
            next6h: 76,
            next12h: 82,
            next24h: 69,
            next48h: 64,
            next72h: 58,
            confidence: "High (±4 AQI)",
            trendText: "Stable with slight evening peak due to vehicular movement.",
            hourlyForecast: [
                { hour: "+1h", aqi: 73, category: "Satisfactory", low: 70, high: 76 },
                { hour: "+2h", aqi: 75, category: "Satisfactory", low: 72, high: 79 },
                { hour: "+4h", aqi: 78, category: "Satisfactory", low: 74, high: 83 },
                { hour: "+6h", aqi: 76, category: "Satisfactory", low: 71, high: 81 },
                { hour: "+12h", aqi: 82, category: "Satisfactory", low: 77, high: 88 },
                { hour: "+24h", aqi: 69, category: "Satisfactory", low: 63, high: 75 }
            ]
        }
    },

    "Hyderabad": {
        name: "Hyderabad",
        state: "Telangana",
        station: "HITEC City / Sanathnagar Central Monitoring Station",
        coordinates: [17.3850, 78.4867],
        weatherSummary: "Hazy Sun • Calm Wind 6 km/h",
        current: {
            aqi: 154,
            category: "Moderate",
            dominantPollutant: "PM2.5",
            pm25: 78.4,
            pm10: 142.5,
            co: 1.42,
            no2: 48.6,
            so2: 24.2,
            o3: 46.0,
            temperature: 28.4,
            humidity: 62,
            pressure: 1010,
            windSpeed: 7.2,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [134, 118, 136, 171, 179, 142, 112, 122, 138, 154, 182, 163],
            pm25: [67.2, 59.0, 68.0, 88.0, 92.0, 72.0, 56.0, 61.0, 69.0, 78.4, 94.0, 83.8],
            pm10: [122.5, 108.0, 124.0, 158.0, 165.8, 132.4, 103.2, 112.5, 126.8, 142.5, 168.5, 150.2],
            no2: [39.8, 34.2, 40.5, 55.0, 58.0, 43.0, 31.8, 35.5, 41.5, 48.6, 59.0, 51.8],
            so2: [20.9, 18.8, 21.2, 27.2, 28.5, 22.4, 18.0, 19.2, 21.8, 24.2, 29.0, 25.8],
            co: [1.22, 1.08, 1.24, 1.60, 1.68, 1.31, 1.02, 1.12, 1.26, 1.42, 1.71, 1.52],
            o3: [33.0, 32.0, 33.0, 34.0, 37.5, 45.0, 52.8, 52.0, 47.0, 46.0, 42.0, 37.0]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [142, 168, 155, 138, 149, 160, 154],
            pm25: [72.0, 86.5, 79.0, 69.5, 76.0, 82.4, 78.4],
            pm10: [131.0, 158.0, 144.2, 128.0, 139.5, 151.0, 142.5]
        },
        predictions: {
            next6h: 168,
            next12h: 175,
            next24h: 148,
            next48h: 140,
            next72h: 135,
            confidence: "Moderate (±8 AQI)",
            trendText: "Traffic rush expected to elevate PM2.5 in late night hours.",
            hourlyForecast: [
                { hour: "+1h", aqi: 158, category: "Moderate", low: 150, high: 166 },
                { hour: "+2h", aqi: 164, category: "Moderate", low: 155, high: 173 },
                { hour: "+4h", aqi: 172, category: "Moderate", low: 162, high: 182 },
                { hour: "+6h", aqi: 168, category: "Moderate", low: 158, high: 178 },
                { hour: "+12h", aqi: 175, category: "Moderate", low: 164, high: 186 },
                { hour: "+24h", aqi: 148, category: "Moderate", low: 138, high: 158 }
            ]
        }
    },

    "Vijayawada": {
        name: "Vijayawada",
        state: "Andhra Pradesh",
        station: "Benz Circle Urban Environmental Monitoring Station",
        coordinates: [16.5062, 80.6480],
        weatherSummary: "Warm & Clear • Wind 8 km/h",
        current: {
            aqi: 114,
            category: "Moderate",
            dominantPollutant: "PM2.5",
            pm25: 56.8,
            pm10: 102.4,
            co: 1.08,
            no2: 34.5,
            so2: 18.2,
            o3: 38.0,
            temperature: 31.2,
            humidity: 74,
            pressure: 1011,
            windSpeed: 8.5,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [96, 84, 96, 127, 133, 102, 79, 86, 98, 114, 137, 122],
            pm25: [48.0, 41.8, 48.0, 63.5, 66.8, 51.2, 39.5, 43.2, 49.0, 56.8, 68.5, 61.0],
            pm10: [87.5, 76.5, 87.0, 114.0, 119.0, 93.0, 72.0, 79.5, 89.5, 102.4, 121.5, 109.0],
            no2: [28.6, 24.5, 28.5, 39.0, 41.2, 30.8, 23.0, 25.4, 29.2, 34.5, 42.5, 37.2],
            so2: [16.0, 14.0, 15.8, 20.5, 21.5, 16.8, 13.2, 14.5, 16.0, 18.2, 22.0, 19.8],
            co: [0.92, 0.80, 0.92, 1.20, 1.26, 0.98, 0.76, 0.83, 0.94, 1.08, 1.29, 1.16],
            o3: [28.5, 27.5, 28.5, 29.5, 32.0, 38.2, 43.5, 43.8, 39.0, 38.0, 36.0, 32.0]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [105, 118, 98, 92, 108, 120, 114],
            pm25: [52.0, 59.0, 49.0, 46.0, 54.0, 60.5, 56.8],
            pm10: [94.0, 107.0, 89.0, 83.5, 98.0, 109.0, 102.4]
        },
        predictions: {
            next6h: 128,
            next12h: 135,
            next24h: 108,
            next48h: 102,
            next72h: 95,
            confidence: "High (±5 AQI)",
            trendText: "Moderate air quality to improve gradually with afternoon thermal winds.",
            hourlyForecast: [
                { hour: "+1h", aqi: 118, category: "Moderate", low: 112, high: 124 },
                { hour: "+2h", aqi: 124, category: "Moderate", low: 117, high: 131 },
                { hour: "+4h", aqi: 132, category: "Moderate", low: 124, high: 140 },
                { hour: "+6h", aqi: 128, category: "Moderate", low: 120, high: 136 },
                { hour: "+12h", aqi: 135, category: "Moderate", low: 126, high: 144 },
                { hour: "+24h", aqi: 108, category: "Moderate", low: 100, high: 116 }
            ]
        }
    },

    "Visakhapatnam": {
        name: "Visakhapatnam",
        state: "Andhra Pradesh",
        station: "Gajuwaka Industrial & Port Area CAAQMS",
        coordinates: [17.6868, 83.2185],
        weatherSummary: "Breezy & Coastal Mist • Wind 15 km/h",
        current: {
            aqi: 85,
            category: "Satisfactory",
            dominantPollutant: "PM10",
            pm25: 42.5,
            pm10: 76.0,
            co: 0.78,
            no2: 26.5,
            so2: 16.2,
            o3: 35.0,
            temperature: 29.0,
            humidity: 80,
            pressure: 1013,
            windSpeed: 14.8,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [74, 64, 73, 97, 102, 78, 60, 66, 74, 85, 106, 94],
            pm25: [37.0, 32.0, 36.5, 48.5, 51.0, 39.0, 30.0, 33.0, 37.2, 42.5, 53.0, 47.0],
            pm10: [67.0, 58.2, 66.0, 86.0, 90.5, 70.5, 55.0, 60.2, 67.5, 76.0, 94.0, 84.0],
            no2: [23.0, 19.5, 22.5, 30.5, 31.8, 24.2, 18.2, 20.2, 23.0, 26.5, 33.2, 29.5],
            so2: [15.0, 13.2, 14.8, 18.5, 19.0, 15.2, 12.6, 13.5, 14.8, 16.2, 20.0, 18.0],
            co: [0.68, 0.59, 0.67, 0.88, 0.93, 0.71, 0.55, 0.61, 0.68, 0.78, 0.96, 0.86],
            o3: [25.8, 25.0, 26.0, 27.0, 29.8, 35.8, 41.0, 41.0, 36.0, 35.0, 33.0, 29.0]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [80, 89, 76, 72, 84, 91, 85],
            pm25: [40.0, 44.5, 38.0, 36.0, 42.0, 45.5, 42.5],
            pm10: [72.0, 79.5, 68.0, 64.5, 75.0, 81.2, 76.0]
        },
        predictions: {
            next6h: 94,
            next12h: 99,
            next24h: 80,
            next48h: 75,
            next72h: 70,
            confidence: "High (±4 AQI)",
            trendText: "Sea breeze helps rapid dispersion of port-side pollutants.",
            hourlyForecast: [
                { hour: "+1h", aqi: 88, category: "Satisfactory", low: 83, high: 93 },
                { hour: "+2h", aqi: 92, category: "Satisfactory", low: 86, high: 98 },
                { hour: "+4h", aqi: 98, category: "Satisfactory", low: 91, high: 105 },
                { hour: "+6h", aqi: 94, category: "Satisfactory", low: 88, high: 100 },
                { hour: "+12h", aqi: 99, category: "Satisfactory", low: 92, high: 106 },
                { hour: "+24h", aqi: 80, category: "Satisfactory", low: 74, high: 86 }
            ]
        }
    },

    "Chennai": {
        name: "Chennai",
        state: "Tamil Nadu",
        station: "Alandur / Anna University Continuous Monitoring Lab",
        coordinates: [13.0827, 80.2707],
        weatherSummary: "Humid & Partly Cloudy • Wind 11 km/h",
        current: {
            aqi: 104,
            category: "Moderate",
            dominantPollutant: "PM2.5",
            pm25: 52.0,
            pm10: 95.0,
            co: 0.95,
            no2: 32.4,
            so2: 15.6,
            o3: 39.0,
            temperature: 30.5,
            humidity: 77,
            pressure: 1011,
            windSpeed: 11.0,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [90, 77, 88, 120, 126, 94, 72, 79, 91, 104, 130, 116],
            pm25: [45.0, 38.5, 44.0, 60.0, 63.0, 47.0, 36.0, 39.5, 45.5, 52.0, 65.0, 58.0],
            pm10: [83.0, 71.8, 81.0, 108.5, 114.0, 87.0, 68.0, 74.0, 84.0, 95.0, 117.0, 105.0],
            no2: [27.5, 23.2, 26.8, 37.0, 39.5, 29.0, 21.4, 23.8, 27.8, 32.4, 41.0, 36.0],
            so2: [14.0, 12.2, 13.8, 18.0, 19.0, 14.5, 11.5, 12.6, 14.0, 15.6, 19.8, 17.8],
            co: [0.82, 0.70, 0.80, 1.10, 1.16, 0.86, 0.66, 0.72, 0.83, 0.95, 1.20, 1.06],
            o3: [28.0, 27.0, 28.0, 29.0, 32.0, 38.5, 44.5, 45.0, 40.0, 39.0, 37.0, 32.0]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [96, 108, 102, 88, 98, 110, 104],
            pm25: [48.0, 54.0, 51.0, 44.0, 49.0, 55.0, 52.0],
            pm10: [88.0, 99.0, 93.0, 81.0, 90.0, 100.5, 95.0]
        },
        predictions: {
            next6h: 118,
            next12h: 125,
            next24h: 96,
            next48h: 92,
            next72h: 88,
            confidence: "Moderate (±6 AQI)",
            trendText: "Moderate morning haze resolving under coastal thermal convection.",
            hourlyForecast: [
                { hour: "+1h", aqi: 108, category: "Moderate", low: 102, high: 114 },
                { hour: "+2h", aqi: 114, category: "Moderate", low: 107, high: 121 },
                { hour: "+4h", aqi: 122, category: "Moderate", low: 114, high: 130 },
                { hour: "+6h", aqi: 118, category: "Moderate", low: 110, high: 126 },
                { hour: "+12h", aqi: 125, category: "Moderate", low: 116, high: 134 },
                { hour: "+24h", aqi: 96, category: "Satisfactory", low: 88, high: 104 }
            ]
        }
    },

    "Bengaluru": {
        name: "Bengaluru",
        state: "Karnataka",
        station: "City Railway Station / BTM Layout CAAQMS",
        coordinates: [12.9716, 77.5946],
        weatherSummary: "Pleasant & Clear • Wind 9 km/h",
        current: {
            aqi: 68,
            category: "Satisfactory",
            dominantPollutant: "PM10",
            pm25: 34.0,
            pm10: 58.0,
            co: 0.58,
            no2: 21.0,
            so2: 9.5,
            o3: 36.0,
            temperature: 24.5,
            humidity: 65,
            pressure: 1014,
            windSpeed: 9.2,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [58, 48, 57, 80, 86, 60, 44, 50, 58, 68, 90, 78],
            pm25: [28.8, 24.0, 28.5, 40.0, 43.0, 30.0, 22.0, 24.8, 29.0, 34.0, 44.8, 39.0],
            pm10: [49.5, 41.8, 49.0, 68.0, 73.0, 52.0, 38.8, 43.2, 50.0, 58.0, 76.0, 66.5],
            no2: [17.8, 14.8, 17.5, 25.0, 27.0, 18.4, 13.5, 15.0, 17.8, 21.0, 28.0, 24.5],
            so2: [8.3, 7.2, 8.2, 11.0, 11.8, 8.8, 6.8, 7.5, 8.4, 9.5, 12.2, 10.8],
            co: [0.49, 0.41, 0.48, 0.68, 0.73, 0.51, 0.38, 0.42, 0.49, 0.58, 0.76, 0.66],
            o3: [26.0, 25.0, 26.0, 27.0, 30.0, 36.0, 42.0, 42.0, 37.0, 36.0, 34.8, 30.0]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [62, 70, 59, 54, 65, 72, 68],
            pm25: [31.0, 35.0, 29.5, 27.0, 32.5, 36.0, 34.0],
            pm10: [53.0, 60.0, 50.5, 46.0, 56.0, 61.5, 58.0]
        },
        predictions: {
            next6h: 75,
            next12h: 80,
            next24h: 62,
            next48h: 56,
            next72h: 52,
            confidence: "High (±3 AQI)",
            trendText: "High altitude and tree cover preserve clean and satisfactory air conditions.",
            hourlyForecast: [
                { hour: "+1h", aqi: 70, category: "Satisfactory", low: 66, high: 74 },
                { hour: "+2h", aqi: 73, category: "Satisfactory", low: 69, high: 77 },
                { hour: "+4h", aqi: 78, category: "Satisfactory", low: 73, high: 83 },
                { hour: "+6h", aqi: 75, category: "Satisfactory", low: 70, high: 80 },
                { hour: "+12h", aqi: 80, category: "Satisfactory", low: 74, high: 86 },
                { hour: "+24h", aqi: 62, category: "Satisfactory", low: 57, high: 67 }
            ]
        }
    },

    "Delhi": {
        name: "Delhi",
        state: "National Capital Region",
        station: "Anand Vihar / RK Puram CAAQMS",
        coordinates: [28.6139, 77.2090],
        weatherSummary: "Smoggy & Inversion Layer • Wind 3 km/h",
        current: {
            aqi: 334,
            category: "Very Poor",
            dominantPollutant: "PM2.5",
            pm25: 165.0,
            pm10: 285.0,
            co: 2.85,
            no2: 92.0,
            so2: 48.5,
            o3: 58.0,
            temperature: 28.5,
            humidity: 52,
            pressure: 1008,
            windSpeed: 4.1,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [313, 290, 314, 352, 358, 320, 283, 295, 318, 334, 360, 345],
            pm25: [144.0, 126.0, 145.0, 188.0, 195.0, 152.0, 120.0, 130.0, 148.5, 165.0, 198.0, 178.0],
            pm10: [248.0, 218.0, 250.0, 320.0, 332.0, 262.0, 208.0, 224.0, 256.0, 285.0, 338.0, 305.0],
            no2: [80.0, 69.5, 80.5, 104.0, 108.0, 84.5, 66.0, 71.5, 82.5, 92.0, 110.0, 98.5],
            so2: [42.5, 37.8, 43.0, 55.0, 57.5, 44.8, 36.0, 38.5, 43.8, 48.5, 58.5, 52.5],
            co: [2.48, 2.18, 2.50, 3.22, 3.35, 2.62, 2.08, 2.24, 2.56, 2.85, 3.40, 3.08],
            o3: [40.0, 38.5, 39.5, 41.0, 46.0, 58.0, 69.0, 68.0, 60.0, 58.0, 53.0, 46.0]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [310, 342, 360, 325, 318, 345, 334],
            pm25: [150.0, 170.0, 182.0, 160.0, 155.0, 172.0, 165.0],
            pm10: [260.0, 295.0, 315.0, 278.0, 270.0, 298.0, 285.0]
        },
        predictions: {
            next6h: 360,
            next12h: 375,
            next24h: 320,
            next48h: 310,
            next72h: 295,
            confidence: "High (±10 AQI)",
            trendText: "Temperature inversion and slow winds keep fine particulates trapped near ground.",
            hourlyForecast: [
                { hour: "+1h", aqi: 342, category: "Very Poor", low: 330, high: 354 },
                { hour: "+2h", aqi: 350, category: "Very Poor", low: 338, high: 362 },
                { hour: "+4h", aqi: 365, category: "Very Poor", low: 352, high: 378 },
                { hour: "+6h", aqi: 360, category: "Very Poor", low: 346, high: 374 },
                { hour: "+12h", aqi: 375, category: "Very Poor", low: 360, high: 390 },
                { hour: "+24h", aqi: 320, category: "Very Poor", low: 305, high: 335 }
            ]
        }
    },

    "Mumbai": {
        name: "Mumbai",
        state: "Maharashtra",
        station: "Bandra Kurla Complex (BKC) CAAQMS",
        coordinates: [19.0760, 72.8777],
        weatherSummary: "Humid & Sea Mist • Wind 13 km/h",
        current: {
            aqi: 128,
            category: "Moderate",
            dominantPollutant: "PM2.5",
            pm25: 64.0,
            pm10: 118.0,
            co: 1.15,
            no2: 42.0,
            so2: 19.5,
            o3: 41.0,
            temperature: 30.0,
            humidity: 79,
            pressure: 1012,
            windSpeed: 12.8,
            lastUpdated: "Just now (Live Telemetry)"
        },
        hourly: {
            labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
            aqi: [110, 95, 108, 142, 150, 118, 90, 100, 114, 128, 155, 139],
            pm25: [55.0, 47.5, 54.0, 71.0, 75.0, 59.0, 45.0, 50.0, 57.0, 64.0, 78.0, 70.0],
            pm10: [101.0, 87.0, 99.0, 131.0, 138.0, 109.0, 83.0, 92.0, 105.0, 118.0, 144.0, 129.0],
            no2: [36.0, 31.0, 35.0, 46.5, 49.0, 39.0, 29.5, 33.0, 37.5, 42.0, 51.0, 46.0],
            so2: [17.0, 14.5, 16.5, 22.0, 23.0, 18.0, 14.0, 15.5, 17.5, 19.5, 24.0, 21.5],
            co: [0.99, 0.85, 0.97, 1.28, 1.35, 1.06, 0.81, 0.90, 1.03, 1.15, 1.40, 1.26],
            o3: [29.0, 28.0, 29.0, 31.0, 34.0, 41.0, 47.0, 47.0, 42.0, 41.0, 38.0, 33.0]
        },
        daily7d: {
            labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
            aqi: [118, 134, 122, 115, 125, 132, 128],
            pm25: [59.0, 67.0, 61.0, 57.5, 62.5, 66.0, 64.0],
            pm10: [109.0, 123.0, 112.0, 106.0, 115.0, 122.0, 118.0]
        },
        predictions: {
            next6h: 142,
            next12h: 148,
            next24h: 120,
            next48h: 114,
            next72h: 108,
            confidence: "Moderate (±7 AQI)",
            trendText: "Traffic density creates peak in evening, ocean winds clear air overnight.",
            hourlyForecast: [
                { hour: "+1h", aqi: 132, category: "Moderate", low: 125, high: 139 },
                { hour: "+2h", aqi: 138, category: "Moderate", low: 130, high: 146 },
                { hour: "+4h", aqi: 146, category: "Moderate", low: 137, high: 155 },
                { hour: "+6h", aqi: 142, category: "Moderate", low: 133, high: 151 },
                { hour: "+12h", aqi: 148, category: "Moderate", low: 138, high: 158 },
                { hour: "+24h", aqi: 120, category: "Moderate", low: 112, high: 128 }
            ]
        }
    }
};

// Historical sample database records for data table (50+ rows across cities)
const HISTORICAL_TABLE_RECORDS = [
    { timestamp: "2026-10-02 18:00", location: "Kakinada", aqi: 72, pm25: 38.5, pm10: 65.2, co: 0.65, no2: 22.4, so2: 12.1, o3: 34.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 17:00", location: "Kakinada", aqi: 68, pm25: 36.2, pm10: 62.0, co: 0.60, no2: 21.0, so2: 11.8, o3: 32.5, category: "Satisfactory" },
    { timestamp: "2026-10-02 16:00", location: "Kakinada", aqi: 65, pm25: 34.0, pm10: 58.5, co: 0.58, no2: 19.5, so2: 11.2, o3: 35.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 15:00", location: "Kakinada", aqi: 62, pm25: 32.1, pm10: 55.0, co: 0.55, no2: 18.2, so2: 10.9, o3: 38.2, category: "Satisfactory" },
    { timestamp: "2026-10-02 14:00", location: "Kakinada", aqi: 59, pm25: 30.5, pm10: 52.4, co: 0.52, no2: 17.5, so2: 10.5, o3: 40.1, category: "Satisfactory" },
    { timestamp: "2026-10-02 18:00", location: "Hyderabad", aqi: 154, pm25: 78.4, pm10: 142.5, co: 1.42, no2: 48.6, so2: 24.2, o3: 46.0, category: "Moderate" },
    { timestamp: "2026-10-02 17:00", location: "Hyderabad", aqi: 146, pm25: 74.2, pm10: 135.0, co: 1.35, no2: 45.0, so2: 23.0, o3: 44.5, category: "Moderate" },
    { timestamp: "2026-10-02 16:00", location: "Hyderabad", aqi: 138, pm25: 69.0, pm10: 126.8, co: 1.26, no2: 41.5, so2: 21.8, o3: 47.0, category: "Moderate" },
    { timestamp: "2026-10-02 15:00", location: "Hyderabad", aqi: 129, pm25: 64.5, pm10: 118.0, co: 1.18, no2: 38.0, so2: 20.5, o3: 50.2, category: "Moderate" },
    { timestamp: "2026-10-02 14:00", location: "Hyderabad", aqi: 122, pm25: 61.0, pm10: 112.5, co: 1.12, no2: 35.5, so2: 19.2, o3: 52.0, category: "Moderate" },
    { timestamp: "2026-10-02 18:00", location: "Vijayawada", aqi: 114, pm25: 56.8, pm10: 102.4, co: 1.08, no2: 34.5, so2: 18.2, o3: 38.0, category: "Moderate" },
    { timestamp: "2026-10-02 17:00", location: "Vijayawada", aqi: 107, pm25: 53.5, pm10: 96.8, co: 1.02, no2: 32.0, so2: 17.4, o3: 36.5, category: "Moderate" },
    { timestamp: "2026-10-02 16:00", location: "Vijayawada", aqi: 98, pm25: 49.0, pm10: 89.5, co: 0.94, no2: 29.2, so2: 16.0, o3: 39.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 15:00", location: "Vijayawada", aqi: 92, pm25: 45.8, pm10: 84.0, co: 0.88, no2: 27.0, so2: 15.2, o3: 42.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 14:00", location: "Vijayawada", aqi: 86, pm25: 43.2, pm10: 79.5, co: 0.83, no2: 25.4, so2: 14.5, o3: 43.8, category: "Satisfactory" },
    { timestamp: "2026-10-02 18:00", location: "Visakhapatnam", aqi: 85, pm25: 42.5, pm10: 76.0, co: 0.78, no2: 26.5, so2: 16.2, o3: 35.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 17:00", location: "Visakhapatnam", aqi: 80, pm25: 40.0, pm10: 72.2, co: 0.73, no2: 24.8, so2: 15.5, o3: 33.5, category: "Satisfactory" },
    { timestamp: "2026-10-02 16:00", location: "Visakhapatnam", aqi: 74, pm25: 37.2, pm10: 67.5, co: 0.68, no2: 23.0, so2: 14.8, o3: 36.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 15:00", location: "Visakhapatnam", aqi: 70, pm25: 34.8, pm10: 63.0, co: 0.64, no2: 21.5, so2: 14.0, o3: 39.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 14:00", location: "Visakhapatnam", aqi: 66, pm25: 33.0, pm10: 60.2, co: 0.61, no2: 20.2, so2: 13.5, o3: 41.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 18:00", location: "Chennai", aqi: 104, pm25: 52.0, pm10: 95.0, co: 0.95, no2: 32.4, so2: 15.6, o3: 39.0, category: "Moderate" },
    { timestamp: "2026-10-02 17:00", location: "Chennai", aqi: 98, pm25: 49.0, pm10: 90.2, co: 0.90, no2: 30.2, so2: 14.8, o3: 37.5, category: "Satisfactory" },
    { timestamp: "2026-10-02 16:00", location: "Chennai", aqi: 91, pm25: 45.5, pm10: 84.0, co: 0.83, no2: 27.8, so2: 14.0, o3: 40.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 15:00", location: "Chennai", aqi: 84, pm25: 42.0, pm10: 78.5, co: 0.77, no2: 25.5, so2: 13.2, o3: 43.2, category: "Satisfactory" },
    { timestamp: "2026-10-02 14:00", location: "Chennai", aqi: 79, pm25: 39.5, pm10: 74.0, co: 0.72, no2: 23.8, so2: 12.6, o3: 45.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 18:00", location: "Bengaluru", aqi: 68, pm25: 34.0, pm10: 58.0, co: 0.58, no2: 21.0, so2: 9.5, o3: 36.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 17:00", location: "Bengaluru", aqi: 64, pm25: 31.8, pm10: 54.5, co: 0.54, no2: 19.5, so2: 9.0, o3: 34.5, category: "Satisfactory" },
    { timestamp: "2026-10-02 16:00", location: "Bengaluru", aqi: 58, pm25: 29.0, pm10: 50.0, co: 0.49, no2: 17.8, so2: 8.4, o3: 37.0, category: "Satisfactory" },
    { timestamp: "2026-10-02 15:00", location: "Bengaluru", aqi: 53, pm25: 26.5, pm10: 46.0, co: 0.45, no2: 16.2, so2: 7.9, o3: 40.5, category: "Satisfactory" },
    { timestamp: "2026-10-02 14:00", location: "Bengaluru", aqi: 50, pm25: 24.8, pm10: 43.2, co: 0.42, no2: 15.0, so2: 7.5, o3: 42.0, category: "Good" },
    { timestamp: "2026-10-02 18:00", location: "Delhi", aqi: 334, pm25: 165.0, pm10: 285.0, co: 2.85, no2: 92.0, so2: 48.5, o3: 58.0, category: "Very Poor" },
    { timestamp: "2026-10-02 17:00", location: "Delhi", aqi: 326, pm25: 158.0, pm10: 272.0, co: 2.72, no2: 88.0, so2: 46.0, o3: 55.5, category: "Very Poor" },
    { timestamp: "2026-10-02 16:00", location: "Delhi", aqi: 318, pm25: 148.5, pm10: 256.0, co: 2.56, no2: 82.5, so2: 43.8, o3: 60.0, category: "Very Poor" },
    { timestamp: "2026-10-02 15:00", location: "Delhi", aqi: 306, pm25: 138.0, pm10: 238.0, co: 2.38, no2: 76.0, so2: 41.0, o3: 65.2, category: "Very Poor" },
    { timestamp: "2026-10-02 14:00", location: "Delhi", aqi: 295, pm25: 130.0, pm10: 224.0, co: 2.24, no2: 71.5, so2: 38.5, o3: 68.0, category: "Poor" },
    { timestamp: "2026-10-02 18:00", location: "Mumbai", aqi: 128, pm25: 64.0, pm10: 118.0, co: 1.15, no2: 42.0, so2: 19.5, o3: 41.0, category: "Moderate" },
    { timestamp: "2026-10-02 17:00", location: "Mumbai", aqi: 122, pm25: 61.0, pm10: 112.5, co: 1.09, no2: 40.0, so2: 18.8, o3: 39.5, category: "Moderate" },
    { timestamp: "2026-10-02 16:00", location: "Mumbai", aqi: 115, pm25: 57.5, pm10: 106.0, co: 1.03, no2: 37.8, so2: 17.6, o3: 42.0, category: "Moderate" },
    { timestamp: "2026-10-02 15:00", location: "Mumbai", aqi: 108, pm25: 54.0, pm10: 100.0, co: 0.97, no2: 35.5, so2: 16.5, o3: 45.5, category: "Moderate" },
    { timestamp: "2026-10-02 14:00", location: "Mumbai", aqi: 100, pm25: 50.0, pm10: 92.0, co: 0.90, no2: 33.0, so2: 15.5, o3: 47.0, category: "Satisfactory" }
];

// Breakpoint tables according to CPCB National Air Quality Index calculation
const CPCB_BREAKPOINTS = {
    pm25: [
        { cLow: 0, cHigh: 30, iLow: 0, iHigh: 50 },
        { cLow: 31, cHigh: 60, iLow: 51, iHigh: 100 },
        { cLow: 61, cHigh: 90, iLow: 101, iHigh: 200 },
        { cLow: 91, cHigh: 120, iLow: 201, iHigh: 300 },
        { cLow: 121, cHigh: 250, iLow: 301, iHigh: 400 },
        { cLow: 251, cHigh: 500, iLow: 401, iHigh: 500 }
    ],
    pm10: [
        { cLow: 0, cHigh: 50, iLow: 0, iHigh: 50 },
        { cLow: 51, cHigh: 100, iLow: 51, iHigh: 100 },
        { cLow: 101, cHigh: 250, iLow: 101, iHigh: 200 },
        { cLow: 251, cHigh: 350, iLow: 201, iHigh: 300 },
        { cLow: 351, cHigh: 430, iLow: 301, iHigh: 400 },
        { cLow: 431, cHigh: 600, iLow: 401, iHigh: 500 }
    ],
    no2: [
        { cLow: 0, cHigh: 40, iLow: 0, iHigh: 50 },
        { cLow: 41, cHigh: 80, iLow: 51, iHigh: 100 },
        { cLow: 81, cHigh: 180, iLow: 101, iHigh: 200 },
        { cLow: 181, cHigh: 280, iLow: 201, iHigh: 300 },
        { cLow: 281, cHigh: 400, iLow: 301, iHigh: 400 },
        { cLow: 401, cHigh: 800, iLow: 401, iHigh: 500 }
    ],
    so2: [
        { cLow: 0, cHigh: 40, iLow: 0, iHigh: 50 },
        { cLow: 41, cHigh: 80, iLow: 51, iHigh: 100 },
        { cLow: 81, cHigh: 380, iLow: 101, iHigh: 200 },
        { cLow: 381, cHigh: 800, iLow: 201, iHigh: 300 },
        { cLow: 801, cHigh: 1600, iLow: 301, iHigh: 400 },
        { cLow: 1601, cHigh: 2000, iLow: 401, iHigh: 500 }
    ],
    co: [
        { cLow: 0, cHigh: 1.0, iLow: 0, iHigh: 50 },
        { cLow: 1.1, cHigh: 2.0, iLow: 51, iHigh: 100 },
        { cLow: 2.1, cHigh: 10.0, iLow: 101, iHigh: 200 },
        { cLow: 10.1, cHigh: 17.0, iLow: 201, iHigh: 300 },
        { cLow: 17.1, cHigh: 34.0, iLow: 301, iHigh: 400 },
        { cLow: 34.1, cHigh: 50.0, iLow: 401, iHigh: 500 }
    ],
    o3: [
        { cLow: 0, cHigh: 50, iLow: 0, iHigh: 50 },
        { cLow: 51, cHigh: 100, iLow: 51, iHigh: 100 },
        { cLow: 101, cHigh: 168, iLow: 101, iHigh: 200 },
        { cLow: 169, cHigh: 208, iLow: 201, iHigh: 300 },
        { cLow: 209, cHigh: 748, iLow: 301, iHigh: 400 },
        { cLow: 749, cHigh: 1000, iLow: 401, iHigh: 500 }
    ]
};

/**
 * Calculates Sub-Index for a single pollutant using piecewise linear interpolation
 * Formula: Ip = ((Ihi - Ilo) / (Bhi - Blo)) * (Cp - Blo) + Ilo
 */
function calculateSubIndex(pollutant, concentration) {
    const table = CPCB_BREAKPOINTS[pollutant];
    if (!table) return 0;

    const val = parseFloat(concentration);
    if (isNaN(val) || val < 0) return 0;

    for (let i = 0; i < table.length; i++) {
        const bp = table[i];
        if (val >= bp.cLow && val <= bp.cHigh) {
            const subIndex = ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (val - bp.cLow) + bp.iLow;
            return Math.round(subIndex);
        }
    }

    // If beyond max high
    const maxBp = table[table.length - 1];
    if (val > maxBp.cHigh) return 500;
    return 0;
}

/**
 * Returns Category Object based on AQI value (0 - 500)
 */
function getAQICategory(aqi) {
    const val = Math.round(aqi);
    if (val <= 50) return AQI_CATEGORIES.GOOD;
    if (val <= 100) return AQI_CATEGORIES.SATISFACTORY;
    if (val <= 200) return AQI_CATEGORIES.MODERATE;
    if (val <= 300) return AQI_CATEGORIES.POOR;
    if (val <= 400) return AQI_CATEGORIES.VERY_POOR;
    return AQI_CATEGORIES.SEVERE;
}

/**
 * Simple multi-variable regression model predictor in JavaScript
 * Weights trained from sample historical data
 */
function predictAQIFromFeatures(features) {
    // Standard Linear Regression formula coefficients:
    // AQI = b0 + b1*PM2.5 + b2*PM10 + b3*NO2 + b4*SO2 + b5*CO + b6*O3 + b7*Temp + b8*Humidity
    const b0 = 5.2;
    const b_pm25 = 1.25;
    const b_pm10 = 0.35;
    const b_no2 = 0.28;
    const b_so2 = 0.22;
    const b_co = 14.5;
    const b_o3 = 0.18;
    const b_temp = -0.15;
    const b_hum = -0.10;

    const rawPred = b0 + 
        (b_pm25 * (features.pm25 || 0)) + 
        (b_pm10 * (features.pm10 || 0)) + 
        (b_no2 * (features.no2 || 0)) + 
        (b_so2 * (features.so2 || 0)) + 
        (b_co * (features.co || 0)) + 
        (b_o3 * (features.o3 || 0)) + 
        (b_temp * (features.temp || 28)) + 
        (b_hum * (features.humidity || 70));

    // Clamping to 0 - 500 standard range
    const predictedAQI = Math.min(500, Math.max(10, Math.round(rawPred)));
    const category = getAQICategory(predictedAQI);

    // Identify dominant pollutant
    const subIndices = [
        { name: "PM2.5", sub: calculateSubIndex("pm25", features.pm25) },
        { name: "PM10", sub: calculateSubIndex("pm10", features.pm10) },
        { name: "NO2", sub: calculateSubIndex("no2", features.no2) },
        { name: "SO2", sub: calculateSubIndex("so2", features.so2) },
        { name: "CO", sub: calculateSubIndex("co", features.co) },
        { name: "O3", sub: calculateSubIndex("o3", features.o3) }
    ];
    subIndices.sort((a, b) => b.sub - a.sub);

    return {
        predictedAQI: predictedAQI,
        category: category,
        dominantPollutant: subIndices[0].name,
        dominantSubIndex: subIndices[0].sub
    };
}
