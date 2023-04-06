import os


file = open("media", "r")
lines = file.readlines()
for i in lines:
  [date, url] = i.split()
  #print(url)
  #print('      - title: ""\n        date: {}\n        url: "{}"'.format(date, url))
  os.system('open "{}"'.format(url))
