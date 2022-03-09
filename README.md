# teste-konatus

- Java 17
- Node 16.14.0 LTS
- PostgreSQL 14

Antes da build do projeto deve-se:
1. Instalar o node [Node.js](https://nodejs.org/en/);

Após a instalação, executar o seguinte comando:

```
npm install
```

2. Criar um novo database com nome testekonatus com a login role konatus;

- url: jdbc:postgresql://localhost:5432/testekonatus
- username: konatus
- password: konatus

3. Após a instalação das dependências, mudar para a pasta api e executar:

```
.\mvnw spring-boot:run
```

Na pasta client executar:
```
npm start
```

4. Na execução do liquibase é criado um usuário para acessar o sistema com as seguintes credenciais:

- username: soaresdss
- password: 123456