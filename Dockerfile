# Usando uma imagem base do Node para build (se necessário)
FROM node:18 AS build-stage

WORKDIR /app

# Copia os arquivos da aplicação
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Imagem final usando Nginx
FROM nginx:alpine

# Copia o nginx.conf para a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos buildados da etapa anterior para a pasta padrão do nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 8040

CMD ["nginx", "-g", "daemon off;"]
