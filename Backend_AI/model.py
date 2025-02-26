import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

def train_model(transactions):
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

    if len(monthly_expenses) < 2:  # Handle case with only 1 month of data
        last_amount = monthly_expenses["amount"].iloc[-1]
        return None, len(monthly_expenses), last_amount, df
    # Train Linear Regression Model
    X = monthly_expenses[["time_index"]]
    y = monthly_expenses["amount"]
    
    model = LinearRegression()
    model.fit(X, y)
    
    last_amount = y.iloc[-1]  # Last known amount
    last_index = len(monthly_expenses)  # Last time index

    return model, last_index, last_amount, df

def predict_category_wise(df, future_indices, future_dates):
    """ Predict future spending for each category. """
    category_predictions = {}
    
    for category in df["category"].unique():
        category_df = df[df["category"] == category]
        monthly_category_expenses = category_df.groupby(["year", "month"])["amount"].sum().reset_index()
        monthly_category_expenses["time_index"] = range(1, len(monthly_category_expenses) + 1)
        
        if len(monthly_category_expenses) > 1:
            cat_model = LinearRegression()
            cat_model.fit(monthly_category_expenses[["time_index"]], monthly_category_expenses["amount"])
            
            category_preds = cat_model.predict(pd.DataFrame(future_indices, columns=["time_index"]))
            category_predictions[category] = {
                future_dates[i]: round(category_preds[i], 2) for i in range(len(future_dates))
            }
    
    return category_predictions

def predict_future_spending(model, last_index, last_amount, months, df):
    future_dates = [
        (datetime.now() + timedelta(days=30 * i)).strftime("%Y-%m")
        for i in range(1, months + 1)
    ]
    if model is None:
        # Return static prediction (same last month’s spending)
        return {
            "predicted_spending": {date: last_amount for date in future_dates},
            "increase_percentage": 0.0,  # No increase since we have only 1 data point
        }
    future_indices = pd.DataFrame([[last_index + i] for i in range(1, months + 1)], columns=["time_index"])
    predictions = model.predict(future_indices)
    
    predicted_spending = {
        future_dates[i]: {
            "amount": round(predictions[i], 2),
            "increase_percentage": round(((predictions[i] - last_amount) / last_amount) * 100, 2)
        }
        for i in range(len(future_dates))
    }

    # Call the new function for category-wise predictions
    category_predictions = predict_category_wise(df, future_indices, future_dates)

    return {"predicted_spending": predicted_spending, "category_wise": category_predictions}
