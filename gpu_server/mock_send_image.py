import requests
import glob
import pandas as pd
import time

def get_job():
    df = pd.read_csv("job_list.csv")
    df = df.sort_values("timestamp")
    item = df.iloc[0]
    id = item["id"]
    timestamp = item["timestamp"]
    prompt = item["prompt"]
    df = df.drop(index=0)
    df.to_csv("job_list.csv", index=False)
    return id, timestamp, prompt

def send_image(id):
    images = {}
    images["id"] = id
    image_paths = glob.glob("test_images/*")
    for i, f in enumerate(image_paths):
        f = open(f, "rb")
        images[str(i)] = f.read()

    while True:
        try:
            url = "http://localhost:5000"
            res = requests.post(url, files=images)
            print(res.json())
            return
        except:
            time.sleep(0.5)

if __name__ == "__main__":
    while True:
        id, timestamp, prompt = get_job()
        send_image(id)
        time.sleep(1)
    