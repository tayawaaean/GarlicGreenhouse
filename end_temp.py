from flask import Flask
import requests
import datetime
import time
import threading
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB configuration
mongo_client = MongoClient("mongodb+srv://iotgarlic:garlicgreenhouse2023@garlicgreenhouse.s6eknyu.mongodb.net")
mongodb_db = mongo_client.GarlicGreenhouse

# Endpoint for setting temperature
temperature_endpoint = "http://10.40.4.163/set?temp="

def time_until_target(target_time):
    current_time = datetime.datetime.now()
    time_difference = target_time - current_time
    return time_difference.total_seconds()

def send_http_request():
    while True:
        # Get the current time
        current_time = datetime.datetime.now()

        # Retrieve the schedule document from MongoDB
        schedule_document = mongodb_db.schedule.find_one()

        if schedule_document:
            # Extract off time and end temperature from the schedule document
            time_off_start_str = schedule_document.get('time_off_start', '00:00')
            end_temperature = schedule_document.get('end_temperature', 0)

            time_off_start = datetime.datetime.strptime(time_off_start_str, '%H:%M')

            # Set the target time to the off time extracted from the schedule document for today
            target_time = current_time.replace(hour=time_off_start.hour, minute=time_off_start.minute, second=0, microsecond=0)

            # Calculate the time remaining until target_time
            time_remaining = time_until_target(target_time)

            # If the target time has already passed for the current day, set it for the next day
            if time_remaining < 0:
                target_time += datetime.timedelta(days=1)
                time_remaining = time_until_target(target_time)

            # Sleep until the target time
            time.sleep(time_remaining)

            try:
                # Send HTTP request to set temperature
                response = requests.get(f"{temperature_endpoint}{end_temperature}")
                print("HTTP Request sent to", temperature_endpoint, "at", datetime.datetime.now())
                if response.status_code == 200:
                    print("Temperature set successfully.")
                # You can add further processing of response here if needed
            except Exception as e:
                print("Error sending HTTP request:", e)
            
        else:
            print("No schedule document found.")

def start_http_sender():
    sender_thread = threading.Thread(target=send_http_request)
    sender_thread.daemon = True
    sender_thread.start()

@app.route('/')
def index():
    # Retrieve the first schedule document from MongoDB
    schedule_document = mongodb_db.schedule.find_one()

    if schedule_document:
        # Extract off time from the schedule document
        time_off_start_str = schedule_document.get('time_off_start', '00:00')
        time_off_start = datetime.datetime.strptime(time_off_start_str, '%H:%M').time()

        # Get the current time
        current_time = datetime.datetime.now().time()

        # Calculate the time remaining until time_off_start
        time_remaining = datetime.datetime.combine(datetime.date.today(), time_off_start) - datetime.datetime.combine(datetime.date.today(), current_time)

        # If the target time has already passed for the current day, set it for the next day
        if time_remaining.total_seconds() < 0:
            target_time = datetime.datetime.combine(datetime.date.today() + datetime.timedelta(days=1), time_off_start)
            time_remaining = target_time - datetime.datetime.now()

        # Format time remaining into HH:MM:SS
        time_remaining_str = str(time_remaining)

        return f"Time remaining until {time_off_start}: {time_remaining_str}"
    else:
        return "No schedule document found."

if __name__ == '__main__':
    start_http_sender()
    app.run(port=6423, debug=True)
