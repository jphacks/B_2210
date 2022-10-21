import io
import json                    
import base64                  
import logging             
import numpy as np
from PIL import Image

from flask import Flask, request, jsonify, abort

app = Flask(__name__)          
app.logger.setLevel(logging.DEBUG)
  
  
@app.route("/return_image", methods=['POST'])
def test_method():         
    # print(request.json)      
    # get id
    job_id = request.json['id']

    # get num images
    numimages = int(request.json['num_images'])

    for i in range(numimages):
        im_b64 = request.json[str(i)]
        img_bytes = base64.b64decode(im_b64.encode('utf-8'))
        img = Image.open(io.BytesIO(img_bytes))
        img_arr = np.asarray(img)      
        print('img shape', img_arr.shape)


    result_dict = {'output': 'output_key'}
    return result_dict
  
  
def run_server_api():
    app.run(host='0.0.0.0', port=8080)
  
  
if __name__ == "__main__":     
    run_server_api()