
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

def train_model(transactions):
    # Convert transactions to DataFrame
    df = pd.DataFrame(transactions)
    
    # Convert Date to datetime format & extract month and year
    df["date"] = pd.to_datetime(df["date"], format="%m/%d/%Y")
    df["month"] = df["date"].dt.month
    df["year"] = df["date"].dt.year
    
    # Keep only debits (expenses) for trend analysis
    df = df[df["transaction_type"] == "debit"]
    
    # Aggregate total spending per month
    monthly_expenses = df.groupby(["year", "month"])["amount"].sum().reset_index()
    monthly_expenses["time_index"] = range(1, len(monthly_expenses) + 1)

    # Train Linear Regression Model
    X = monthly_expenses[["time_index"]]
    y = monthly_expenses["amount"]
    
    model = LinearRegression()
    model.fit(X, y)
    
    return model, len(monthly_expenses)  # Return model & last time index

def predict_future_spending(model, last_index, months):
    future_indices = [[last_index + i] for i in range(1, months + 1)]
    predictions = model.predict(future_indices)
    
    future_dates = [
        (datetime.now() + timedelta(days=30 * i)).strftime("%Y-%m")
        for i in range(1, months + 1)
    ]
    
    return dict(zip(future_dates, predictions.round(2)))  # Format output
