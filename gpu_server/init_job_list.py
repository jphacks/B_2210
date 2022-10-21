import pandas as pd

df = pd.DataFrame(columns=["id", "timestamp", "prompt"])
df.to_csv("job_list.csv", index=False)
comp_df = pd.DataFrame(columns=["id"])
comp_df.to_csv("comp_job_list.csv", index=False)