import datetime
import requests
import time
from flask import Flask, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# MongoDB connection
mongo_client = MongoClient("mongodb+srv://iotgarlic:garlicgreenhouse2023@garlicgreenhouse.s6eknyu.mongodb.net")
mongodb_db = mongo_client.GarlicGreenhouse
schedule_collection = mongodb_db.schedule

def check_alarm():
    while True:
        # Fetch the document from MongoDB
        doc = schedule_collection.find_one({"_id": ObjectId("6614c860a5c9cb338f3fa30a")})
        if doc:
            time_on_start = doc.get('time_on_start')

            # Convert string time to datetime object
            time_on_start_datetime = datetime.datetime.strptime(time_on_start, '%H:%M')

            # Get current time
            current_time = datetime.datetime.now().time()

            # Check if current time matches time_on_start
            if current_time.hour == time_on_start_datetime.hour and current_time.minute == time_on_start_datetime.minute:
                # If current time matches time_on_start, send HTTP request
                responses = send_http_request(time_on_start)
                # Print or display responses
                for response in responses:
                    print(response)
                # Calculate countdown time
                countdown_time = (time_on_start_datetime - datetime.datetime.now()).total_seconds()
                # Display countdown
                print(f"Countdown to {time_on_start}: {countdown_time} seconds")

        # Check every 10 seconds
        time.sleep(10)

def send_http_request(time_on_start):
    urls = [
        "http://10.40.1.21:80/turn_on/1",
        "http://10.40.0.176:80/turn_on/3",
        "http://10.40.1.21:80/turn_on/2",
        "http://10.40.0.176:80/turn_on/4"
    ]
    responses = []
    for url in urls:
        response = requests.get(url)
        responses.append(f"Response from {url}: {response.text}")  # Append response to list
    responses.append(f"Time on start: {time_on_start}")  # Append time_on_start to list
    return responses

@app.route('/')
def home():
    return jsonify({'message': 'Flask is running'})

if __name__ == "__main__":
    # Start Flask app
    app.run(host='0.0.0.0', port=9090, debug=True)
