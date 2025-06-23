FROM node:22.15.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Instala Angular CLI globalmente (caso necessário)
RUN npm install -g @angular/cli

# Exponha a porta padrão do Angular
EXPOSE 4200

# Executa a aplicação Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]

