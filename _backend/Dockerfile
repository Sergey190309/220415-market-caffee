FROM python:3.9.0-slim-buster

# The below is convention
# RUN mkdir -p /usr/src
WORKDIR /backend

# update and upgrade the instance
RUN apt update && \
    apt -y upgrade && \
    apt install -y gcc libpcre3 libpcre3-dev

# install application used for productions
# RUN apt install -y python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools


# RUN pip install wheel

# Copy all project to working directory.
COPY . /backend

# update pip
RUN pip install -U pip

# install packages from local machine
RUN pip install --no-cache-dir -r requirements.txt

# instal packages for wsgi
RUN pip install --no-cache-dir uwsgi


# The file with python packages should be installed.
# COPY requirements.txt .

EXPOSE 5000

# ENTRYPOINT [ "python" ]
# CMD [ "app.py" ]


ENV FLASK_APP=run.py

# CMD ["flask", "run", "--host=0.0.0.0"]

CMD [ "uwsgi", "uwsgi.ini" ]

# command to build image:
# d build --rm -t backend .
# command to run image:
# d run --rm -ti -p 3000:3000 -v $(pwd):/backend backend
