import base64
import json   
import glob             
import pandas as pd    

import requests
import time
import subprocess
import shlex
# {id:10, imagenum:5, 0:<byte>, ... , 4: <byte>}

def get_job():
    df = pd.read_csv("job_list.csv")
    if len(df) == 0:
        return -1, -1, ""
    df = df.sort_values("timestamp")
    item = df.iloc[0]
    job_id = item["id"]
    timestamp = item["timestamp"]
    prompt = item["prompt"]
    return job_id, timestamp, prompt

def send_image(job_id):
    api = 'http://localhost:8080/return_image'
    output_path = "stable-diffusion/outputs/" + str(job_id)
    images = {}
    images["id"] = str(job_id)
    image_paths = glob.glob("test_images/*")
    images["num_images"] = str(len(image_paths))
    for i, f in enumerate(image_paths):
        with open(f, "rb") as f:
            images[str(i)] = base64.b64encode(f.read()).decode("utf8")
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    payload = json.dumps(images)
    while True:
        try:
            response = requests.post(api, data=payload, headers=headers)
            df = pd.read_csv("job_list.csv")
            df = df[df["id"] != job_id]
            df.to_csv("job_list.csv", index=False)
            rm_cmd = "rm -rf {}".format(output_path)
            proc = subprocess.call(shlex.split(rm_cmd))
            print("Job complete")
            return
        except:
            time.sleep(0.5)

def generate_image(job_id, prompt):
    cmd = 'python stable-diffusion/optimizedSD/optimized_txt2img.py --prompt "{}" --H 512 --W 512 --turbo --outdir "stable-diffusion/outputs/{}"'.format(prompt, job_id)
    proc = subprocess.call(shlex.split(cmd))

if __name__ == "__main__":
    while True:
        job_id, timestamp, prompt = get_job()
        if job_id == -1:
            time.sleep(1)
            continue
        generate_image(job_id, prompt)
        send_image(job_id)
        

