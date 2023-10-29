import boto3
import cv2
import numpy as np
import yolo
import time

def lambda_handler(event, context):

    # Get the video stream from S3
    s3 = boto3.client('s3')
    video_stream = s3.get_object(Bucket='cam-capture-bucket', Key='cam1_video/')

    # Convert the video stream to a NumPy array
    video_array = np.fromstring(video_stream['Body'].read(), np.uint8)

    # Create a YOLO object detector
    yolo_detector = yolo.Yolo()

    # Start the video capture
    cap = cv2.VideoCapture(video_array)

    # Initialize the vehicle counter
    vehicle_count = 0

    # Loop over the video frames
    while True:
        ret, frame = cap.read()

        # If the frame is not empty, process it
        if ret:

            # Detect vehicles in the frame
            detections = yolo_detector.detect(frame)

            # Loop over the detections
            for detection in detections:

                # If the detection is a vehicle, increment the counter
                if detection['label'] == 'vehicle':
                    vehicle_count += 1

            # Display the frame
            cv2.imshow('Video Stream', frame)

            # Press 'q' to quit
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # If the video capture is finished, break
        else:
            break

    # Close the video capture
    cap.release()

    # Destroy all windows
    cv2.destroyAllWindows()

    # Return the vehicle count
    return vehicle_count