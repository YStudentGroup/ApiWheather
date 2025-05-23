# Utilise une image Node officielle légère
FROM node:22.1.0-slim

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

# Exposition du port de l’API
EXPOSE 3001

# Démarrage API
CMD ["npm", "run", "start:dev"]
