from sqlalchemy.orm import Session
from . import models, schemas

def create_contact(db: Session, contact: schemas.ContactCreate):
    existing_person = db.query(models.Person).filter(models.Person.email == contact.email).first()
    if existing_person:
        existing_person.name = contact.name
        person = existing_person
    else:
        person = models.Person(name=contact.name, email=contact.email)
        db.add(person)
    db.flush()

    message = models.Message(
        subject=contact.subject,
        content=contact.content,
        person_id=person.id
    )
    db.add(message)
    db.commit()
    db.refresh(person)
    return person