FROM python:latest

WORKDIR /usr/bin/app
COPY ./requirements.txt /usr/bin/app
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD [ "flask", "--app", "run.py", "run","--host" , "0.0.0.0"]