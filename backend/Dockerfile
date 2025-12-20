FROM node:18-alpine

# Install openssl for Prisma
RUN apk -U upgrade && apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

# Use npm ci for faster, reliable installs (requires package-lock.json)
RUN npm ci

COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "index.js"]
