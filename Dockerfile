# Build aşaması
# Uyumluluk sorunlarını gidermek için daha geniş kapsamlı node:18 imajını kullanıyoruz.
FROM node:18 AS builder
WORKDIR /app

# Sadece package.json ve package-lock.json'ı kopyalayıp bağımlılıkları yüklüyoruz.
COPY package*.json ./
RUN npm install

# next.config.js, tailwind.config.js ve tüm proje dosyalarını kopyala
COPY . .

# Next.js uygulamasını üretim için derle
RUN npm run build

# Çalıştırma aşaması
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Sadece uygulamanın çalışması için gerekli dosyaları kopyala
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
# Tailwind CSS kullanıldığı için bu dosyayı da kopyalamak önemlidir.
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js

EXPOSE 3000

# Üretim sunucusunu başlat
CMD ["npm", "start"]