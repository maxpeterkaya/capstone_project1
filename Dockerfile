FROM node:lts-alpine AS builder

RUN apk add --no-cache curl git npm
WORKDIR /build

COPY package.json /build
RUN npm i
COPY . /build
RUN npm run build

RUN curl -L -o /usr/bin/web-proxy https://github.com/maxpeterkaya/web-proxy/releases/latest/download/web-proxy_linux_amd64 && chmod +x /usr/bin/web-proxy

FROM scratch

COPY --from=builder /build/dist /app
COPY --from=builder /usr/bin/web-proxy /usr/bin/web-proxy

EXPOSE 3000

CMD ["/usr/bin/web-proxy", "-static", "-static-dir", "/app"]