<p align="center">
  <a href="https://maratona.fullcycle.com.br/" target="blank"><img src="http://maratona.fullcycle.com.br/static/site/img/logo-fullcycle.png"/></a>
</p>

## Descrição

Maratona FullCycle 4.0

Microsserviço de autenticação com Keycloak

## Rodar a aplicação

#### Altere seu /etc/hosts ou C:\Windows\System32\drivers\etc\hosts

```
127.0.0.1 host.docker.internal
```

#### Crie os containers com Docker

```bash
$ docker-compose up
```

#### Accesse no browser

```
http://host.docker.internal:8080
```

### Importe o realm discord

Na raiz do repositório Git há um arquivo chamado de realm-export.json, importe-o no admin do Keycloak para não precisar criar o realm, nem os clientes.

É necessário regerar/pegar o client_secret gerado no painel administrativo e sobreescrever pelo que está na variável **KEYCLOAK_JSON** no .env da aplicação Nest.js e da aplicação React.js.

Por precaução, após fazer isto, reinicie os containers das aplicações Nest.js e React.js
