# Python Flask + OpenAI Starter Guide

## 1. Setup
```bash
python -m venv venv
source venv/bin/activate
pip install flask openai python-dotenv flask-cors
```

## 2. Basic `app.py` Structure
```python
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/ask', methods=['POST'])
def ask_ai():
    data = request.json
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": data['prompt']}]
    )
    return jsonify({"answer": response.choices[0].message.content})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```

## 3. Environment Variable Checklist
- `OPENAI_API_KEY`: Get from OpenAI Platform.
- `FLASK_ENV`: Set to `development` for local testing.

---
*Tip: For quick backend deployment, use `Render` or `Railway` instead of AWS.*
