import urllib.request
import urllib.parse
import time

# 特定HEADER送信の例です。このサンプルに未使用
reqAddtionalHeaders = {
    'X-Request=Process':"01"
}
counter = 0
while True:
    data = urllib.parse.urlencode({"prompt":"Cyberpunk style image of a Tesla car reflection in rain",
                                   "id":str(counter)})
    data = data.encode('utf-8')
    req = urllib.request.Request("http://localhost:8000", data,reqAddtionalHeaders)

    with urllib.request.urlopen(req) as f:
        print(f.read().decode('utf-8'))

    counter += 1
    time.sleep(5)