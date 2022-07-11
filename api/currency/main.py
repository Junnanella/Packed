from fastapi import FastAPI


app = FastAPI()

@app.get("./test")
def test_react(): 
    return "Testing"

