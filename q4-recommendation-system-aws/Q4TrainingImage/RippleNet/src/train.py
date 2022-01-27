import numpy as np
import torch
import time
import pickle
from model import RippleNet
import boto3
import io
import subprocess


def train(args, data_info, show_loss):
    train_data = data_info[0]
    eval_data = data_info[1]
    unique_rated_menu_items = data_info[2]
    n_entity = data_info[3]
    n_relation = data_info[4]
    ripple_set = data_info[5]

    model = RippleNet(args, n_entity, n_relation)
    if not args.use_cuda:
        model.cuda()
    optimizer = torch.optim.Adam(
        filter(lambda p: p.requires_grad, model.parameters()),
        args.lr,
    )
    for step in range(args.n_epoch):
        # training
        np.random.shuffle(train_data)
        start = 0
        while start < train_data.shape[0]:
            return_dict = model(
                *get_feed_dict(
                    args, model, train_data, ripple_set, start, start + args.batch_size, flag=True
                )
            )
            loss = return_dict["loss"]

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            start += args.batch_size
            if show_loss:
                print("%.1f%% %.4f" %
                      (start / train_data.shape[0] * 100, loss.item()))

        # evaluation
        train_auc, train_acc, train_scores = evaluation(
            model, train_data, (args, ripple_set, args.batch_size), flag=True
        )
        eval_auc, eval_acc, eval_scores = evaluation(
            model, eval_data, (args, ripple_set, args.batch_size), flag=True
        )

        print(
            "epoch %d    train auc: %.4f  acc: %.4f    eval auc: %.4f  acc: %.4f"
            % (step, train_auc, train_acc, eval_auc, eval_acc)
        )

    # test_scores = evaluation(
    #     model, test_data, (args, ripple_set, args.batch_size), flag=False
    # )

    s3 = boto3.client('s3', aws_access_key_id="AKIA4UXJDAWJ6P3SUTGP",
                      aws_secret_access_key="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")

    pickle.dump(model, open(args.model_dir+'/model', 'wb'))

    buffer = io.BytesIO()
    pickle.dump((unique_rated_menu_items,
                (args, ripple_set, args.batch_size)), buffer)
    s3.put_object(Bucket="zess-q3-recommendations",
                  Key='model_params.pkl', Body=buffer.getvalue())


def get_feed_dict(args, model, data, ripple_set, start, end, flag):
    items = torch.LongTensor(data[start:end, 1])
    if flag:
        labels = torch.LongTensor(data[start:end, 2])

    # time.sleep(1000)
    memories_h, memories_r, memories_t = [], [], []
    for i in range(args.n_hop):
        memories_h.append(
            torch.LongTensor([ripple_set[user][i][0]
                             for user in data[start:end, 0]])
        )
        memories_r.append(
            torch.LongTensor([ripple_set[user][i][1]
                             for user in data[start:end, 0]])
        )
        memories_t.append(
            torch.LongTensor([ripple_set[user][i][2]
                             for user in data[start:end, 0]])
        )
    if not args.use_cuda:
        items = items.cuda()
        labels = labels.cuda()
        memories_h = list(map(lambda x: x.cuda(), memories_h))
        memories_r = list(map(lambda x: x.cuda(), memories_r))
        memories_t = list(map(lambda x: x.cuda(), memories_t))
    elif args.use_cuda and flag:
        return items, labels, memories_h, memories_r, memories_t, flag

    elif args.use_cuda and not flag:
        return items, None, memories_h, memories_r, memories_t, flag


def evaluation(model, data, params, flag):
    args = params[0]
    ripple_set = params[1]
    batch_size = params[2]
    start = 0
    auc_list = []
    acc_list = []
    scores_list = []
    model.eval()
    if flag:
        while start < data.shape[0]:
            auc, acc, scores = model.evaluate(
                *get_feed_dict(args, model, data, ripple_set, start, start + batch_size, flag)
            )
            auc_list.append(auc)
            acc_list.append(acc)
            scores_list.append(scores)
            start += batch_size
        model.train()

        s3 = boto3.client('s3', aws_access_key_id="AKIA4UXJDAWJ6P3SUTGP",
                          aws_secret_access_key="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")

        pickle.dump(model, open(args.model_dir+'/model', 'wb'))

        model_params = (args, ripple_set, batch_size)
        buffer = io.BytesIO()
        pickle.dump((data, model_params), buffer)
        s3.put_object(Bucket="zess-q3-recommendations",
                      Key='save.pkl', Body=buffer.getvalue())

        return float(np.mean(auc_list)), float(np.mean(acc_list)), scores_list

    else:
        while start < data.shape[0]:
            scores = model.evaluate(
                *get_feed_dict(args, model, data, ripple_set, start, start + batch_size, flag)
            )

            scores_list.append(scores)
            start += batch_size

        return [i for sublist in scores_list for i in sublist]
