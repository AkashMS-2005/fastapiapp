from typing import List
# pyrefly: ignore [missing-import]
from fastapi import Depends, HTTPException, status
# pyrefly: ignore [missing-import]
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db
from models.users import User
from utils.token import verify_access_token

# OAuth2 Scheme
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


async def get_current_user(token: str = Depends(oauth2_scheme),db:AsyncSession=Depends(get_db)):
    user_info=verify_access_token(token, db)
    result = await db.execute(select(User).filter(User.id == int (user_info["sub"])))
    current_user=result.scalars().first()
    
    if current_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials"
        )
    return current_user


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
