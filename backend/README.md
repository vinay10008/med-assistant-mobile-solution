
# Med Assistant Mobile Solution - Backend

This is a simple Flask-based backend for the Med Assistant Mobile Solution app. It provides API endpoints for AI health consultations and appointment management.

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Start the server:
   ```
   python server.py
   ```

The server will start on http://localhost:5000

## API Endpoints

### AI Consultation
- **POST /api/health/consult**
  - Request body: `{ "query": "I have a headache" }`
  - Response: `{ "response": "AI consultation response..." }`

### Appointments
- **GET /api/appointments**
  - Response: `[{ "id": 1, "date": "2025-04-18", "time": "10:00 AM", "doctor": "Dr. Smith", "department": "Cardiology", "status": "confirmed" }, ...]`

- **POST /api/appointments**
  - Request body: `{ "date": "2025-04-20", "time": "11:00 AM", "doctor": "Dr. Johnson", "department": "Neurology" }`
  - Response: `{ "message": "Appointment created successfully", "appointment": { ... } }`

## Notes

This is a simplified backend for demonstration purposes. In a production environment, you would want to:

1. Use a proper database (e.g., PostgreSQL)
2. Implement authentication and authorization
3. Add input validation and error handling
4. Use environment variables for configuration
5. Deploy to a production server

For the AI consultation component, a real implementation would integrate with a proper AI model via an API like OpenAI, Perplexity, or a custom model.
