# Build Stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build arguments for environment variables
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_BACKEND_URL

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
