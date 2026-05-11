# Используем лёгкий nginx
FROM nginx:alpine

# Удаляем дефолтную страницу nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем файлы сайта из папки dist
COPY dist/ /usr/share/nginx/html/

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
