from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from apiflask import APIFlask, Schema, fields, HTTPError
from apiflask.validators import Length
import re

class ParticipantIn(Schema):
    first_name = fields.String(required=True, validate=[Length(3)])
    last_name = fields.String(required=True, validate=[Length(3)])
    participation = fields.String(required=True)

class InvalidName(HTTPError):
    message = "Seu nome deve conter pelo menos três e apenas letras!"
    status_code = 400

class InvalidParticipationAmount(HTTPError):
    message = "Não há espaço suficiente restante para essa contribuição!"
    status_code = 400

def create_app():
    app = APIFlask(__name__)
    CORS(app)
    
    app.config['SECRET_KEY'] = "cool_developer" 
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://admin:1234@localhost:5433/itau_dashboard"

    try:
        db = SQLAlchemy(app)
        migrate = Migrate(app, db)

        class Participant(db.Model):
            __tablename__ = 'participant'
            id = db.Column(db.Integer, primary_key=True)
            first_name = db.Column(db.String(128), nullable=False)
            last_name = db.Column(db.String(128), nullable=False)   
            participation = db.Column(db.Float(), nullable=False)

        with app.app_context():
            db.create_all()

        print("Database connected and ready to receive data!")
    except Exception:
        print("Failed to connect database!")


    def check_chart_available(space):
        participants = get_all_participants().get_json()

        filled_chart = 0
        for participant in participants:
            filled_chart += float(participant["participation"])

        empty_space = 100 - filled_chart
        hasAvailable = True if (empty_space - space) >= 0 else False

        return hasAvailable
    
    @app.route("/create/participant", methods=["POST"])
    @app.input(ParticipantIn, arg_name="participant_information")
    def create_participant(participant_information):
        """

        first_name
        last_name
        participation

        """     
        user: dict = participant_information

        hasChartSpace = check_chart_available(float(user["participation"]))
        if not hasChartSpace:
            raise InvalidParticipationAmount()

        first_name_pattern = re.compile("^[a-zA-ZÀ-ÿ]+$")
        isValid = first_name_pattern.match(user["first_name"])
        if not isValid:
            raise InvalidName()
        
        last_name_pattern = re.compile("^[a-zA-Z\s]+$")
        isValid = last_name_pattern.match(user["last_name"])
        if not isValid:
            raise InvalidName()

        participant = Participant(**user)
        add_participant =  db.session.add(participant)
        db.session.commit()

        # print(data)

        return {"message": "Participante cadastrado!", "status_code": 200}
    
    @app.route("/participants/all")
    def get_all_participants():
        participants_objects = db.session.execute(db.select(Participant).filter_by()).scalars().all()

        participants_response = jsonify([
            {
                "first_name":participant.first_name,  
                "last_name": participant.last_name,
                "participation": participant.participation
            } for participant in participants_objects])
        
        return participants_response
    
    @app.delete("/participant/delete")
    def delete_participant_by_name():
        name = request.get_json()["first_name"]

        delete_participant = db.session.delete(db.session.execute(db.select(Participant).filter_by(first_name=name)).scalar())
        db.session.commit()
        return "deletado"
    return app

if __name__ == "__main__":
    create_app()