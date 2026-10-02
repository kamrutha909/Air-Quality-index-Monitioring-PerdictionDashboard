# Air Quality Index (AQI) Monitoring & Prediction Dashboard

> **A modern, beginner-friendly web application for real-time Air Quality Index (AQI) telemetry monitoring, pollutant sub-index analysis, and machine learning based future AQI forecasting.**

---

## 📁 Single Folder Structure (Very Important)

This project strictly adheres to a **flat, single-folder structure** with **NO nested folders** (no `frontend/`, `backend/`, `src/`, `assets/`, or `static/`). All HTML, CSS, JavaScript, Python scripts, and sample datasets reside directly in the root directory:

```text
Air-Quality-Index-Monitoring-Prediction-Dashboard/
│
├── index.html        # Main web dashboard interface
├── style.css         # Modern dark-mode & glassmorphism styling
├── script.js         # Interactive dashboard controller & Chart.js logic
├── data.js           # Built-in sample datasets, CPCB breakpoints & helper calculations
├── prediction.py     # Standalone Python machine learning prediction script
├── sample-data.csv   # Historical multi-city air quality dataset
├── app.py            # Simple zero-dependency local Python web server
├── test_app.py       # Automated project verification & integrity test suite
└── README.md         # Complete project documentation & viva Q&A guide
```

---

## 🚀 How to Run the Project in VS Code

You can run this project in any of the following 3 simple ways:

### Option 1: Direct Browser Opening (No Server Required)
1. Open the project folder in **VS Code**.
2. Right-click on `index.html` and select **Open with Default Browser** (or double-click `index.html` in Windows File Explorer).
3. The dashboard opens immediately with full interactivity and charts!

### Option 2: VS Code "Live Server" Extension (Recommended)
1. In VS Code, install the extension **Live Server** (by Ritwick Dey).
2. Right-click `index.html` -> Click **"Open with Live Server"**.
3. The app will launch at `http://127.0.0.1:5500/index.html`.

### Option 3: Run via Python Local Web Server
1. Open the VS Code integrated terminal (`Ctrl + ~`).
2. Run:
   ```bash
   python app.py
   ```
3. Open your browser and navigate to: **`http://localhost:5000`**

### Option 4: Run the Machine Learning Prediction Engine in Terminal
To demonstrate the Machine Learning model, evaluation metrics ($R^2$, MAE, RMSE), feature weights, and test scenarios for viva/project presentations:
```bash
python prediction.py
```

### Option 5: Run Automated Test Suite
To verify that all files, datasets, and algorithms are intact:
```bash
python test_app.py
```

---

## 🌟 Key Dashboard Features

### 1. Home / Dashboard Overview
- **Project Title:** “Air Quality Index Monitoring & Prediction Dashboard”
- **Hero AQI Card:** Prominently displays the current AQI value with dynamic category color glowing effects.
- **CPCB Categories:** Displays category badges:
  - 🟢 **Good (0–50)**
  - 🟢 **Satisfactory (51–100)**
  - 🟡 **Moderate (101–200)**
  - 🟠 **Poor (201–300)**
  - 🔴 **Very Poor (301–400)**
  - 🟣 **Severe (401–500)**
- **City & Station Info:** Displays monitored city name, state, and specific station telemetry info.
- **Last Updated Time:** Shows live telemetry timestamp with a simulated live sensor pulse.

### 2. Air Quality Parameters (8 Separate Cards)
Individual parameter cards with value, measurement unit, safe benchmark progress bar, and calculated sub-index:
- **PM2.5** (Fine Particulate Matter, $\le 2.5\ \mu\text{m}$)
- **PM10** (Coarse Inhalable Dust, $\le 10\ \mu\text{m}$)
- **CO** (Carbon Monoxide, $\text{mg/m}^3$)
- **NO2** (Nitrogen Dioxide, $\mu\text{g/m}^3$)
- **SO2** (Sulphur Dioxide, $\mu\text{g/m}^3$)
- **O3** (Ground-Level Ozone, $\mu\text{g/m}^3$)
- **Temperature** (Ambient Thermal Level, $^\circ\text{C}$)
- **Humidity** (Relative Moisture Index, $\%$)

### 3. AQI Circular Gauge / Meter Visualization
- Custom animated circular gauge spanning the **0–500 CPCB scale**.
- Needle dynamically points to current AQI value.
- Color segments and bottom legend clearly explain each AQI tier.

### 4. Interactive Charts (Chart.js)
- **AQI Trend Over Time:** Toggle between **24-Hour hourly** and **7-Day historical daily** trends.
- **PM2.5 vs PM10 Comparison:** Dual-line chart tracking fine vs coarse particulate concentrations.
- **Pollutants Breakdown:** Radar chart visualizing sub-index ratios.
- **Gas Pollutants Distribution:** Bar chart comparing chemical gas levels ($\text{NO}_2, \text{SO}_2, \text{CO}, \text{O}_3$).

### 5. AQI Prediction Studio (Forecasting & What-If Simulator)
- **Forecast Cards:** Predicts AQI for **+6 Hours, +12 Hours, +24 Hours (Tomorrow), +48 Hours, and +72 Hours**.
- **Prediction Trajectory Curve:** Visualizes historical curve transitioning smoothly into predicted future curve with dashed line.
- **Interactive What-If ML Simulator:** Users can drag sliders for PM2.5, PM10, NO2, and CO to instantly see the predicted AQI, category, and dominant pollutant calculated in real time.
- **Academic Notice:** Clear disclaimer stating predictions are based on statistical regression for academic demonstration.

