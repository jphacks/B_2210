import os
import sys
import urllib.parse
import html
import argparse
import time

import pandas as pd

from http.server import BaseHTTPRequestHandler
from http.server import HTTPServer
from http import HTTPStatus

PORT = 8000

class StubHttpRequestHandler(BaseHTTPRequestHandler):
    server_version = "HTTP Stub/0.1"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)  

    def do_POST(self):
        enc = sys.getfilesystemencoding()

        length = self.headers.get('content-length')
        nbytes = int(length)
        rawPostData = self.rfile.read(nbytes)
        decodedPostData = rawPostData.decode(enc)
        postData = urllib.parse.parse_qs(decodedPostData)

        job_id = postData["id"][0]
        prompt = postData["prompt"][0]
        message = job_id + ": " + prompt
        current_time = time.time()
        df = pd.read_csv("job_list.csv")

        new_item = pd.Series({"id":int(job_id), "prompt":prompt, "timestamp":current_time})
        df = df.append(new_item, ignore_index=True)
        df.to_csv("job_list.csv", index=False)

        encoded = message.encode(enc)
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-type", "text/plain; charset=%s" % enc)
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()

        self.wfile.write(encoded)

if __name__ == "__main__":
    '''
    receiving message example
    {"prompt":"Cyberpunk style image of a Tesla car reflection in rain", "id":str(counter)}
    '''
    handler = StubHttpRequestHandler
    httpd = HTTPServer(('',PORT),handler)
    httpd.serve_forever()