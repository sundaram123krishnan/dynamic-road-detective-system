# Dynamic Road Detective System README

## Overview
The Dynamic Road Detective System is a tool designed to assist drivers in detecting vehicles passing through deep curves in hills. This system utilizes advanced technologies such as Next.js for web development, YOLOv4 for vehicle detection, and a Raspberry Pi for hosting the website. This README serves as a guide to set up and utilize the system effectively.

![Screenshot from 2024-02-15 17-50-47](https://github.com/sundaram123krishnan/dynamic-road-detective-system/assets/104441812/e5b9ec56-7edd-4605-aeef-526a530c31d7)


## Features
- Real-time detection of vehicles in deep curves.
- User-friendly web interface hosted on Raspberry Pi.
- Integration with YOLOv4 for accurate vehicle detection.
- Compatibility with various devices and platforms.

## Installation
### Prerequisites
- Raspberry Pi (any model with sufficient resources)
- Node.js installed on Raspberry Pi
- YOLOv4 installed on Raspberry Pi
- Web browser

### Steps
1. Clone this repository to your Raspberry Pi:
   ```
   git clone https://github.com/sundaram123rkishnan/dynamic-road-detective-system
   ```
2. Install dependencies:
   ```
   cd dynamic-road-detective
   npm install
   ```
3. Configure YOLOv4 for vehicle detection. Refer to YOLOv4 documentation for setup instructions.
4. Start the server:
   ```
   npm run start
   ```
5. Access the web interface by navigating to `http://localhost:3000` in your web browser.

## Usage
1. Once the web interface is accessed, the live feed from the camera installed in the deep curves will be displayed.
2. The system will automatically detect vehicles passing through the curves in real-time using YOLOv4.
3. Users can view the detected vehicles on the web interface along with relevant information such as timestamp and vehicle type.
4. Users can further analyze the data or take necessary actions based on the detected vehicles.

## Support
For any inquiries or issues regarding the Dynamic Road Detective System, please contact:
- [krishnsundaram@gmail.com]

## License
This project is licensed under the [License Name] License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Next.js](https://nextjs.org/) for web development.
- [YOLOv4](https://github.com/sundaram123krishnan/yolov5-object-detection) for vehicle detection.
- [Raspberry Pi](https://www.raspberrypi.org/) for hosting the website.
