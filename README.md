# NodeJS CRUD com PostgreSQL e Prisma

Este projeto é uma API backend construída com NodeJS e PostgreSQL, utilizando Prisma como ORM. A aplicação inclui um CRUD para gerenciar jogadores de futebol, com funcionalidades extras como ranqueamento e divisão de equipes.

## Pré-requisitos

Certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados no seu sistema.

## Configuração e Execução do Projeto

### Passos para Instalação e Inicialização:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/victorhdsp/spotmetrics.git
   cd spotmetrics```

2. **Execute o Docker Compose**:
    - docker-compose up

3. **Rotas**:
   - As rotas da aplicação se iniciam em:
      - http://localhost:3000/v1/
   - Sendo a documentação:
      - http://localhost:3000/v1/docs

## Anotações sobre o projeto

### Balanceamento

A lógica de balanceamento dos times é a seguinte, crio 2 times aleatórios e pego mais fraco deles, então vejo quais são os jogadores que não estão sendo utilizados, deleto todos os jogadores mais fracos que o jogador mais fraco do time selecionado, então ordeno os 2 por ordem de ranking (do menor para o maior), troco o jogador mais fraco do não utilizado pelo mais fraco do selecionado e repito o processo até ficar balanceado ou os jogadores não utilizados acabarem.

Se acontecer dos jogadores não utilizados acabarem e ainda não estiver balanceado pego o jogador mais forte do outro time e troco pelo mais fraco do time selecionado com um limite de X vezes (sendo X metado do tamanho do time), para não criar um loop infinito.

### Logs do projeto

Completei tudo que foi pedido no sentido de fazer o CRUD, bem como o ranqueamento e a divisão de times, utilizando o swagger para a documentação e nodejs no backend, utilizei o Prisma para construir o banco de dados coloquei a migration que ele usou dentro da raiz do projeto (gerei uma nova para ficar 1 migration só, mas se quiser ver em ordem de criação está na pasta prisma como "-bkp", o schema tambem está lá).

Tiver alguns problemas, principalmente em relação aos testes, não estou 100% acostumado com testes em backend e não soube lidar com o banco de dados, não quis fazer testes unitários porque boa parte das funções existem por arquitetura e organização, já que ela só chama a proxima função sem modificar ou tratar nada, preferi então fazer um teste de integração e ai que surgiu o problema eventualmente fica alguma coisa no banco de dados e vai falhar 1 dos testes, então precisa rodar novamente para que ele limpe o banco e todos passem (resolvi deixar dessa forma porque eu fiz os testes antes de outras partes mandatórias do projeto e poderia não dar tempo de resolver).