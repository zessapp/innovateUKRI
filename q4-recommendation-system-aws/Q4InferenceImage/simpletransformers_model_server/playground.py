import concurrent.futures
import math
import pickle
import time

SENTENCES = ["1 bottle of whiskey, any brand || 10 oranges || 1 egg || 5 tomatoes"]


def load_model():
    """
    Loads the model from the model directory via the model path

    Arguments:

        model_dir - The directory where the model is stored
        model_path - The absolute path to the model

    Return:

        void

    """

    try:
        return pickle.load(
            open("/home/hiren/git/zess-ingredient-parser-inference/model", "rb")
        )
    except IOError as exc:
        raise RuntimeError("Failed to open the picked model") from exc


def prediction(sentences, model):
    return model.predict(sentences)[0]


if __name__ == "__main__":
    model = load_model()
    start = time.time()
    prediction_results = prediction(SENTENCES, model)
    end = time.time()
    print("This is the time taken by predict ------> {} <----".format(end - start))
    print(prediction_results)

# with concurrent.futures.ProcessPoolExecutor() as executor:
#     for prime in executor.map(prediction, SENTENCES):
#         sleep(2)
#         print("is prime: {}".format(prime))