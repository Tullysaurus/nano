FROM node:20-alpine

WORKDIR /app

COPY package.json ./

# node-gyp toolchain for native deps
RUN apk add --no-cache python3 make g++ \
 && npm install --omit=dev

COPY server.mjs ./

ENV HOST=0.0.0.0
ENV PORT=4000
ENV WISP_PATH=/wisp/

EXPOSE 4000
CMD ["npm", "run", "start"]
