from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware

from model import train_model, predict_future_spending

app = FastAPI()

# Middleware to allow large payloads
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Transaction(BaseModel):
    date: str
    amount: float
    transaction_type: str
    category: str

class SpendingRequest(BaseModel):
    transactions: list[Transaction]
    months: int

@app.post("/predict-spending")
async def predict_spending(request: SpendingRequest):
    
    # Corrected function call with proper unpacking
    model, last_index, last_amount, df = train_model([t.dict() for t in request.transactions])
    
    result = predict_future_spending(model, last_index, last_amount, request.months, df)
    return result
