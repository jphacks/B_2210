import base64
import json   
import glob             
import pandas as pd    

import requests
import time
# {id:10, imagenum:5, 0:<byte>, ... , 4: <byte>}

def get_job():
    df = pd.read_csv("job_list.csv")
    if len(df) == 0:
        return -1, -1, ""
    df = df.sort_values("timestamp")
    item = df.iloc[0]
    id = item["id"]
    timestamp = item["timestamp"]
    prompt = item["prompt"]
    return id, timestamp, prompt

def send_image(id):
    api = 'http://localhost:8080/return_image'
    images = {}
    images["id"] = str(id)
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
            df = df[df["id"] != id]
            df.to_csv("job_list.csv", index=False)
            print("Job complete")
            return
        except:
            time.sleep(0.5)

if __name__ == "__main__":
    while True:
        id, timestamp, prompt = get_job()
        if id == -1:
            time.sleep(1)
            continue
        # do stable diffusion
        time.sleep(5)
        send_image(id)
        

