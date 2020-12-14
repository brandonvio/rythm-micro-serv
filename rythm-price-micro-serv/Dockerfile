FROM python:3.8-slim-buster

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install dependencies:
COPY requirements.txt .
RUN pip install -r requirements.txt

# Run the application:
COPY ./src/ ./src
COPY ./app.py .
COPY ./server.py .
COPY .env .
ENTRYPOINT ["python", "app.py"]

# FROM python:3.8 AS compile-image

# RUN python -m venv /opt/venv
# # Make sure we use the virtualenv:
# ENV PATH="/opt/venv/bin:$PATH"

# COPY requirements.txt .
# RUN pip install -r requirements.txt

# COPY ./src .

# FROM python:3.7-slim AS build-image
# COPY --from=compile-image /opt/venv /opt/venv
# ENV PATH="/opt/venv/bin:$PATH"

# ENTRYPOINT [ "python", "./server.py" ]

# COPY setup.py .
# COPY myapp/ .
# RUN pip install .

# FROM python:3.7-slim AS build-image
# COPY --from=compile-image /opt/venv /opt/venv

# # Make sure we use the virtualenv:
# ENV PATH="/opt/venv/bin:$PATH"
# CMD ["myapp"]

# # first stage
# FROM python:3.8 AS builder
# COPY requirements.txt .

# # install dependencies to the local user directory (eg. /root/.local)
# RUN pip install --user -r requirements.txt

# # second unnamed stage
# FROM python:3.8-slim
# WORKDIR /code

# # copy only the dependencies installation from the 1st stage image
# COPY --from=builder /root/.local/bin /root/.local
# COPY ./src .

# # update PATH environment variable
# ENV PATH=/root/.local:$PATH

# ENTRYPOINT [ "python", "./server.py" ]

# FROM python:3-alpine
# WORKDIR /usr/src/app
# EXPOSE 8000
# COPY requirements.txt .
# RUN pip install -r requirements.txt
# COPY src/server.py .
# ENTRYPOINT ["python", "./server.py"]