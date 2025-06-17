# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]