from typing import List

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
from models.users import User
from utils.token import verify_access_token

# OAuth2 Scheme
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Verify JWT token and return the authenticated user.
    """
    return verify_access_token(token, db)


def role_required(allowed_roles: List[str]):
    """
    Restrict endpoint access based on user roles.

    Example:
        Depends(role_required(["admin"]))
    """

    def role_checker(
        current_user: User = Depends(get_current_user)
    ) -> User:

        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action."
            )

        return current_user

    return role_checker