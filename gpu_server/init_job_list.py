import pandas as pd

df = pd.DataFrame(columns=["id", "timestamp", "prompt"])
df.to_csv("job_list.csv", index=False)
