
import os
import pickle
import json
import pandas as pd
import numpy as np
from simpletransformers.ner import NERModel, NERArgs
from ast import literal_eval
PATH, _ = os.path.split(__file__)


import argparse
import glob

if __name__ == "__main__":

    
    parser = argparse.ArgumentParser()


    # reads input channels training and testing from the environment variables
    parser.add_argument("--training", type=str, default=os.environ["SM_CHANNEL_TRAIN"])
    parser.add_argument("--evaluating", type=str, default=os.environ["SM_CHANNEL_VALIDATION"])
    parser.add_argument("--labels", type=str, default=os.environ["SM_CHANNEL_LABEL"])

    args = parser.parse_args()


    train_data = pd.read_csv(args.training + "/train.csv")
    eval_data = pd.read_csv(args.evaluating + "/evaluation.csv")

    with open (args.labels + "/labels.txt", 'r') as f:
        custom_labels = list(literal_eval(f.read()))
    model_args = NERArgs()
    model_args.train_batch_size = 32
    model_args.evaluate_during_training = True
    model_args = {
        "overwrite_output_dir": True,
        "num_train_epochs": 3,
        "use_multiprocessing": True,
        "manual_seed": 1,
        "n_gpu": 1,
        "use_cuda": True,

    }

    model = NERModel(
        "bert", "bert-base-uncased", 
        args=model_args, 
        use_cuda=False,
        labels=custom_labels
    )

    # Train the model
    print(len(train_data))
    print(train_data[:30])
    model.train_model(train_data, eval_data=eval_data)
    result, model_outputs, preds_list = model.eval_model(eval_data)
    print(result)
    pickle.dump(model, open('/opt/ml/model/model', 'wb'))
  
    print('Model trained and saved successfully.')



