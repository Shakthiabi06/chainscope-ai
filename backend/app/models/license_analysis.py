from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class LicenseAnalysis(Base):
    __tablename__ = "license_analysis"

    id = Column(Integer, primary_key=True, index=True)
    library_name = Column(String, unique=True, nullable=False)
    license_name = Column(String, nullable=False)
    risk = Column(String, nullable=False)
    compatible = Column(Boolean, nullable=False)
    recommendation = Column(String, nullable=False)