import pandas as pd

df = pd.read_csv("job_list.csv")
df = df.sort_values("timestamp")
print(df)
item = df.iloc[0]
id = item["id"]
timestamp = item["timestamp"]
prompt = item["prompt"]
print(id)
print(timestamp)
print(prompt)
df = df.drop(index=0)
print(df)