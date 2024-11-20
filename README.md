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

