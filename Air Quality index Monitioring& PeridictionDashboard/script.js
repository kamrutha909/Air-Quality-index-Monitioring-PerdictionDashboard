/**
 * Air Quality Index (AQI) Monitoring & Prediction Dashboard
 * Main Interactive Frontend Script
 * 
 * Features:
 * - Real-time AQI telemetry updating & city switching
 * - CPCB Standard Sub-Index calculation & gauge animation
 * - Chart.js 4.x Interactive Line, Bar & Radar visualizations
 * - Machine Learning What-If Simulator & Multi-timeframe forecasting
 * - Filterable, searchable, paginated data table with CSV export
 * - Live sensor simulation engine for project demonstrations
 */

// Global State
let currentCity = "Kakinada";
let currentTrendTimeframe = "24h"; // '24h' or '7d'
let isLiveSimActive = true;
let simIntervalId = null;
let currentTablePage = 1;
const rowsPerPage = 8;
let filteredRecords = [...HISTORICAL_TABLE_RECORDS];

// Chart Instances
let aqiTrendChartInstance = null;
let pollutantRadarChartInstance = null;
let particulateChartInstance = null;
let gasPollutantChartInstance = null;
let predictionTrendChartInstance = null;

// ==========================================================================
// Initialization on DOM Loaded
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
    console.log("AQI Dashboard Initializing...");

    // Initialize Chart instances
    initCharts();

    // Populate Initial Dashboard View
    updateDashboard(currentCity);

    // Populate Initial Data Table
    renderDataTable();

    // Setup Event Listeners
    setupEventListeners();

    // Start Live Telemetry Simulation Engine
    startLiveSimulation();

    // Run initial What-If Prediction
    runInteractivePrediction();

    console.log("AQI Dashboard successfully loaded & ready!");
});

// ==========================================================================
// Event Listeners Setup
// ==========================================================================
function setupEventListeners() {
    // City Selection Dropdown
    const citySelect = document.getElementById("citySelect");
    if (citySelect) {
        citySelect.addEventListener("change", function (e) {
            currentCity = e.target.value;
            updateDashboard(currentCity);
        });
    }

    // Live Mode Simulation Toggle
    const liveToggle = document.getElementById("liveSimToggle");
    if (liveToggle) {
        liveToggle.addEventListener("click", function () {
            isLiveSimActive = !isLiveSimActive;
            const textSpan = document.getElementById("liveSimText");
            const dot = liveToggle.querySelector(".live-pulse-dot");

            if (isLiveSimActive) {
                textSpan.textContent = "Live Mode: Active";
                liveToggle.style.color = "#10b981";
                liveToggle.style.borderColor = "rgba(16, 185, 129, 0.3)";
                dot.style.display = "block";
                startLiveSimulation();
            } else {
                textSpan.textContent = "Live Mode: Paused";
                liveToggle.style.color = "#94a3b8";
                liveToggle.style.borderColor = "rgba(148, 163, 184, 0.3)";
                dot.style.display = "none";
                clearInterval(simIntervalId);
            }
        });
    }

    // Theme Toggle (Dark / Light)
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-theme");
            const isLight = document.body.classList.contains("light-theme");
            const icon = document.getElementById("themeIcon");
            if (isLight) {
                icon.className = "fa-solid fa-sun";
                icon.style.color = "#f59e0b";
            } else {
                icon.className = "fa-solid fa-moon";
                icon.style.color = "";
            }
            updateChartThemeColors(isLight);
        });
    }
}

