import json
import numpy as np


"""
Functions to Post-process the model generated evaluation metrics
"""

def Sort(sub_li):
    
    l = len(sub_li)
    for i in range(0, l):
        for j in range(0, l-i-1):
            if (sub_li[j][1] > sub_li[j + 1][1]):
                tempo = sub_li[j]
                sub_li[j]= sub_li[j + 1]
                sub_li[j + 1]= tempo
    return sub_li

def postprocess_predictions(user_data, probability_scores):
    
    results_dict = {}
    predictions = [i for sublist in probability_scores for i in sublist]
    recommendation_results = [user_data, predictions]
    user_data = recommendation_results[0]
    test_probs = recommendation_results[1]
    for i, j in zip(user_data, test_probs):
        user = i[0]
        menu_item = i[1]
        label = i[2]
        pred = j

        if user not in results_dict:
            results_dict[user] = []
        results_dict[user].append([user, menu_item, label, pred])
        
    return results_dict

def generate_recommendations_dict(results_dict):
    
    recommendations_dict = {}
    for idx, i in enumerate(results_dict.values()):
        for j in i:
            if j[0] not in recommendations_dict:
                recommendations_dict[j[0]] = []
            recommendations_dict[j[0]].append({j[1]: j[3]})                      
    
    return recommendations_dict


def modify_recommendations_dict(recommendations_dict, mapping, user_id):
    
    sampled_answers_new = []
    sampled_answers = recommendations_dict[user_id]
    for sampled_answer in sampled_answers:
        for key, val in zip(sampled_answer.keys(), sampled_answer.values()):
            sampled_answers_new.append([key, val])
            
    res = Sort(sampled_answers_new)[::-1]
    test_menu_items = []
    for i in res:
        for k, j in zip(mapping.keys(), mapping.values()):
            if i[0]==j:
                test_menu_items.append([k, i[1]])
                
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
            if i[1] not in recommendations:
                if i[2] == 1:
                    previous_liked_items.append(i[1])
                else:
                    previous_disliked_items.append(i[1])
            
    return previous_liked_items, previous_disliked_items