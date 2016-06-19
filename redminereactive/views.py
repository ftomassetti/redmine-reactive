from flask import session, jsonify
from flask import request, render_template, redirect, url_for
from redminereactive import app
from redmine import Redmine

@app.route("/")
def index():
    return render_template('index.html', api_key=app.api_key)

@app.route("/commands/set_issue_subject", methods=["PUT"])
def set_issue_subject():
    redmine = Redmine('http://redmine.tomassetti.me', key=app.api_key)    
    data = request.json
    redmine.issue.update(data['id'], subject=data['subject'])    
    return "OK"
