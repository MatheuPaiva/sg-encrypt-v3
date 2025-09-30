# Multi-stage Dockerfile for building and serving a Vite React app with Nginx

# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Build-time variables for Vite (provided via --build-arg in EasePanel)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
# Expose them to the build environment so Vite can read them
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Install deps using lockfile for reproducible builds
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest and build
COPY . .
# If you need a custom base path (subpath deployment), set: VITE_BASE=/subpath
# ENV VITE_BASE=/
RUN npm run build

# 2) Runtime stage (static files served by Nginx)
FROM nginx:alpine AS runner

# Remove default config and add SPA-friendly config (history fallback to index.html)
RUN rm /etc/nginx/conf.d/default.conf
RUN printf 'server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n\n  # History API fallback for client-side routing\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n\n  # Cache-busting for built assets\n  location /assets/ {\n    add_header Cache-Control "public, max-age=31536000, immutable";\n  }\n}\n' > /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]