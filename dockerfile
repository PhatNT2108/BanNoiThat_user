# ----- Giai đoạn 1: Build ứng dụng React -----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ----- Giai đoạn 2: Tạo image production với Nginx -----
FROM nginx:stable-alpine
# Copy các file tĩnh đã được build từ giai đoạn 1
COPY --from=builder /app/build /usr/share/nginx/html
# Copy file cấu hình Nginx cho React
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Mở cổng 80 để nhận request từ Nginx-Proxy
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]