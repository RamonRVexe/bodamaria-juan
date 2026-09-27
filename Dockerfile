# ==========================================
# BUILD STAGE
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar únicamente archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar proyecto
COPY . .

# Construir Astro
RUN npm run build


# ==========================================
# SERVE STAGE
# ==========================================
FROM nginx:alpine

# Copiar el resultado del build
COPY --from=build /app/dist /usr/share/nginx/html

# Puerto HTTP
EXPOSE 80

# Ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]