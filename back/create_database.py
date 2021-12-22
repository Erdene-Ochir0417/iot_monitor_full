from typing import List
from sqlalchemy.orm import Session

import models
from database import SessionLocal, engine
from sqlalchemy_utils import database_exists, create_database

if not database_exists(engine.url):
    print("Creating database....")
    create_database(engine.url)
    table_exist = True


models.Base.metadata.create_all(bind=engine)