from sqlalchemy import Integer, String, ForeignKey, Column
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Person(Base):
    __tablename__ = "people"
    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=True)

    messages = relationship("Message", back_populates="person")

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, nullable=False)
    subject = Column(String, nullable=False)
    content = Column(String, nullable=False)
    person_id = Column(UUID(as_uuid=True), ForeignKey("people.id"))

    person = relationship("Person", back_populates="messages")