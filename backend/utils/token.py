from jose import jwt, JWTError, ExpiredSignatureError
from datetime import datetime, timedelta
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from fastapi import HTTPException
from database import get_db
from models.users import User
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"


def create_access_token(
    data: dict,
    expires_delta: timedelta = timedelta(hours=2)
):
    to_encode = data.copy()

    expire = datetime.utcnow() + expires_delta

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


def verify_access_token(token: str, db: Session):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid Token"
            )

        current_user = db.query(User).filter(
            User.id == int(user_id)
        ).first()

        if current_user is None:
            raise HTTPException(
                status_code=401,
                detail="User Not Found"
            )

        return current_user

    except ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token Expired"
        )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )