import base64
import json   
import glob             
import pandas as pd    

import requests
import time
import subprocess
import shlex
# {id:10, imagenum:5, 0:<byte>, ... , 4: <byte>}

def get_comp_job():
    df = pd.read_csv("comp_job_list.csv")
    if len(df) == 0:
        return -1
    item = df.iloc[0]
    job_id = item["id"]
    return job_id

def send_image(job_id):
    api = 'https://aicon-maker-backend.herokuapp.com/aiconapi/save_generated_images'
    output_path = "stable-diffusion/outputs/" + str(job_id)
    images = {}
    images["id"] = str(job_id)
    image_paths = glob.glob(output_path + "/*")
    images["num_images"] = str(len(image_paths))
    for i, f in enumerate(image_paths):
        with open(f, "rb") as f:
            images[str(i)] = base64.b64encode(f.read()).decode("utf8")
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    payload = json.dumps(images)
    while True:
        try:
            response = requests.post(api, data=payload, headers=headers)
            df = pd.read_csv("comp_job_list.csv")
            df = df[df["id"] != job_id]
            df.to_csv("comp_job_list.csv", index=False)
            rm_cmd = "rm -rf {}".format(output_path)
            proc = subprocess.call(shlex.split(rm_cmd))
            print("Job complete")
            return
        except:
            time.sleep(0.5)

if __name__ == "__main__":
    while True:
        job_id = get_comp_job()
        if job_id == -1:
            time.sleep(0.5)
            continue
        send_image(job_id)
        

