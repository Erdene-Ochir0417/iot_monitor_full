import requests

url = 'http://34.146.79.245:80/devices/data'
myobj = {'990206': '1', '0DBD58': '2'}

x = requests.post(url, json = myobj)

print(x.text)
