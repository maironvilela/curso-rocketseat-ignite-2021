/_ cSpell:disable _/

# RENTX-API

## Diagram de classes

![class diagram](https://user-images.githubusercontent.com/4884154/118716484-422f4300-b7fb-11eb-9ce5-12e00181a3c7.png)

## Requisitos do Sistema

### Cadastro de carro

> #### Requisitos Funcionais
>
> [x] Deve ser possível cadastrar um novo carro
> [] Deve ser possível listar todas as categorias

> #### Requisitos não Funcionais
>
> [ ]

> #### Regras de negocio
>
> [x] Não deve ser possível cadastrar um carro com uma placa já existente
> [x] deve ser possível cadastrar o veiculo com o status disponível
> [x] Não deve ser possível cadastar o veiculo com uma categoria inexistente
> [x] O usuário responsável pelo cadastro deve ser um administrador

### Listagem dos carro

> #### Requisitos Funcionais (RF)
>
> [x] Deve ser possível listar todos os carros disponíveis
> [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca
> [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria
> [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro

> #### Regras de negocio
>
> [ ] O usuario não precisa estar logado no sistema

### Cadastro Especificação

> #### Requisitos Funcionais
>
> [x] Deve ser possível cadastrar uma especificação para um carro

> #### Regras de negocio
>
> [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado
> [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
> [x] O usuário responsável pelo cadastro deve ser um administrador

### Listar Especificação

> #### Requisitos Funcionais

> [ ] Deve ser possível listar todas as especificações
> [ ] Deve ser possível listar todos os carros

### Cadastro de Imagens do carro

> #### Requisitos Funcionais
>
> [ ] Deve ser possível cadastrar a imagem do carro
> [ ] Deve ser possível listar todos os carros

> #### Requisitos Não Funcionais
>
> [ ] Utilizar o multer para o upload dos arquivos

> #### Regras de negocio
>
> [ ] O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
> [ ] O usuário responsável pelo cadastro deve ser um administrador

### Aluguel

> #### Requisitos Funcionais

> [x] Deve ser possível cadastrar um aluguel

> #### Regras de Negócio

> [x] O aluguel deve ter duração mínima de 24 hora
> [x] Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo usuário
> [x] Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo carro
> [x] Ao realizar um aluguel, o status do carro deverár ser alterado para indisponível

### Devolução do carro

#### Requisitos Funcionais

> [x] Deve ser possível realizar a devolução de um carro

#### Regras de Negócios

> [] O usuario deve estar logado na aplicação
> [x] Se o Carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa
> [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
> [x] Ao realizar a devolução, o usuario deve ser liberado para outro aluguel
> [x] Ao realizar a devolução, deverá ser calculado o total do aluguel
> [x] Caso o horario de devolução seja superior ao horario previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso
> [x] Caso haja multa, deverá ser somado ao total do aluguel


### Listagem de Alugueis para usuário

#### Requisitos Funcionais
> [] Deve ser possível realizar a busca de todos os alugueis para o usuário
#### Regras de Negocio
> [] O usuário deve estar logado na aplicação


### Recuperar Senha
#### Requisitos Funcionais
> [] Deve ser possível o usuário recuperar a senha informando o e-mail
> [] O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
> [] O usuário deve conseguir inserir uma nova senha
#### Regras de Negocio
> [] O usuário precisa informar uma nova senha
> [] O link enviado para a recuperação deve expirar em 3 horas