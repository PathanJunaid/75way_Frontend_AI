# Required Dependencies

To run this project, install the following dependencies:

```sh
cd Backend_AI
python3 -m venv venv
source venv/bin/activate
pip install fastapi pandas numpy pydantic scikit-learn uvicorn

uvicorn main:app --reload 
```

### Dependencies Used:
- **FastAPI** - Web framework for building APIs.
- **pandas** - Data manipulation and analysis.
- **NumPy** - Numerical computing library.
- **pydantic** - Data validation and settings management.
- **scikit-learn** - Machine learning library for predictive modeling.

