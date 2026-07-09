# pyrefly: ignore [missing-import]
from sqlalchemy.engine import result
# pyrefly: ignore [missing-import]
from fastapi import APIRouter,HTTPException,Depends,status
from schemas import company
from schemas.company import CompanyCreate,CompanyUpdate,CompanyResponse
from models.company import Company
from sqlalchemy.orm import Session
from database import get_db,SessionLocal
from utils.oauth2 import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.job import Job

router = APIRouter(prefix="/company", tags=["company"])

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=CompanyResponse)
async def create_company(company: CompanyCreate,db:AsyncSession = Depends(get_db),current_user = Depends(get_current_user)):
    try:
        # Check if email is already registered
        result = await db.execute(select(Company).filter(Company.email == company.email))
        if result.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A company with this email is already registered."
            )
        
        # Check if phone is already registered
        result = await db.execute(select(Company).filter(Company.phone == company.phone))
        if result.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A company with this phone number is already registered."
            )

        db_company = Company(**company.dict())
        db.add(db_company)
        await db.commit()
        await db.refresh(db_company)
        result = await db.execute(
            select(Company)
            .filter(Company.id == db_company.id)
            .options(selectinload(Company.jobs))
        )
        return result.scalars().first()
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/",status_code=status.HTTP_200_OK,response_model=list[CompanyResponse])
async def get_all_company(db:AsyncSession = Depends(get_db),current_user = Depends(get_current_user)):
    try:
        result = await db.execute(select(Company).options(selectinload(Company.jobs)))
        companies = result.scalars().all()
        return companies
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/{company_id}",status_code=status.HTTP_200_OK,response_model=CompanyResponse)
async def get_company(company_id: int,db:AsyncSession = Depends(get_db),current_user = Depends(get_current_user)):
    try:
        result = await db.execute(
            select(Company)
            .filter(Company.id == company_id)
            .options(selectinload(Company.jobs))
        )
        company = result.scalars().first()
        if not company:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
        return company
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/{company_id}",status_code=status.HTTP_201_CREATED,response_model=CompanyResponse)
async def update_company(company_id: int,company: CompanyUpdate,db:AsyncSession = Depends(get_db),current_user = Depends(get_current_user)):
    try:
        result = await db.execute(
            select(Company)
            .filter(Company.id == company_id)
            .options(selectinload(Company.jobs))
        )
        db_company = result.scalars().first()
        if not db_company:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")

        # Check unique constraints if email or phone is updated
        if company.email is not None:
            email_result = await db.execute(
                select(Company)
                .filter(Company.email == company.email)
                .filter(Company.id != company_id)
            )
            if email_result.scalars().first():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A company with this email is already registered."
                )

        if company.phone is not None:
            phone_result = await db.execute(
                select(Company)
                .filter(Company.phone == company.phone)
                .filter(Company.id != company_id)
            )
            if phone_result.scalars().first():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A company with this phone number is already registered."
                )

        for key, value in company.dict().items():
            if value is not None:
                setattr(db_company, key, value)
        await db.commit()
        await db.refresh(db_company)
        
        result = await db.execute(
            select(Company)
            .filter(Company.id == db_company.id)
            .options(selectinload(Company.jobs))
        )
        return result.scalars().first()
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/{company_id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_company(company_id: int,db:AsyncSession = Depends(get_db),current_user = Depends(get_current_user)):
    try:
        result = await db.execute(select(Company).filter(Company.id == company_id))
        db_company = result.scalars().first()
        if not db_company:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
        await db.delete(db_company)
        await db.commit()
        return {"detail": "Company deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

#@router.get("/")
#def read_company():
#    return {"company": "Company root"}
#
#@router.get("/{company_id}")
#def read_company(company_id: int):
#    return {"company_id": company_id}