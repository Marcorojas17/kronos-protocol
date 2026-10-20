from http.server import BaseHTTPRequestHandler, HTTPServer
import os
PORT = 8000
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        self.wfile.write(b'{"node": "MX-ORIGIN", "state": "O__", "energy_loop": "97%", "guardian": "active"}')
print(f"O_ ARKHE ZERO Global Node en puerto {PORT}")
HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
