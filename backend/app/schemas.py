from pydantic import BaseModel
from typing import Optional

class ContactCreate(BaseModel):
    name: str
    email: Optional[str] = None
    subject: str
    content: str