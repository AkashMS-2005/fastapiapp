from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
from utils.token import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    return verify_access_token(token, db)


def role_required(roles: list):

    def checker(current_user=Depends(get_current_user)):

        if current_user.role not in roles:
            raise HTTPException(
                status_code=403,
                detail="Permission Denied"
            )

        return current_user

    return checker