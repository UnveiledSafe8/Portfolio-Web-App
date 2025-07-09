from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

import os

POSTGRES_CONTAINER = os.getenv("POSTGRES_CONTAINER")
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")

engine = create_engine(f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_CONTAINER}:5432/{POSTGRES_DB}", echo=True)

Base = declarative_base()

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)