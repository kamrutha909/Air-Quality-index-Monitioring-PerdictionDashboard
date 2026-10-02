"""
=============================================================================
Air Quality Index (AQI) Monitoring & Prediction Dashboard
Simple Local Web Server (Python Standard Library)

Author: B.Tech Engineering Project
Instructions:
- Run this file using: python app.py
- Open your browser at: http://localhost:5000
=============================================================================
"""

import http.server
import socketserver
import os
import webbrowser

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 70)
        print("  AIR QUALITY INDEX MONITORING & PREDICTION DASHBOARD")
        print("  Local Development Server is Running!")
        print("=" * 70)
        print(f"  [+] Project Directory : {DIRECTORY}")
        print(f"  [+] Server URL        : {url}")
        print(f"  [+] Shortcut          : Press CTRL+C in terminal to stop server")
        print("=" * 70 + "\n")
        
        try:
            # Attempt to automatically open the default web browser
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[!] Server stopped by user. Goodbye!")

if __name__ == "__main__":
    main()
