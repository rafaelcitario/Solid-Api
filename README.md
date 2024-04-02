# App

Gympass style app.

## RF (Requisitos funcionais)

- [ ] Deve ser possivel o usuário se cadastrar
- [ ] Deve ser possivel se autenticar
- [ ] Deve ser possivel obter o perfil de um usário logado
- [ ] Deve ser possivel obter o número de check-ins realizado pelo usuário logado
- [ ] Deve ser possivel o usuário obter o seu historico de check-ins
- [ ] Deve ser possivel o usuário buscar academias próximas
- [ ] Deve ser possivel o usuário buscar academias pelo nome
- [ ] Deve ser possivel o usuário realizar check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuário
- [ ] Deve ser possivel cadastrar uma academia

## RN

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não deve poder realizar dois check-ins no mesmo dia
- [ ] O usuário não deve poder realizar check-in se não estiver à <=100m da academia
- [ ] check-in só pode ser validade até 20 minutos após criado
- [ ] check-in só pode ser validade por administradores
- [ ] Academias podem apenas ser cadastradas por administradores

## RNF

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação deve estar persistido em um banco de dados postgreSQL
- [ ] todas as listas de dados precisam estar paginadas com 20 items por página
- [ ] O usuário deve ser idêntificado por um JWT
