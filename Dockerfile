FROM node:22.15.1

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o projeto
COPY . .

# Garante que o Angular CLI esteja instalado (caso não esteja globalmente)
RUN npm install -g @angular/cli

# Exponha a porta interna do Angular (padrão: 4200)
EXPOSE 4200

# Comando para rodar o Angular com ng serve ouvindo em 0.0.0.0
CMD ["ng", "serve", "--host", "0.0.0.0"]

