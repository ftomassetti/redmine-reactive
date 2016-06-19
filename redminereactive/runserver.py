from redminereactive import app, socketio
import views

if __name__ == '__main__':
    socketio.run(app, debug=True)
