from train import evaluation
import json
import numpy as np
import pickle

"""
Functions to Post-process the model generated evaluation metrics
"""


def postprocess_predictions(user_data, probability_scores):

    results_dict = {}
    predictions = probability_scores
    recommendation_results = [user_data, predictions]
    user_data = recommendation_results[0]
    test_probs = recommendation_results[1]
    for i, j in zip(user_data, test_probs):
        user = i[0]
        menu_item = i[1]
        pred = j

        if user not in results_dict:
            results_dict[user] = []
        results_dict[user].append([user, menu_item, pred])

    return results_dict


def generate_recommendations_dict(results_dict):

    recommendations_dict = {}
    for idx, i in enumerate(results_dict.values()):
        for j in i:
            if j[0] not in recommendations_dict:
                recommendations_dict[j[0]] = []
            recommendations_dict[j[0]].append({j[1]: j[2]})

    return recommendations_dict


def modify_recommendations_dict(recommendations_dict, mapping, user_id):

    sampled_answers_new = {}
    sampled_answers = recommendations_dict[user_id]

    for sampled_answer in sampled_answers:
        for key, val in zip(sampled_answer.keys(), sampled_answer.values()):
            sampled_answers_new.update({key: val})

    res = {k: v for k, v in sorted(sampled_answers_new.items(), key=lambda item: item[1])}

    test_menu_items = []
    for key, val in zip(res.keys(), res.values()):
        for k, j in zip(mapping.keys(), mapping.values()):
            if key == j:
                test_menu_items.append([k, val])

    return test_menu_items


def out(test_menu_items):

    menu_item_recommendations = []
    for step in range(0, len(test_menu_items)):
        probability_score = test_menu_items[step][1]
        menu_item = test_menu_items[step][0]
        if probability_score > 0.5:
            menu_item_recommendations.append(menu_item)

    return menu_item_recommendations


def read_ratings_json(filepath):

    with open(filepath) as f:
        user_ratings = json.load(f)

    return user_ratings


def user_past_ratings(user_ratings, recommendations, user_id):

    previous_liked_items, previous_disliked_items = [], []
    for i in user_ratings:
        if i[0] == user_id:
            # if i[1] not in recommendations:
            if i[2] == 1:
                previous_liked_items.append(i[1])
            else:
                previous_disliked_items.append(i[1])

    return previous_liked_items, previous_disliked_items


def ripplenet_predict(encode_dir, model_dir, model, user_id):

    with open(encode_dir) as f:
        mapping = json.load(f)

    menu_items, (args, ripple_set, args.batch_size) = pickle.load(open(
        model_dir, "rb"))
    unique_user = [user_id] * len(menu_items)
    test_data = np.vstack((unique_user, menu_items)).T

    test_scores = evaluation(
        model, test_data, (args, ripple_set, args.batch_size), flag=False
    )

    results_dict = postprocess_predictions(test_data, test_scores)
    recommendations_dict = generate_recommendations_dict(results_dict)
    test_menu_items = modify_recommendations_dict(
        recommendations_dict, mapping, user_id)
    recommendations = out(test_menu_items)

    return recommendations
