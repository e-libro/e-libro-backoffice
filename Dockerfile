FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ENV VITE_API_URL=https://api.e-libro.app/v1

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
