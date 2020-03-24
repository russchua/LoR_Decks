import requests

link = "http://127.0.0.1:21337/positional-rectangles"
f = requests.get(link)
# print(f.text)
print(f.json()['Rectangles'])
