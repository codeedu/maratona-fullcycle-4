<p align="center">
  <a href="https://maratona.fullcycle.com.br/" target="blank"><img src="http://maratona.fullcycle.com.br/static/site/img/logo-fullcycle.png"/></a>
</p>

## Descrição

Maratona FullCycle 4.0

Microsserviço Frontend - CodeSlack com React.js

## Rodar a aplicação

#### Crie os containers com Docker

```bash
$ docker-compose up
```

#### Accesse a documentação da API no browser

```
http://host.docker.internal:3001
```

### Importante

É necessário regerar/pegar o client_secret gerado no painel administrativo e sobreescrever pelo que está na variável **KEYCLOAK_JSON** no .env da aplicação Nest.js e da aplicação React.js.

Por precaução, após fazer isto, reinicie os containers das aplicações Nest.js e React.js
