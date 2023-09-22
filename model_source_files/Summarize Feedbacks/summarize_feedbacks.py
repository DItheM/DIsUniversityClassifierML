import json
import joblib

# Open and read the JSON file
with open('Summarize Feedbacks/feedbacks.json', 'r') as file:
    json_data = json.load(file)
    file.close

feedback_summarizer_model = joblib.load(
    'Summarize Feedbacks/feedback-summarizer.pkl')


def limitLines(summary):
    sentences = summary.split(".")
    return sentences[0]


def getSummary(uni_id):
    i = 0
    bucket_1 = []
    bucket_2 = []
    for x in json_data[uni_id]['feedbacks']:
        if i <= 24:
            bucket_1.append(x)
        if i > 24:
            bucket_2.append(x)
        i = i + 1

    paragraph_1 = ' '.join(bucket_1)
    paragraph_2 = ' '.join(bucket_2)
    paragraph = paragraph_1 + ' ' + paragraph_2
    print(paragraph)
    sum_1 = limitLines(feedback_summarizer_model.predict([paragraph_1])[0])
    sum_2 = limitLines(feedback_summarizer_model.predict([paragraph_2])[0])
    print(sum_1 + '. ' + sum_2 + '.')


getSummary(50)
