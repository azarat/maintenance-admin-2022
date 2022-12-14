FROM 047590332772.dkr.ecr.eu-central-1.amazonaws.com/nodejs:16

WORKDIR /usr/src/app

ENV PORT=8087
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN
ARG DEFAULT_STATION
ENV DEFAULT_STATION=$DEFAULT_STATION
ARG SECRET_ID
ENV SECRET_ID=$SECRET_ID
ARG AWS_REGION
ENV AWS_REGION=$AWS_REGION
ARG API_HOST
ENV API_HOST=$API_HOST

COPY package*.json ./
COPY .npmrc ./

RUN npm install
RUN npm run build

COPY . .

EXPOSE 8087

CMD [ "npm", "start" ]