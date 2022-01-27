import argparse
import numpy as np
from data_loader import load_data
from train import train
import pickle
import os
import torch

np.random.seed(0)
torch.manual_seed(0)

parser = argparse.ArgumentParser()
parser.add_argument(
    "--dataset", type=str, default="restaurant", help="which dataset to use"
)
parser.add_argument(
    "--dim", type=int, default=4, help="dimension of entity and relation embeddings"
)
parser.add_argument("--n_hop", type=int, default=2, help="maximum hops")
parser.add_argument(
    "--kge_weight", type=float, default=0.2, help="weight of the KGE term"
)
parser.add_argument(
    "--l2_weight", type=float, default=1e-7, help="weight of the l2 regularization term"
)
parser.add_argument("--lr", type=float, default=0.04, help="learning rate")
parser.add_argument("--batch_size", type=int, default=256, help="batch size")
parser.add_argument("--n_epoch", type=int, default=15,
                    help="the number of epochs")
parser.add_argument(
    "--n_memory", type=int, default=32, help="size of ripple set for each hop"
)
parser.add_argument(
    "--item_update_mode",
    type=str,
    default="plus_transform",
    help="how to update item at the end of each hop",
)
parser.add_argument(
    "--using_all_hops",
    type=bool,
    default=True,
    help="whether using outputs of all hops or just the last hop when making prediction",
)

# default settings for Book-Crossing
"""
parser = argparse.ArgumentParser()
parser.add_argument('--dataset', type=str, default='book', help='which dataset to use')
parser.add_argument('--dim', type=int, default=4, help='dimension of entity and relation embeddings')
parser.add_argument('--n_hop', type=int, default=2, help='maximum hops')
parser.add_argument('--kge_weight', type=float, default=1e-2, help='weight of the KGE term')
parser.add_argument('--l2_weight', type=float, default=1e-5, help='weight of the l2 regularization term')
parser.add_argument('--lr', type=float, default=1e-3, help='learning rate')
parser.add_argument('--batch_size', type=int, default=1024, help='batch size')
parser.add_argument('--n_epoch', type=int, default=10, help='the number of epochs')
parser.add_argument('--n_memory', type=int, default=32, help='size of ripple set for each hop')
parser.add_argument('--item_update_mode', type=str, default='plus_transform',
                    help='how to update item at the end of each hop')
parser.add_argument('--using_all_hops', type=bool, default=True,
                    help='whether using outputs of all hops or just the last hop when making prediction')
"""
parser.add_argument("--ratings", type=str,
                    default=os.environ["SM_CHANNEL_RATINGS"])
parser.add_argument("--kg", type=str, default=os.environ["SM_CHANNEL_KG"])
parser.add_argument('--model-dir', type=str,
                    default=os.environ['SM_MODEL_DIR'])

parser.add_argument("--use_cuda", type=bool, default=True,
                    help="whether to use gpu")


args = parser.parse_args()

show_loss = False
data_info = load_data(args)
train(args, data_info, show_loss)
