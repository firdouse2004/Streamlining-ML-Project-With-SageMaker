# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
Overview
This project demonstrates the process of creating and deploying a machine learning model to classify mobile phone prices using AWS SageMaker. The project follows a step-by-step approach, from data preparation to model deployment. The classification problem involves predicting the price range of mobile phones based on their features.

Prerequisites
Before starting, make sure you have the following set up:

AWS Account: You need an AWS account with administrative access.

AWS CLI: Configure the AWS CLI with your access key and secret access key.

Python Packages: Install the required packages from requirements.txt:

pip install -r requirements.txt
Step-by-Step Guide
IAM User:
Create an IAM User with AdministratorAccess permissions in the AWS Management Console.

AWS CLI Configuration:
Configure the AWS CLI with your IAM User's access key and secret access key using the aws configure command.

Install Packages:
Install the necessary Python packages listed in requirements.txt.

Create S3 Bucket:
Create an AWS S3 bucket where you will store your dataset and model artifacts.

Load Data:
Load the Mobile Price Classification dataset.

Feature Engineering:
Perform any required feature engineering on the dataset.

Split and Save Data:
Split the dataset into training and testing data. Save these datasets as CSV files that can be uploaded to the S3 bucket.

Upload Data to S3:
Upload the CSV files to the S3 bucket.

Script.py:
Create a Python script, script.py, where you initialize the model and perform basic feature engineering.

SageMaker Execution:
SageMaker will access script.py for model training and testing.

Create IAM Role:
Create an AWS IAM role that SageMaker can use for accessing resources.

Create SageMaker Estimator:
Create an SKLearn Estimator for your model.

Train the Model:
Fit the estimator to the training and testing datasets stored in the S3 bucket.

Create a Model Copy:
Create a copy of the trained model that can be used for deployment.

Deploy an Endpoint:
Create a SageMaker endpoint that can be used to predict new instances. Note that endpoint creation is billable.

Testing:
Test your model on the testing dataset to evaluate its performance.

Delete the Endpoint:
After testing, remember to delete the SageMaker endpoint to avoid additional charges.
WorkFlow
![image](https://github.com/user-attachments/assets/9262ba2c-fb5d-411a-a20a-2281052edaba)
![image](https://github.com/user-attachments/assets/c85a4aff-2d9e-4930-8fce-2470cd56923b)


Integration and Deployment Workflow
The project utilizes various AWS services integrated seamlessly to provide real-time predictions. Below is a detailed explanation of how these components are connected:

AWS SageMaker Endpoint:

The trained Random Forest model is deployed as an endpoint in AWS SageMaker.
This endpoint is responsible for serving predictions when invoked with input features.
AWS Lambda Function:

AWS Lambda acts as an intermediary between the SageMaker endpoint and the API Gateway.
It invokes the SageMaker endpoint by sending input data and processing the prediction response.
The Lambda function ensures efficient and stateless communication.
API Gateway:

The API Gateway is configured to expose a REST API that can be accessed publicly.
It routes incoming HTTP requests from the React.js front-end to the AWS Lambda function.
Once the Lambda function executes, the result is returned to the front-end through the API Gateway.
React.js Frontend:

The front-end application interacts with the deployed REST API using the HTTP/HTTPS link provided by the API Gateway.
It sends user inputs (mobile specifications) to the API and receives the predicted price range in real time.
The result is displayed to the user in an intuitive interface.
HTTP and REST API Links
The deployed API Gateway provides two types of links:

REST API Link: Used to invoke the Lambda function with user inputs.
HTTP Link: Used by the React.js front-end to fetch predictions from the back-end.

End-to-End Data Flow
The user interacts with the React.js front-end to input mobile specifications.
The front-end sends an HTTP request to the API Gateway.
The API Gateway triggers the AWS Lambda function.
The Lambda function processes the request and communicates with the AWS SageMaker Endpoint to get predictions.
The prediction result is sent back to the front-end via the API Gateway.
The front-end displays the predicted price range to the user.

AWS LAMBDA FUNCTION:

lambda_function.py


import os
import json
import boto3

# Grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime = boto3.client('runtime.sagemaker')

def lambda_handler(event, context):
    try:
        # Parse input features from the event
        input_features = json.loads(event['body'])
        # Ensure all required features are present
        required_features = [
            'battery_power', 'blue', 'clock_speed', 'dual_sim', 'fc', 'four_g', 
            'int_memory', 'm_dep', 'mobile_wt', 'n_cores', 'pc', 'px_height',
            'px_width', 'ram', 'sc_h', 'sc_w', 'talk_time', 'three_g',
            'touch_screen', 'wifi', 'brand'
        ]
    # Check if all required features are provided
        missing_features = [feature for feature in required_features if feature not in input_features]
        if missing_features:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": f"Missing required features: {', '.join(missing_features)}"})
            }
    # Create a CSV-formatted string for the model input
        payload_data = ','.join(str(input_features[feature]) for feature in required_features)
        # Invoke the SageMaker model endpoint
        response = runtime.invoke_endpoint(
            EndpointName=ENDPOINT_NAME,
            ContentType='text/csv',
            Body=payload_data
        )
        # Parse the model's response
        result = json.loads(response['Body'].read().decode())
        # Construct the response to return
        preds = {"Prediction": result}
        response_dict = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            "body": json.dumps(preds)
        }
        return response_dict
    except Exception as e:
        # Return error message if something goes wrong
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
        
Test Function:(JSON Format)
{
  "body": "{\"battery_power\": 1500, \"blue\": 1, \"clock_speed\": 2.5, \"dual_sim\": 1, \"fc\": 5, \"four_g\": 1, \"int_memory\": 16, \"m_dep\": 0.5, \"mobile_wt\": 150, \"n_cores\": 4, \"pc\": 13, \"px_height\": 800, \"px_width\": 1200, \"ram\": 3000, \"sc_h\": 15, \"sc_w\": 8, \"talk_time\": 20, \"three_g\": 1, \"touch_screen\": 1, \"wifi\": 1, \"brand\": 16}"
}

INPUT AND OUTPUT:

![image](https://github.com/user-attachments/assets/3d0b1a97-e6cc-49da-be02-a12a03776c8e)








