import time
import threading
import requests

# link = "http://www.somesite.com/details.pl?urn=2344"
# f = requests.get(link)
# print(f.text)

# set global variable flag
flag = 1

link = "http://127.0.0.1:21337/positional-rectangles"

def normal():
    global flag
    while flag==1:
        # Read data from: http://127.0.0.1:21337/positional-rectangles
        print('normal stuff')
        f = requests.get(link)
        print(f.text)
        print(f['PlayerName'])
        time.sleep(2)
        if flag==False:
            print('The while loop is now closing')


def get_input():
    global flag
    keystrk=input('Press a key \n')
    # thread doesn't continue until key is pressed
    print('You pressed: ', keystrk)
    flag=False
    print('flag is now:', flag)

n=threading.Thread(target=normal)
i=threading.Thread(target=get_input)
n.start()
i.start()