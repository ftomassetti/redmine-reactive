from flask import Flask
from flask_socketio import SocketIO
import os

app = Flask(__name__)

currdir = os.path.dirname(os.path.realpath(__file__))
rootdir = os.path.abspath(os.path.join(currdir, os.pardir))
uploadsdir = os.path.abspath(os.path.join(rootdir, 'uploads'))
xmldir = os.path.abspath(os.path.join(rootdir, 'xml'))

app.verbose = False
app.debug = True

app.api_key = open('apikey.txt', 'r').read().strip()

socketio = SocketIO(app)