from langchain_core import output_parsers
from langchain_core import output_parsers
from langchain_core import output_parsers
import database
import database

# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException, status
# pyrefly: ignore [missing-import]
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db
from models.users import User
from schemas.token import Token
from schemas.users import UserCreate, UserResponse
from utils.security import hash_password, verify_password
from utils.token import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
async def register(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)):
    try:
        """
        Register a new user.
        """
        result=await db.execute(select(User).filter(User.email==user.email))
        existing_user=result.scalars().first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        hashed_password = hash_password(user.password)
        db_user = User(
            name=user.name,
            email=user.email,
            hashed_password=hashed_password,
            role=user.role
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)

        return db_user
    except HTTPException:
        raise

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, 
            detail=f"Database Error during registration: {str(e)}"
        )


@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_200_OK
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db:AsyncSession = Depends(get_db)):
    try:
        """
        Authenticate user and generate JWT token.
        """
        result=await db.execute(select(User).filter(User.email==form_data.username))
        existing_user=result.scalars().first()

        if existing_user is None:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
        
        if not verify_password(
        form_data.password,
        existing_user.hashed_password
        ):
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

        access_token = create_access_token(
            data={
                "sub": str(existing_user.id),
                "role": existing_user.role
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
        
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Authentication server error: {str(e)}"
        )