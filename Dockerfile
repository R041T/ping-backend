# syntax=docker/dockerfile:1

FROM amd64/node:alpine
WORKDIR /app
COPY package.json ./ 
RUN npm install -g typescript \
&& npm install
COPY . .
RUN npm run build


FROM amd64/node:alpine
ENV NODE_ENV production
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY --from=0 /app/public .
EXPOSE 8081
CMD ["node", "app.js"]
