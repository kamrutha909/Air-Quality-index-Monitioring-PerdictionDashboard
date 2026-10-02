"""
=============================================================================
Air Quality Index (AQI) Monitoring & Prediction Dashboard
Automated Project Verification & Integrity Test Suite

Run this file: python test_app.py
=============================================================================
"""

import os
import sys
import csv

def test_files_exist():
    required_files = [
        "index.html",
        "style.css",
        "script.js",
        "data.js",
        "prediction.py",
        "sample-data.csv",
        "README.md",
        "app.py"
    ]
    print("[1] Checking Project Folder Structure & Files...")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    all_passed = True
    
    for filename in required_files:
        filepath = os.path.join(current_dir, filename)
        exists = os.path.exists(filepath)
        size = os.path.getsize(filepath) if exists else 0
        status = "PASSED" if exists and size > 0 else "FAILED"
        print(f"    * {filename:<20} : {status} ({size} bytes)")
        if not exists or size == 0:
            all_passed = False
            
    assert all_passed, "Some required files are missing or empty!"
    print("    --> All core project files are present in the single project folder.\n")

def test_csv_dataset():
    print("[2] Verifying sample-data.csv...")
    filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sample-data.csv")
    with open(filepath, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        print(f"    * Total CSV Records: {len(rows)}")
        assert len(rows) > 50, "CSV should contain at least 50 historical sample records."
        
        # Verify columns
        required_cols = {"Timestamp", "Location", "PM2.5", "PM10", "CO", "NO2", "SO2", "O3", "Temperature", "Humidity", "AQI", "Category"}
        found_cols = set(rows[0].keys())
        assert required_cols.issubset(found_cols), f"Missing columns in CSV! Found: {found_cols}"
        print(f"    * Verified Columns: {', '.join(required_cols)}")
    print("    --> CSV dataset is complete, valid, and properly structured.\n")

def test_prediction_logic():
    print("[3] Testing Python Prediction Engine Import & Execution...")
    import prediction
    pred_aqi, cat, adv = prediction.predict_aqi(pm25=38.5, pm10=65.2, co=0.65, no2=22.4)
    print(f"    * Test Output: Predicted AQI={pred_aqi}, Category={cat}")
    assert 0 <= pred_aqi <= 500, "Predicted AQI must be within 0-500 scale."
    assert cat in ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"], "Invalid AQI Category."
    print("    --> Prediction algorithm runs smoothly and returns valid CPCB categories.\n")

def main():
    print("\n" + "="*70)
    print("  RUNNING AIR QUALITY DASHBOARD TEST SUITE")
    print("="*70 + "\n")
    try:
        test_files_exist()
        test_csv_dataset()
        test_prediction_logic()
        print("="*70)
        print("  ALL TESTS PASSED SUCCESSFULLY! (100% Ready for Demonstration)")
        print("="*70 + "\n")
    except Exception as e:
        print(f"\n[X] Test Failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
