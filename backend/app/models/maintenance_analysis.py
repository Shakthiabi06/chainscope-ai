from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class MaintenanceAnalysis(Base):
    __tablename__ = "maintenance_analysis"

    id = Column(Integer, primary_key=True, index=True)
    library_name = Column(String, unique=True, nullable=False)
    last_updated = Column(Integer)
    deprecated = Column(Boolean)
    security_policy = Column(Boolean)
    risk = Column(String)
    reason = Column(String)