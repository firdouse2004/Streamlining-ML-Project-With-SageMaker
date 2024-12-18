
import argparse
import os
import json
import sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, precision_score, recall_score
import joblib
import pathlib
from io import StringIO
import boto3
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

def model_fn(model_dir):
    clf = joblib.load(os.path.join(model_dir, "model.joblib"))
    return clf
def input_fn(request_body, request_content_type):
    print(request_body)
    print(request_content_type)
    if request_content_type == "text/csv":
        request_body = request_body.strip()
        try:
            df = pd.read_csv(StringIO(request_body), header=None)
            return df

        except Exception as e:
            print(e)
    else:
        return """Please use Content-Type = 'text/csv' and, send the request!!"""

def predict_fn(input_data, model):
    if type(input_data) != str:
        prediction = model.predict(input_data)
        print(prediction)
        return prediction
    else:
        return input_data

if __name__ == '__main__':

    print("[INFO] Extracting arguments")
    parser = argparse.ArgumentParser()

    # Hyperparameters sent by the client are passed as command-line arguments to the script.
    parser.add_argument('--n_estimators', type=int, default=100)
    parser.add_argument('--random_state', type=int, default=0)

    # Input data and model directories
    parser.add_argument('--model-dir', type=str, default=os.environ['SM_MODEL_DIR'])
    parser.add_argument('--train', type=str, default=os.environ['SM_CHANNEL_TRAIN'])
    parser.add_argument('--test', type=str, default=os.environ['SM_CHANNEL_TEST'])
    parser.add_argument('--train_file', type=str, default='train_v1.csv')
    parser.add_argument('--test_file', type=str, default='test_v1.csv')

    args, _ = parser.parse_known_args()

    print("SKLearn Version: ", sklearn.__version__)
    print("Joblib Version: ", joblib.__version__)

    print("[INFO] Reading data")
    print()
    train_df = pd.read_csv(os.path.join(args.train, args.train_file))
    test_df = pd.read_csv(os.path.join(args.test, args.test_file))

    # Apply LabelEncoder for 'brand' feature
    if 'brand' in train_df.columns:
        print("[INFO] Encoding 'brand' feature using LabelEncoder")
        le = LabelEncoder()
        train_df['brand'] = le.fit_transform(train_df['brand'])
        test_df['brand'] = le.transform(test_df['brand'])

    features = list(train_df.columns)
    label = features.pop(-1)

    print("Building training and testing datasets")
    print()
    X_train = train_df[features]
    X_test = test_df[features]
    y_train = train_df[label]
    y_test = test_df[label]

    print('Column order: ')
    print(features)
    print()

    print("Label column is: ", label)
    print()

    print("Data Shape: ")
    print()
    print("---- SHAPE OF TRAINING DATA (80%) ----")
    print(X_train.shape)
    print(y_train.shape)
    print()
    print("---- SHAPE OF TESTING DATA (20%) ----")
    print(X_test.shape)
    print(y_test.shape)
    print()

    print("Training RandomForest Model.....")
    print()
    model = RandomForestClassifier(n_estimators=args.n_estimators, random_state=args.random_state, verbose=3, n_jobs=None)
    model.fit(X_train, y_train)
    print()

    model_path = os.path.join(args.model_dir, "model.joblib")
    joblib.dump(model, model_path)
    print("Model persisted at " + model_path)
    print()

    y_pred_test = model.predict(X_test)
    test_acc = accuracy_score(y_test, y_pred_test)
    test_rep = classification_report(y_test, y_pred_test)

    print()
    print("---- METRICS RESULTS FOR TESTING DATA ----")
    print()
    print("Total Rows are: ", X_test.shape[0])
    print('[TESTING] Model Accuracy is: ', test_acc)
    print('[TESTING] Testing Report: ')
    print(test_rep)