// Quick City Selector from Footer Links
function selectCityFromFooter(cityName) {
    const citySelect = document.getElementById("citySelect");
    if (citySelect && CITIES_DATA[cityName]) {
        citySelect.value = cityName;
        currentCity = cityName;
        updateDashboard(cityName);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// ==========================================================================
// Dashboard Update Engine (Updates all cards, gauges, charts & predictions)
// ==========================================================================
function updateDashboard(cityName) {
    const cityData = CITIES_DATA[cityName];
    if (!cityData) return;

    const current = cityData.current;
    const categoryObj = getAQICategory(current.aqi);

    // 1. Update CSS Dynamic Theme Variables
    document.documentElement.style.setProperty('--current-aqi-color', categoryObj.color);
    document.documentElement.style.setProperty('--current-aqi-bg', categoryObj.bgColor);

    // 2. Update Location Meta Info
    document.getElementById("displayCityName").innerHTML = `
        <i class="fa-solid fa-city" style="font-size: 1.1rem; color: var(--accent-cyan);"></i>
        ${cityData.name}
    `;
    document.getElementById("displayCityState").textContent = `${cityData.state}, India`;
    document.getElementById("displayStationInfo").textContent = cityData.station;

    // 3. Update Hero AQI Card Display
    document.getElementById("currentAqiValue").textContent = current.aqi;
    document.getElementById("currentAqiValue").style.color = categoryObj.color;

    const badgePill = document.getElementById("currentAqiCategoryBadge");
    badgePill.style.background = categoryObj.color;
    document.getElementById("currentAqiCategoryText").textContent = categoryObj.name;
    
    const badgeIcon = document.getElementById("categoryBadgeIcon");
    badgeIcon.className = `fa-solid ${categoryObj.icon}`;

    document.getElementById("dominantPollutantText").textContent = current.dominantPollutant;
    document.getElementById("lastUpdatedTime").textContent = current.lastUpdated;

    // 4. Update Circular Gauge Meter Needle
    updateGaugeMeter(current.aqi);

    // 5. Update 8 Parameter Cards
    updateParameterCards(current);

    // 6. Update Health Advisories
    updateHealthSection(categoryObj);

    // 7. Update Prediction Cards & Forecasts
    updatePredictionSection(cityData);

    // 8. Update Charts
    updateAllCharts(cityData);
}

// ==========================================================================
// Circular AQI Gauge Meter Updater (0 - 500 Scale)
// ==========================================================================
function updateGaugeMeter(aqi) {
    const needle = document.getElementById("gaugeNeedleGroup");
    if (!needle) return;

    // Scale 0 -> -90deg, 250 -> 0deg, 500 -> +90deg (Span: 180 degrees total)
    const clampedAQI = Math.min(500, Math.max(0, aqi));
    const rotationAngle = -90 + (clampedAQI / 500) * 180;

    needle.style.transform = `rotate(${rotationAngle}deg)`;
}

// ==========================================================================
// Update 8 Environmental Parameter Cards
// ==========================================================================
function updateParameterCards(current) {
    // Helper to update a single card
    const updateCard = (valId, progId, subId, val, standard, maxScale, subIndex, category) => {
        const valElem = document.getElementById(valId);
        const progElem = document.getElementById(progId);
        const subElem = document.getElementById(subId);

        if (valElem) valElem.textContent = val;
        
        if (progElem) {
            const pct = Math.min(100, Math.round((val / maxScale) * 100));
            progElem.style.width = `${pct}%`;
            progElem.style.background = category.color;
        }

        if (subElem) {
            subElem.textContent = `Sub-Index: ${subIndex}`;
            subElem.style.color = category.color;
            subElem.style.background = category.bgColor;
        }
    };

    // Calculate sub-indices & categories
    const subPM25 = calculateSubIndex("pm25", current.pm25);
    const catPM25 = getAQICategory(subPM25);
    updateCard("valPM25", "progressPM25", "subPM25", current.pm25, 60, 150, subPM25, catPM25);

    const subPM10 = calculateSubIndex("pm10", current.pm10);
    const catPM10 = getAQICategory(subPM10);
    updateCard("valPM10", "progressPM10", "subPM10", current.pm10, 100, 250, subPM10, catPM10);

    const subCO = calculateSubIndex("co", current.co);
    const catCO = getAQICategory(subCO);
    updateCard("valCO", "progressCO", "subCO", current.co, 2.0, 5.0, subCO, catCO);

    const subNO2 = calculateSubIndex("no2", current.no2);
    const catNO2 = getAQICategory(subNO2);
    updateCard("valNO2", "progressNO2", "subNO2", current.no2, 80, 150, subNO2, catNO2);

    const subSO2 = calculateSubIndex("so2", current.so2);
    const catSO2 = getAQICategory(subSO2);
    updateCard("valSO2", "progressSO2", "subSO2", current.so2, 80, 120, subSO2, catSO2);

    const subO3 = calculateSubIndex("o3", current.o3);
    const catO3 = getAQICategory(subO3);
    updateCard("valO3", "progressO3", "subO3", current.o3, 100, 180, subO3, catO3);

    // Weather params
    document.getElementById("valTemp").textContent = current.temperature;
    document.getElementById("progressTemp").style.width = `${Math.min(100, (current.temperature / 50) * 100)}%`;

    document.getElementById("valHumidity").textContent = current.humidity;
    document.getElementById("progressHumidity").style.width = `${current.humidity}%`;
}

// ==========================================================================
// Health Recommendations Updater
// ==========================================================================
function updateHealthSection(categoryObj) {
    // Top Quick Card
    document.getElementById("quickAdvisoryHeadline").textContent = `Air Quality is ${categoryObj.name}`;
    document.getElementById("quickAdvisoryText").textContent = categoryObj.summary;

    const quickList = document.getElementById("quickGuidelinesList");
    if (quickList && categoryObj.precautions) {
        quickList.innerHTML = categoryObj.precautions.map(p => `
            <li>
                <i class="fa-solid fa-circle-dot" style="color: ${categoryObj.color};"></i>
                <span>${p}</span>
            </li>
        `).join("");
    }

    // Health Alert Banner
    const banner = document.getElementById("healthBannerAlert");
    banner.style.background = categoryObj.bgColor;
    banner.style.borderColor = categoryObj.color;
    document.getElementById("healthAlertIconCircle").style.background = categoryObj.color;
    document.getElementById("healthAlertTitle").textContent = `Category: ${categoryObj.name} Air Quality Advisory`;
    document.getElementById("healthAlertDesc").textContent = categoryObj.advisory;

    // Action Cards
    const isGoodOrSat = categoryObj.name === "Good" || categoryObj.name === "Satisfactory";
    const isModerate = categoryObj.name === "Moderate";
    const isSevereOrPoor = categoryObj.name === "Poor" || categoryObj.name === "Very Poor" || categoryObj.name === "Severe";

    // 1. Exercise
    const advExerciseTag = document.getElementById("advExerciseTag");
    const advExerciseDesc = document.getElementById("advExerciseDesc");
    if (isGoodOrSat) {
        advExerciseTag.textContent = "Safe for All";
        advExerciseTag.style.background = "rgba(16, 185, 129, 0.15)";
        advExerciseTag.style.color = "#10b981";
        advExerciseDesc.textContent = "Ideal for jogging, cycling, and outdoor workouts. No restrictions necessary.";
    } else if (isModerate) {
        advExerciseTag.textContent = "Limit Heavy Exertion";
        advExerciseTag.style.background = "rgba(234, 179, 8, 0.15)";
        advExerciseTag.style.color = "#eab308";
        advExerciseDesc.textContent = "Take regular breaks during heavy outdoor exercise. Avoid high-traffic corridors.";
    } else {
        advExerciseTag.textContent = "Avoid Outdoor Workouts";
        advExerciseTag.style.background = "rgba(239, 68, 68, 0.15)";
        advExerciseTag.style.color = "#ef4444";
        advExerciseDesc.textContent = "Strictly shift all physical fitness activities indoors. High particulate exposure risk.";
    }

    // 2. Sensitive Groups
    const advSensitiveTag = document.getElementById("advSensitiveTag");
    const advSensitiveDesc = document.getElementById("advSensitiveDesc");
    if (isGoodOrSat) {
        advSensitiveTag.textContent = "Normal Precautions";
        advSensitiveTag.style.background = "rgba(132, 204, 22, 0.15)";
        advSensitiveTag.style.color = "#84cc16";
        advSensitiveDesc.textContent = "Sensitive individuals can carry out standard daily routines safely.";
    } else if (isModerate) {
        advSensitiveTag.textContent = "Precautionary Monitoring";
        advSensitiveTag.style.background = "rgba(234, 179, 8, 0.15)";
        advSensitiveTag.style.color = "#eab308";
        advSensitiveDesc.textContent = "People with asthma, lung ailments, and children should limit prolonged outdoor play.";
    } else {
        advSensitiveTag.textContent = "Strict Protection Required";
        advSensitiveTag.style.background = "rgba(239, 68, 68, 0.15)";
        advSensitiveTag.style.color = "#ef4444";
        advSensitiveDesc.textContent = "Children and seniors must stay indoors with air purification and emergency meds on standby.";
    }

    // 3. Mask Guidance
    const advMaskTag = document.getElementById("advMaskTag");
    const advMaskDesc = document.getElementById("advMaskDesc");
    if (isGoodOrSat) {
        advMaskTag.textContent = "Not Required";
        advMaskTag.style.background = "rgba(16, 185, 129, 0.15)";
        advMaskTag.style.color = "#10b981";
        advMaskDesc.textContent = "Ambient air particulate concentration is safe; face masks are not required.";
    } else if (isModerate) {
        advMaskTag.textContent = "Recommended in Traffic";
        advMaskTag.style.background = "rgba(234, 179, 8, 0.15)";
        advMaskTag.style.color = "#eab308";
        advMaskDesc.textContent = "Consider light particulate masks when commuting through congested vehicular zones.";
    } else {
        advMaskTag.textContent = "Mandatory N95 / KN95";
        advMaskTag.style.background = "rgba(239, 68, 68, 0.15)";
        advMaskTag.style.color = "#ef4444";
        advMaskDesc.textContent = "Certified N95 / FFP2 respirators are essential for all unavoidable outdoor travel.";
    }

    // 4. Ventilation
    const advVentilationTag = document.getElementById("advVentilationTag");
    const advVentilationDesc = document.getElementById("advVentilationDesc");
    if (isGoodOrSat) {
        advVentilationTag.textContent = "Open Windows";
        advVentilationTag.style.background = "rgba(16, 185, 129, 0.15)";
        advVentilationTag.style.color = "#10b981";
        advVentilationDesc.textContent = "Open windows to facilitate fresh air circulation and natural ambient cross-breeze.";
    } else if (isModerate) {
        advVentilationTag.textContent = "Ventilate Off-Peak";
        advVentilationTag.style.background = "rgba(234, 179, 8, 0.15)";
        advVentilationTag.style.color = "#eab308";
        advVentilationDesc.textContent = "Open windows only during mid-afternoon; keep closed during morning & evening rush hours.";
    } else {
        advVentilationTag.textContent = "Keep Windows Closed";
        advVentilationTag.style.background = "rgba(239, 68, 68, 0.15)";
        advVentilationTag.style.color = "#ef4444";
        advVentilationDesc.textContent = "Keep windows and exterior doors tightly sealed. Turn on indoor HEPA filtration.";
    }
}

// ==========================================================================
// Prediction Section Updater (Forecast Cards & Trajectory)
// ==========================================================================
function updatePredictionSection(cityData) {
    const preds = cityData.predictions;
    if (!preds) return;

    const setForecastCard = (valId, badgeId, aqiVal) => {
        const cat = getAQICategory(aqiVal);
        const valElem = document.getElementById(valId);
        const badgeElem = document.getElementById(badgeId);

        if (valElem) {
            valElem.textContent = aqiVal;
            valElem.style.color = cat.color;
        }
        if (badgeElem) {
            badgeElem.textContent = cat.name;
            badgeElem.style.background = cat.color;
        }
    };

    setForecastCard("pred6hVal", "pred6hBadge", preds.next6h);
    setForecastCard("pred12hVal", "pred12hBadge", preds.next12h);
    setForecastCard("pred24hVal", "pred24hBadge", preds.next24h);
    setForecastCard("pred48hVal", "pred48hBadge", preds.next48h);
    setForecastCard("pred72hVal", "pred72hBadge", preds.next72h);

    document.getElementById("predConfidenceBadge").textContent = preds.confidence;
}

// ==========================================================================
// Interactive What-If ML Simulator
// ==========================================================================
function runInteractivePrediction() {
    const pm25 = parseFloat(document.getElementById("simPM25").value);
    const pm10 = parseFloat(document.getElementById("simPM10").value);
    const no2 = parseFloat(document.getElementById("simNO2").value);
    const co = parseFloat(document.getElementById("simCO").value);

    // Update Slider Display Text
    document.getElementById("simPM25Val").textContent = pm25;
    document.getElementById("simPM10Val").textContent = pm10;
    document.getElementById("simNO2Val").textContent = no2;
    document.getElementById("simCOVal").textContent = co.toFixed(1);

    // Run statistical ML predictor function from data.js
    const result = predictAQIFromFeatures({
        pm25: pm25,
        pm10: pm10,
        no2: no2,
        co: co,
        so2: 15.0,
        o3: 35.0,
        temp: 29.0,
        humidity: 70
    });

    // Update Simulator Output Box
    const resValue = document.getElementById("simResultAQI");
    const resBadge = document.getElementById("simResultBadge");
    const resDominant = document.getElementById("simDominantText");

    resValue.textContent = result.predictedAQI;
    resValue.style.color = result.category.color;

    resBadge.textContent = result.category.name;
    resBadge.style.background = result.category.color;

    resDominant.innerHTML = `Dominant Factor: <strong>${result.dominantPollutant} (Sub-Index: ${result.dominantSubIndex})</strong>`;
}

// ==========================================================================
// Chart.js Visualizations Setup & Dynamic Updates
// ==========================================================================
function initCharts() {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // 1. AQI Trend Chart
    const ctxTrend = document.getElementById('aqiTrendChart').getContext('2d');
    aqiTrendChartInstance = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'AQI Index',
                data: [],
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: '#38bdf8',
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#f8fafc',
                    bodyColor: '#38bdf8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 400,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { font: { size: 11 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });

    // 2. Pollutants Radar / Breakdown Chart
    const ctxRadar = document.getElementById('pollutantRadarChart').getContext('2d');
    pollutantRadarChartInstance = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3'],
            datasets: [{
                label: 'Sub-Index',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(99, 102, 241, 0.25)',
                borderColor: '#6366f1',
                borderWidth: 2,
                pointBackgroundColor: '#6366f1',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
                    grid: { color: 'rgba(255, 255, 255, 0.08)' },
                    pointLabels: {
                        font: { size: 12, weight: '600' },
                        color: '#f8fafc'
                    },
                    ticks: { display: false, beginAtZero: true }
                }
            }
        }
    });

    // 3. Particulates (PM2.5 vs PM10) Line Chart
    const ctxParticulate = document.getElementById('particulateChart').getContext('2d');
    particulateChartInstance = new Chart(ctxParticulate, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'PM2.5 (Fine)',
                    data: [],
                    borderColor: '#f43f5e',
                    backgroundColor: 'rgba(244, 63, 94, 0.1)',
                    borderWidth: 2,
                    tension: 0.35,
                    pointRadius: 3
                },
                {
                    label: 'PM10 (Coarse)',
                    data: [],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    tension: 0.35,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { boxWidth: 12, font: { size: 11 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // 4. Gas Pollutants Bar Chart
    const ctxGas = document.getElementById('gasPollutantChart').getContext('2d');
    gasPollutantChartInstance = new Chart(ctxGas, {
        type: 'bar',
        data: {
            labels: ['NO2 (µg/m³)', 'SO2 (µg/m³)', 'CO (×10 mg/m³)', 'O3 (µg/m³)'],
            datasets: [{
                label: 'Current Concentration',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgba(6, 182, 212, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(249, 115, 22, 0.7)',
                    'rgba(168, 85, 247, 0.7)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // 5. Prediction Trajectory Chart
    const ctxPred = document.getElementById('predictionTrendChart').getContext('2d');
    predictionTrendChartInstance = new Chart(ctxPred, {
        type: 'line',
        data: {
            labels: ['-4h', '-2h', 'Current', '+1h', '+2h', '+4h', '+6h', '+12h', '+24h'],
            datasets: [
                {
                    label: 'Historical / Live',
                    data: [],
                    borderColor: '#38bdf8',
                    borderWidth: 2.5,
                    pointRadius: 4,
                    tension: 0.3
                },
                {
                    label: 'ML Forecast Model',
                    data: [],
                    borderColor: '#c084fc',
                    borderWidth: 2.5,
                    borderDash: [6, 4],
                    pointRadius: 5,
                    pointBackgroundColor: '#c084fc',
                    tension: 0.35
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { boxWidth: 14, font: { size: 11 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// Update All Charts Data
function updateAllCharts(cityData) {
    if (!cityData) return;

    // 1. AQI Trend
    if (aqiTrendChartInstance) {
        if (currentTrendTimeframe === "24h") {
            aqiTrendChartInstance.data.labels = cityData.hourly.labels;
            aqiTrendChartInstance.data.datasets[0].data = cityData.hourly.aqi;
        } else {
            aqiTrendChartInstance.data.labels = cityData.daily7d.labels;
            aqiTrendChartInstance.data.datasets[0].data = cityData.daily7d.aqi;
        }
        aqiTrendChartInstance.update();
    }

    // 2. Pollutant Radar (Sub-indices)
    if (pollutantRadarChartInstance) {
        const cur = cityData.current;
        const subPM25 = calculateSubIndex("pm25", cur.pm25);
        const subPM10 = calculateSubIndex("pm10", cur.pm10);
        const subNO2 = calculateSubIndex("no2", cur.no2);
        const subSO2 = calculateSubIndex("so2", cur.so2);
        const subCO = calculateSubIndex("co", cur.co);
        const subO3 = calculateSubIndex("o3", cur.o3);

        pollutantRadarChartInstance.data.datasets[0].data = [subPM25, subPM10, subNO2, subSO2, subCO, subO3];
        pollutantRadarChartInstance.update();
    }

    // 3. Particulates (PM2.5 vs PM10)
    if (particulateChartInstance) {
        particulateChartInstance.data.labels = cityData.hourly.labels;
        particulateChartInstance.data.datasets[0].data = cityData.hourly.pm25;
        particulateChartInstance.data.datasets[1].data = cityData.hourly.pm10;
        particulateChartInstance.update();
    }

    // 4. Gas Pollutants Bar
    if (gasPollutantChartInstance) {
        const cur = cityData.current;
        gasPollutantChartInstance.data.datasets[0].data = [cur.no2, cur.so2, cur.co * 10, cur.o3];
        gasPollutantChartInstance.update();
    }

    // 5. Prediction Trajectory Chart
    if (predictionTrendChartInstance && cityData.predictions.hourlyForecast) {
        const h = cityData.hourly.aqi;
        const curAQI = cityData.current.aqi;
        const f = cityData.predictions.hourlyForecast;

        const histData = [h[h.length - 3], h[h.length - 2], curAQI, null, null, null, null, null, null];
        const forecastData = [null, null, curAQI, f[0].aqi, f[1].aqi, f[2].aqi, f[3].aqi, f[4].aqi, f[5].aqi];

        predictionTrendChartInstance.data.datasets[0].data = histData;
        predictionTrendChartInstance.data.datasets[1].data = forecastData;
        predictionTrendChartInstance.update();
    }
}

// Switch Trend timeframe button
function switchTrendTimeframe(tf) {
    currentTrendTimeframe = tf;
    document.getElementById("btnTrend24h").classList.toggle("active", tf === "24h");
    document.getElementById("btnTrend7d").classList.toggle("active", tf === "7d");

    const cityData = CITIES_DATA[currentCity];
    if (cityData && aqiTrendChartInstance) {
        if (tf === "24h") {
            aqiTrendChartInstance.data.labels = cityData.hourly.labels;
            aqiTrendChartInstance.data.datasets[0].data = cityData.hourly.aqi;
        } else {
            aqiTrendChartInstance.data.labels = cityData.daily7d.labels;
            aqiTrendChartInstance.data.datasets[0].data = cityData.daily7d.aqi;
        }
        aqiTrendChartInstance.update();
    }
}

// Chart theme updater (Dark / Light)
function updateChartThemeColors(isLight) {
    const textColor = isLight ? '#475569' : '#94a3b8';
    const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)';

    const chartInstances = [aqiTrendChartInstance, particulateChartInstance, gasPollutantChartInstance, predictionTrendChartInstance];
    chartInstances.forEach(chart => {
        if (chart) {
            chart.options.scales.x.ticks.color = textColor;
            chart.options.scales.y.ticks.color = textColor;
            chart.options.scales.y.grid.color = gridColor;
            chart.update();
        }
    });

    if (pollutantRadarChartInstance) {
        pollutantRadarChartInstance.options.scales.r.pointLabels.color = isLight ? '#0f172a' : '#f8fafc';
        pollutantRadarChartInstance.options.scales.r.grid.color = gridColor;
        pollutantRadarChartInstance.update();
    }
}

// ==========================================================================
// Historical Data Table Management (Search, Pagination, CSV Export)
// ==========================================================================
function renderDataTable() {
    const tbody = document.getElementById("dataTableBody");
    if (!tbody) return;

    const total = filteredRecords.length;
    const startIndex = (currentTablePage - 1) * rowsPerPage;
    const paginatedItems = filteredRecords.slice(startIndex, startIndex + rowsPerPage);

    tbody.innerHTML = paginatedItems.map(row => {
        const cat = getAQICategory(row.aqi);
        return `
            <tr>
                <td><strong>${row.timestamp}</strong></td>
                <td><i class="fa-solid fa-location-dot" style="color: var(--accent-cyan); font-size: 0.8rem;"></i> ${row.location}</td>
                <td><strong style="color: ${cat.color}; font-size: 0.95rem;">${row.aqi}</strong></td>
                <td>${row.pm25}</td>
                <td>${row.pm10}</td>
                <td>${row.co}</td>
                <td>${row.no2}</td>
                <td>${row.o3}</td>
                <td><span class="table-category-badge" style="background: ${cat.color};">${cat.name}</span></td>
            </tr>
        `;
    }).join("");

    // Update Counts & Pagination Controls
    document.getElementById("tableShowingCount").textContent = Math.min(paginatedItems.length, total);
    document.getElementById("tableTotalCount").textContent = total;
    document.getElementById("currentPageIndicator").textContent = `Page ${currentTablePage} of ${Math.max(1, Math.ceil(total / rowsPerPage))}`;

    document.getElementById("btnPrevPage").disabled = (currentTablePage <= 1);
    document.getElementById("btnNextPage").disabled = (currentTablePage >= Math.ceil(total / rowsPerPage));
}

function handleTableSearch() {
    const q = document.getElementById("tableSearchInput").value.trim().toLowerCase();
    if (!q) {
        filteredRecords = [...HISTORICAL_TABLE_RECORDS];
    } else {
        filteredRecords = HISTORICAL_TABLE_RECORDS.filter(r => 
            r.location.toLowerCase().includes(q) ||
            r.timestamp.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q) ||
            r.aqi.toString().includes(q)
        );
    }
    currentTablePage = 1;
    renderDataTable();
}

function changeTablePage(delta) {
    const maxPage = Math.ceil(filteredRecords.length / rowsPerPage);
    const newPage = currentTablePage + delta;
    if (newPage >= 1 && newPage <= maxPage) {
        currentTablePage = newPage;
        renderDataTable();
    }
}

function exportTableToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Location,AQI,PM2.5,PM10,CO,NO2,O3,Category\n";
    filteredRecords.forEach(r => {
        csvContent += `${r.timestamp},${r.location},${r.aqi},${r.pm25},${r.pm10},${r.co},${r.no2},${r.o3},${r.category}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AQI_Data_Export_${currentCity}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==========================================================================
// Live Telemetry Simulation Engine (Natural Sensor Fluctuation for Demo)
// ==========================================================================
function startLiveSimulation() {
    clearInterval(simIntervalId);
    simIntervalId = setInterval(() => {
        if (!isLiveSimActive) return;

        const cityData = CITIES_DATA[currentCity];
        if (!cityData) return;

        // Subtle realistic jitter (±1% to 2%)
        const jitter = (base, range) => {
            const delta = (Math.random() * range * 2) - range;
            return Math.max(1, +(base + delta).toFixed(1));
        };

        const cur = cityData.current;
        cur.pm25 = jitter(cur.pm25, 0.4);
        cur.pm10 = jitter(cur.pm10, 0.6);
        cur.no2 = jitter(cur.no2, 0.3);
        cur.so2 = jitter(cur.so2, 0.2);
        cur.o3 = jitter(cur.o3, 0.4);

        // Recalculate AQI from live simulated PM values
        const subPM25 = calculateSubIndex("pm25", cur.pm25);
        const subPM10 = calculateSubIndex("pm10", cur.pm10);
        cur.aqi = Math.max(subPM25, subPM10);
        cur.category = getAQICategory(cur.aqi).name;
        cur.lastUpdated = "Live (Updated seconds ago)";

        // Fast update
        document.getElementById("currentAqiValue").textContent = cur.aqi;
        updateGaugeMeter(cur.aqi);
        updateParameterCards(cur);
        document.getElementById("lastUpdatedTime").textContent = cur.lastUpdated;

    }, 4000); // Pulse every 4 seconds
}
