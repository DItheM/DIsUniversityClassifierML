from flask import Flask, request
from flask_cors import CORS
import joblib
import json

app = Flask(__name__)
CORS(app)

# load university classifier model
university_classifier_model = joblib.load(
    'models/university-classifier.pkl')

# load program recommender model(file)
program_recommender_model = joblib.load(
    'models/program-recommender.pkl')

# load demand predictor model
demand_predictor_model = joblib.load(
    'models/demand-predictor.pkl')
# load text summarizer model
feedback_summarizer_model = joblib.load(
    'models/feedback-summarizer.pkl')

# Open and read the JSON files
with open('json_data/countries.json', 'r') as file:
    country_data = json.load(file)
    file.close

with open('json_data/score_levels.json', 'r') as file:
    score_levels = json.load(file)
    file.close

with open('json_data/institutions.json', 'r') as file:
    institution_data = json.load(file)
    file.close

with open('json_data/feedbacks.json', 'r') as file:
    feedback_data = json.load(file)
    file.close

with open('json_data/job_roles.json', 'r') as file:
    job_roles_data = json.load(file)
    file.close
    
with open('json_data/course_descriptions.json', 'r') as file:
    course_description_data = json.load(file)
    file.close


def limitLines(summary):
    sentences = summary.split(".")
    return sentences[0]


def getSummary(uni_id):
    i = 0
    bucket_1 = []
    bucket_2 = []
    for x in feedback_data[uni_id]['feedbacks']:
        if i <= 24:
            bucket_1.append(x)
        if i > 24:
            bucket_2.append(x)
        i = i + 1

    paragraph_1 = ' '.join(bucket_1)
    paragraph_2 = ' '.join(bucket_2)
    sum_1 = limitLines(feedback_summarizer_model.predict([paragraph_1])[0])
    sum_2 = limitLines(feedback_summarizer_model.predict([paragraph_2])[0])
    return sum_1 + '. ' + sum_2 + '.'


@app.route('/classify_university', methods=['POST'])
def classify_university():
    try:
        # Get the data from the form
        budget = request.form.get('budget', type=int)
        quality = request.form.get('quality', type=str)
        country = request.form.get('country', type=str)

        country_index = country_data[country]
        quality_score = score_levels[quality]

        institution_prediction = university_classifier_model.predict(
            [[country_index, quality_score, budget]])
        institution = institution_prediction[0]
        institution_index = institution_data[institution]

        course_levels = [0, 1, 2, 3, 4]
        predicted_courses = []
        course_description = []
        for course_level in course_levels:
            course_prediction = program_recommender_model.predict(
                [[institution_index, course_level, 5]])
            course_description.append(course_description_data[course_prediction[0]])
            predicted_courses.append(course_prediction[0])

        summarized_feedback = getSummary(institution_index)

        response_data = {
            "institution": institution,
            "course_1": predicted_courses[0],
            "course_2": predicted_courses[1],
            "course_3": predicted_courses[2],
            "course_4": predicted_courses[3],
            "course_5": predicted_courses[4],
            "course_desc_1": course_description[0],
            "course_desc_2": course_description[1],
            "course_desc_3": course_description[2],
            "course_desc_4": course_description[3],
            "course_desc_5": course_description[4],
            "feedback": summarized_feedback
        }
        print(country, quality, budget)
        print(response_data)
        return response_data

    except Exception as e:
        return {"error_1": str(e)}, 500


@app.route('/predict_demand', methods=['POST'])
def predict_demand():
    try:
        job_role = request.form.get('job_title', type=str)
        role_index = job_roles_data[job_role]
        demand_array = []
        years_array = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
                       2016, 2017, 2018, 2019, 2020, 2021, 2022]

        for year in years_array:
            demand_prediction = demand_predictor_model.predict(
                [[year, role_index]])
            demand_array.append(round(demand_prediction[0], 2))

        next_total_demand = 0
        latest_year = years_array[len(years_array) - 1]

        for _ in range(5):
            latest_year += 1
            prediction = demand_predictor_model.predict(
                [[latest_year, role_index]])
            next_total_demand += prediction[0]

        next_avg_demand = round(next_total_demand / 5, 2)

        i = 18
        last_total_demand = 0
        for _ in range(5):
            last_total_demand += demand_array[i]
            i += 1

        last_avg_demand = round(last_total_demand / 5, 2)

        change = abs(round(next_avg_demand - last_avg_demand, 2))

        direction = ""
        if change < 0:
            direction = "Decrease"
        else:
            direction = "Increase"

        response_data = {
            "change": change,
            "years": years_array,
            "demand": demand_array,
            "last_avg_demand": last_avg_demand,
            "next_avg_demand": next_avg_demand,
            "direction": direction
        }
        return response_data

    except Exception as e:
        return {"error_2": str(e)}, 500


if __name__ == '__main__':
    app.run(debug=True)
