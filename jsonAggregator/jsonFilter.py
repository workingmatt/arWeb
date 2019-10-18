import urllib.request
import json
import os
import os.path
pathCWD = os.getcwd()
if os.path.isfile('seed.cfg') == False:
    seed = input('SEED: ')
    f = open('seed.cfg','w')
    f.write(seed)
    f.close()
if os.path.isfile('apiKey.cfg') == False:
    key = input('APIKEY: ')
    f = open('apiKey.cfg', 'w')
    f.write(key)
    f.close()
imageArray = []
indexArray = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8', 'url9']
failed = False
f = open(f'{pathCWD}/seed.cfg', 'r')
r = f.read()
f.close()
seed = r
f = open(f'{pathCWD}/apiKey.cfg', 'r')
r = f.read()
f.close()
apiKey = r
txt = urllib.request.urlopen(f'https://api.curator.io/v1/feeds/{seed}/posts/?api_key={apiKey}').read()
my_json = txt.decode('utf-8')
data = json.loads(my_json)
s = json.dumps(data, indent=4, sort_keys=True)
f = open(f'{pathCWD}/jsontext.txt', 'w')
f.write(s)
f.close()
jsonFile = open(f'{pathCWD}/jsontext.txt', 'r', encoding='utf-8')
json_File = json.load(jsonFile)
jsonFile.close()
os.remove(f'{pathCWD}/jsontext.txt')
index = 0
x = 0
f = 0
while x < 9:
    try:
        imageArray.append(json_File['posts'][index]['images'][0]['url'])
        x += 1
    except IndexError:
        f += 1
        if f > 100:
            failed = True
            break
    index += 1
if failed == False:
    zipped = zip(indexArray, imageArray)
    dictionary = dict(zipped)
    f = open(f'{pathCWD}/imagesDict.json', 'w')
    f.write(json.dumps(dictionary))
    f.close()
