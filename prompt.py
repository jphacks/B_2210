import requests
import json
import translators as ts
import time

app_id = "edca785dbae630a5989545cd0548dc197faecb06603e2826c18439a9c3fd8784"

tags = ["車", "速い", "サーキット", "クール", "メルセデス"]
object = ts.google("車")

art_styles = ["fantasy", "science fiction", "adventure", "drama", "steampank", "Ghibli", "Marvel", "Disney"]
national_styles = ["pixiv light novel","artstation deviantart"]
genarals = ["cinematic lighting", "beautiful composition", "detailed", "digital painting"]

tag = " ".join(tags)
print(tag)

materials = ["a ball-point pen art"
            "a pencil sketch",
            "a crayon painting",
            "an acrylic painting",
            "a watercolor painting",
            "an oil painting",
            "an ukiyo-e painting",
            "airbrush caricature",
            "a low poly illustration",
            "japanese anime",
            "pixel art",
            "3D"]

headers = {'Content-Type':'application/x-www-form-urlencoded'}


# keyword extraction
# parameters = {"app_id": app_id,
#             "title": "どれがキーワード？",
#             "body": tag,
#             "max_num": 4}
# while True:
#     try:
#         res = requests.post('https://labs.goo.ne.jp/api/keyword', json=parameters)
#         response = json.loads(res.text)
#         break
#     except:
#         time.sleep(0.5)
        
# keyword = response

# select material
score = []
for text in materials:
        parameters = {
                    "app_id": app_id,  
                    "text1": tag,
                    "text2": text
                    }
        try:
            res = requests.post('https://labs.goo.ne.jp/api/textpair', headers=headers, json=parameters)
            response = json.loads(res.text)
            score.append(response["score"])
            break
        except:
            time.sleep(0.5)   
material = materials[score.index(max(score))]

# select art_style
score = []
for text in art_styles:
        parameters = {
                    "app_id": app_id,  
                    "text1": tag,
                    "text2": text
                    }
        try:
            res = requests.post('https://labs.goo.ne.jp/api/textpair', headers=headers, json=parameters)
            response = json.loads(res.text)
            score.append(response["score"])
            break
        except:
            time.sleep(0.5)
art_style = art_styles[score.index(max(score))]

# select national_style
score = []
for text in national_styles:
        parameters = {
                    "app_id": app_id,  
                    "text1": tag,
                    "text2": text
                    }
        try:
            res = requests.post('https://labs.goo.ne.jp/api/textpair', headers=headers, json=parameters)
            response = json.loads(res.text)
            score.append(response["score"])
            break
        except:
            time.sleep(0.5)
national_style = national_styles[score.index(max(score))]
prompt = "a SNS icon of " + object.lower()+ " " + material + " " + art_style + " " + national_style + " " + " ".join(genarals) + " " + ts.google(" ".join(tags[1:])).lower()
print("tags: ", tags)
print("prompt: ", prompt)