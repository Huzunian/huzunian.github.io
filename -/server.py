# -*- coding: utf-8 -*-
#test on python 3.4 ,python of lower version  has different module organization.
import http.server
import socketserver
import os.path
import sys

# this is made to mimic the way github pages handles html extensions for u nicely, so i can test still with my python server
class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):            
        possible_name = self.path.strip("/")+'.html'
        if os.path.isfile(possible_name):
            # extensionless page serving
            self.path = possible_name

        return http.server.SimpleHTTPRequestHandler.do_GET(self)

Handler = MyRequestHandler

port = 8000
if len(sys.argv) > 1:
    try:
        p = int(sys.argv[1])
        port = p
    except ValueError:
        print("port value provided must be an integer")

print("serving on port {0}".format(port))
server = socketserver.TCPServer(('0.0.0.0', port), Handler)
server.serve_forever()