# Arquitetura da Aplicação

Este projeto é composto por três partes principais: uma API backend em Node.js, um sistema de processamento assíncrono com background jobs e workers, e uma aplicação web frontend em React.

![Arquitetura](./arquitetura.PNG)

---

## 🧱 1. Backend - API Node.js

A primeira parte da aplicação é uma API desenvolvida em **Node.js** utilizando o framework **Express.js**.

### 🏗️ Arquitetura em Camadas

A API segue uma arquitetura em camadas, separando bem as responsabilidades:

- **Application**: contém os casos de uso e a lógica de orquestração.
- **Domain**: define as regras de negócio e entidades do domínio.
- **Data**: responsável pela persistência e acesso ao banco de dados.

### 📦 Funcionalidade

A API é responsável por expor endpoints utilizados pela aplicação web, além de interagir com o banco de dados para leitura e gravação de dados.

---

## ⚙️ 2. Processamento Assíncrono - Background Jobs e Workers

A segunda parte da aplicação lida com o processamento de dados de forma assíncrona, utilizando o **BullMQ** para gerenciamento de filas e jobs em segundo plano.

### 🔄 Background Job

- Criado utilizando **BullMQ**, o background job é executado em intervalos definidos.
- Esse job consome mensagens de uma **fila SQS (Simple Queue Service)**.
- As mensagens na SQS são enviadas por uma **AWS Lambda**, que é **disparada automaticamente** sempre que uma **nova fatura é adicionada a um bucket S3**.
- Ao processar a mensagem da SQS, o job extrai os dados e os persiste no banco de dados.

### 🧑‍💻 Worker Manual

- Além do background job automático, existe um **worker manual**, responsável por processar arquivos armazenados localmente em uma pasta.
- Ele extrai as informações necessárias de arquivos (como faturas, por exemplo) e salva no banco de dados.

---

## 🖥️ 3. Frontend - Aplicação Web React

A interface web foi desenvolvida utilizando **React**.

### 🧩 Tecnologias Utilizadas

- **React Router DOM v7**: para controle de rotas e navegação.
- **React Query**: para otimização de chamadas à API e cache de dados.
- **Tailwind CSS**: para estilização moderna e responsiva.
- **ShadCN**: para facilitar o uso e personalização de componentes reutilizáveis.

### 🌐 Funcionalidade

A aplicação permite a visualização e interação com os dados processados, oferecendo uma interface amigável para o usuário final.

---

### 🔄 Como Rodar

**WebApp**: Para rodar a aplicação web entre dentro da pasta webapp e rode o comando abaixo.
~~~javascript
  npm run dev
~~~

**Api**: Para rodar a api basta rodar o comando abaixo na pasta raiz.
~~~javascript
  npm run dev
~~~

**Manual Worker**: Para rodar a api basta rodar o comando abaixo na pasta raiz.
~~~javascript
  npm run worker
~~~

Esse script olha para a pasta de faturas.


**Background Job**: Para rodar esse job e necessario esta com o redis up, pois o bullMQ utiliza o redis. Uma vez que o redis esta up rode o comando abaixo.

~~~javascript
  npm run job
~~~

**Docker-compose**: 
- Crie um arquivo .env na raiz do projeto e adicione essas variaveis no arquivo
  

~~~txt

DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/mybills

AWS_REGION=
AWS_SQS_URL=
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
~~~

- Para subir o database e o redis tenha o Docker instalado. Uma vez com Docker instalado rode o comando abaixo.

~~~docker
  docker-compose up -d
~~~

- Agora e necessario aplicar as migrations no banco, tendo as dependencias instaladas, rode:

~~~node
  npx prisma migrate deploy
~~~

---

## ✅ Conclusão

Essa arquitetura garante uma separação clara de responsabilidades, escalabilidade no processamento de dados com filas e jobs, e uma interface moderna e responsiva. A utilização de serviços AWS (S3, SQS, Lambda) permite a automação de processos e integração eficiente com a nuvem.
