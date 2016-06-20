from flask import session, jsonify
from flask import request, render_template, redirect, url_for
from redminereactive import app
from redmine import Redmine

@app.route("/")
def index():
    return render_template('index.html', api_key=app.api_key, base_url=app.base_url)

@app.route("/commands/set_issue_subject", methods=["PUT"])
def set_issue_subject():
    redmine = Redmine(app.base_url, key=app.api_key)    
    data = request.json
    redmine.issue.update(data['id'], subject=data['subject'])    
    return "OK"

@app.route("/commands/set_issue_priority", methods=["PUT"])
def set_issue_priority():
    redmine = Redmine(app.base_url, key=app.api_key)
    data = request.json
    redmine.issue.update(data['id'], priority_id=data['priorityId'])
    return "OK"

@app.route("/commands/create_issue", methods=["POST"])
def create_issue():
    redmine = Redmine(app.base_url, key=app.api_key)    
    data = request.json
    issue = redmine.issue.new()
    issue.project_id = data['project_id']
    issue.subject = data['subject']
    issue.save()
    return "OK"    

@app.route("/commands/delete_issue", methods=["POST"])
def delete_issue():
    redmine = Redmine(app.base_url, key=app.api_key)    
    data = request.json
    redmine.issue.delete(data['issue_id'])   
    return "OK"    