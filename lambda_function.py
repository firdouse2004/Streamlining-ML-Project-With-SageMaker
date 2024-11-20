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
