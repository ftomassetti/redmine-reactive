# redmine reactive

This project is intended as a simple UI for Redmine.

![Demo](screencasts/redmine_reactive_screencast.gif "Adding, modifying and deleting an issue")

## Rationale for this project

I was looking for the right issue tracker for my needs and I compared a few tools including Jira, Trello, Asana and Redmine. You can read about it [here](http://tomassetti.me/on-the-quest-for-the-right-project-management-tool-jira-trello-asana-redmine/).

Redmine was almost good enough but I wanted to be able to quickly add and edit tasks. Installing plugins for Redmine seem painful so I used the Redmine API instead. Basically I can run a separate web application which interacts with my Redmine installation.

## Configuration

You need to create a file named conf.txt.

On the first line it should contain the url of you redmine installation, on the second your API key

## Run the server

You need Python and you need to install the dependencies:

```
pip install -r requirements.txt
```

You may want to do that inside virtualenv.

At this point you can just visit http://localhost:500 and the system is up and running.
