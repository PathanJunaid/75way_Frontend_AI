from pydantic import BaseModel
from typing import List, Literal
from datetime import datetime

class Transaction(BaseModel):
    date: str  # Format: MM/DD/YYYY
    description: str
    amount: float
    transaction_type: Literal["debit", "credit"]
    category: str
    user_id: str

class PredictionRequest(BaseModel):
    months: int
    transactions: List[Transaction]
