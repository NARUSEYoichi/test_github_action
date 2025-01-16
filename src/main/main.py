import requests

for _ in range(2):
    x = requests.get('https://w3schools.com/python/demopage.htm')
    print(x.text)
