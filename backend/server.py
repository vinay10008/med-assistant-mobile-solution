
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import datetime
import json

app = Flask(__name__)
CORS(app)

# In-memory database (would be replaced by a real database in production)
appointments = []
health_data = {
    "headache": [
        "Headaches can be caused by various factors including stress, dehydration, or lack of sleep. Try resting, staying hydrated, and if symptoms persist for more than 24 hours, please consult with a doctor.",
        "Based on your symptoms, this could be a tension headache. Try over-the-counter pain relievers, staying hydrated, and relaxation techniques. If your headache is severe or persistent, please see a doctor."
    ],
    "fever": [
        "For fevers, rest and stay hydrated. Take over-the-counter fever reducers as directed. If your temperature exceeds 103°F (39.4°C) or lasts more than three days, seek medical attention.",
        "Your fever may indicate an infection. Rest, drink fluids, and monitor your temperature. Take acetaminophen or ibuprofen as directed. If your fever is high or persists, please consult a healthcare provider."
    ],
    "cough": [
        "For coughs and colds, rest and drink plenty of fluids. Over-the-counter cough suppressants may help. If you experience difficulty breathing or symptoms persist beyond a week, please consult a healthcare professional.",
        "Your cough could be due to a viral infection, allergies, or irritants. Stay hydrated, use honey for sore throat (if not allergic), and consider over-the-counter medications. If you have difficulty breathing or your cough persists, please see a doctor."
    ],
    "general": [
        "Thank you for sharing your symptoms. Based on your description, I recommend resting and staying hydrated. If your symptoms persist or worsen, please schedule an appointment with a doctor for a proper diagnosis.",
        "Based on the information provided, it's difficult to determine an exact cause. Monitor your symptoms, rest, and stay hydrated. If your condition worsens or doesn't improve within a few days, please consult with a healthcare provider."
    ]
}

@app.route('/api/health/consult', methods=['POST'])
def ai_consultation():
    data = request.json
    query = data.get('query', '').lower()
    
    # Simple keyword matching to determine response
    if 'headache' in query:
        category = 'headache'
    elif 'fever' in query or 'temperature' in query:
        category = 'fever'
    elif 'cough' in query or 'cold' in query:
        category = 'cough'
    else:
        category = 'general'
    
    # Return a random response from the category
    response = random.choice(health_data[category])
    
    # Simulate processing time
    # time.sleep(1)
    
    return jsonify({
        'response': response
    })

@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    return jsonify(appointments)

@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    
    # Validate required fields
    required_fields = ['date', 'time', 'doctor', 'department']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Create appointment
    appointment = {
        'id': len(appointments) + 1,
        'date': data['date'],
        'time': data['time'],
        'doctor': data['doctor'],
        'department': data['department'],
        'status': 'pending'
    }
    
    appointments.append(appointment)
    
    return jsonify({
        'message': 'Appointment created successfully',
        'appointment': appointment
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
