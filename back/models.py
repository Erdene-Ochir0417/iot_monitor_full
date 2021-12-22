from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    password = Column(String)
    admin = Column(Boolean)
    email = Column(String)
    created_at = Column(Integer)
    image_url = Column(String)

    controller = relationship("Microcontroller", backref="users")

class Microcontroller(Base):
    __tablename__ = "microcontrollers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(Integer)
    name = Column(String)
    type = Column(String)
    uuid = Column(String)
    send_second = Column(Integer)
    status = Column(Boolean)

    sensor = relationship("Sensor", backref="microcontrollers")


class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)
    controller_id = Column(Integer, ForeignKey("microcontrollers.id"))
    name = Column(String)
    uuid = Column(String)
    status = Column(Boolean)

    sensor_value = relationship("SensorValue", backref="sensors")

class SensorValue(Base):
    __tablename__ = "sensor_values"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id"))
    value = Column(Integer)
    created_at = Column(Integer)