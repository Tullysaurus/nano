FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY server.mjs ./

ENV HOST=0.0.0.0
ENV PORT=4000
ENV WISP_PATH=/wisp/

EXPOSE 4000

CMD ["npm", "run", "start"]