### 6. Location Selector
Dropdown supporting preset locations with realistic sample telemetry:
- **Kakinada** (Andhra Pradesh - Coastal / Satisfactory Air)
- **Hyderabad** (Telangana - Urban Tech Capital / Moderate Air)
- **Vijayawada** (Andhra Pradesh - Commercial Hub / Moderate Air)
- **Visakhapatnam** (Andhra Pradesh - Port City / Satisfactory Air)
- **Chennai** (Tamil Nadu - Coastal Metro / Moderate Air)
- **Bengaluru** (Karnataka - Garden City / Satisfactory Air)
- **Delhi** (National Capital Region - High Smog / Very Poor Air)
- **Mumbai** (Maharashtra - Financial Capital / Moderate Air)

### 7. Health Recommendations & Advisories
Dynamic advisories tailored to current AQI level:
- **Outdoor Exercise:** Jogging, cycling, and sports guidance.
- **Sensitive Groups:** Children, elderly, and asthmatic precautions.
- **Mask Guidance:** Face mask recommendations (N95 / FFP2).
- **Ventilation:** Window open/close advisories.

### 8. Historical Data Table & Export
- Tabular view of date, location, AQI, individual pollutants, and category.
- **Live Search & Filter:** Filter by city, date, or category.
- **Pagination:** Clean page navigation (Prev / Next).
- **Export to CSV:** Direct browser download of table records into a `.csv` file.

### 9. 100% Responsive Mobile-Friendly Design
- Works on Desktop, Laptop, Android phones, iPhones, and Tablets.
- Fluid CSS Grid and Flexbox layout with zero horizontal scrollbars on mobile.

---

## 🔬 Mathematical & Technical Methodology

### 1. CPCB Sub-Index Calculation Formula
The National AQI uses piecewise linear interpolation for each pollutant $p$:

$$I_p = \frac{I_{\text{high}} - I_{\text{low}}}{B_{\text{high}} - B_{\text{low}}} \times (C_p - B_{\text{low}}) + I_{\text{low}}$$

Where:
- $I_p$ = Sub-index for pollutant $p$
- $C_p$ = Monitored concentration of pollutant $p$
- $B_{\text{high}}, B_{\text{low}}$ = Breakpoint concentrations corresponding to $C_p$
- $I_{\text{high}}, I_{\text{low}}$ = AQI index values corresponding to breakpoints

**Overall AQI:**
$$\text{AQI} = \max(I_{\text{PM2.5}}, I_{\text{PM10}}, I_{\text{NO2}}, I_{\text{SO2}}, I_{\text{CO}}, I_{\text{O3}})$$

The pollutant with the highest sub-index is identified as the **Dominant Pollutant**.

### 2. Machine Learning Multivariate Regression
The Python and JavaScript prediction engines use multivariate regression:

$$\text{Predicted AQI} = \beta_0 + \sum_{i=1}^{n} \beta_i \cdot X_i$$

Where feature weights are calibrated from historical sensor datasets, giving highest weight to **PM2.5 (48.5%)** and **PM10 (24.2%)**.

---

## 🎓 College Demo & Viva Q&A Guide

### Q1: What is AQI, and what is its standard range in India?
> **Answer:** AQI stands for **Air Quality Index**, an environmental indicator that transforms complex pollutant concentration numbers into a single 0–500 scale. In India, it follows CPCB standards divided into 6 categories: Good (0–50), Satisfactory (51–100), Moderate (101–200), Poor (201–300), Very Poor (301–400), and Severe (401–500).

### Q2: Why are PM2.5 and PM10 the most critical pollutants?
> **Answer:** PM2.5 ($\le 2.5\ \mu\text{m}$) particles are extremely fine and can penetrate deep into the lungs and bloodstream. PM10 particles settle in the upper respiratory tract. They typically drive the overall AQI value during smog and heavy vehicular traffic periods.

### Q3: How does the prediction feature work in this project?
> **Answer:** The project uses a multivariate regression and moving-average model that takes current pollutant concentrations (PM2.5, PM10, NO2, CO, etc.) and temporal historical trends to forecast AQI for subsequent hours (+6h, +12h, +24h, etc.).

### Q4: Does the project require internet or paid API keys to run?
> **Answer:** No. The project includes rich built-in sample datasets in `data.js` and `sample-data.csv` so it runs 100% offline immediately without requiring any paid API key or third-party server.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, accessible markup, gauge layout |
| **Vanilla CSS3** | Glassmorphism UI, cyber-clean dark theme, CSS Grid & Flexbox, animations |
| **JavaScript (ES6+)** | Dynamic DOM updates, CPCB sub-index math, telemetry simulation, CSV export |
| **Chart.js 4.x** | Interactive temporal trend lines, radar breakdown, and bar charts |
| **Python 3** | ML model training (`prediction.py`), evaluation metrics, local web server (`app.py`) |

---

## 👤 Author
- **Academic Mini-Project / Final Year Demonstration**
- Ready for immediate presentation in VS Code.
