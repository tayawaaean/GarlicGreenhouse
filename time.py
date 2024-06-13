from flask import Flask
from datetime import datetime
import pytz
import subprocess

app = Flask(__name__)

def get_time():
    # Get the current time in Asia/Manila timezone
    manila_timezone = pytz.timezone('Asia/Manila')
    current_time = datetime.now(manila_timezone)
    return current_time.strftime('%Y-%m-%d %H:%M:%S')

def set_system_time(time_str):
    try:
        subprocess.run(['sudo', 'date', '-s', time_str])
        return True
    except Exception as e:
        print("Error setting system time:", e)
        return False

@app.route('/')
def index():
    current_time = get_time()
    if set_system_time(current_time):
        return f"The current time in Asia/Manila is: {current_time}. System time set successfully."
    else:
        return "Failed to set system time. Please check the logs for more information."


if __name__ == '__main__':
    app.run(debug=True,port=8087)
