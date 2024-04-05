# S.O.L.I.D

## D - Dependency Invertion Principle

Nosso arquivo `register.ts` é responsavel por realizar a regra de negócio de cadastro de usuário
dentro de nossa aplicação.

Abaixo vemos que neste arquivo iniciamos uma `Interface RegisterUserBodyParams` que é responsável por
informar para nossa função a tipagem dos parametros que chegaram do corpo de nossa requisizão vindas do controller.

Estes parametros estão sendo passados para dentro de uma instancia da classe `UserRepository`
Localizada dentro do diretório `Repository`.

```ts
interface RegisterUserBodyParams {
  name: string,
  email: string,
  password: string;
}

export async function registerUserUseCase({ name, email, password }: RegisterUserBodyParams): Promise<void> {
  const user = new UserRepository();
  await user.create({
    name,
    email,
    password_hash: encryptPassword(password)
  });
}
```

Esta classe contem um metodo chamado `create` que utiliza da biblioteca `Prisma` para fazer a interacao com
nosso banco de dados.

```ts
export class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    });
  }
}
```

Ou seja, se modificarmos o arquivo `createUser.repository.ts` dentro de nosso diretório `Repository`
toda a funcionalidade dentro de nosso arquivo `register.ts` se torna inútil.
Logo, podemos entender que o conteúdo do arquivo `register.ts`
é dependente do conteúdo do arquivo `createUser.repository.ts`

</hr>

Entendendo que existe uma dependência entre arquivos, podemos utilizar o principio de inversão de dependencias.

Veremos a seguir como podemos fazer isso:

Primeiro, precisamos desacoplar a interacao com a biblioteca `Prisma` de dentro de nossa função.
Faremos isso passando os parametros necessarios para a percistencia do banco atravez de um constructor.
Para isso precisamos transaformar o conteúdo dentro de `register.ts` uma classe.
Veremos:

```ts
interface RegisterUserBodyParams {
  name: string,
  email: string,
  password: string;
}

export class RegisterUser {
  private userRepository: any // vamos mudar esta tipagem nas explicações seguintes
  constructor(userRepository: any){ // vamos mudar esta tipagem nas explicações seguintes
    this.userRepository = userRepository
  }

    async execute({ name, email, password }: RegisterUserBodyParams): Promise<void> {
      
      await this.userRepository.create({
        name,
        email,
        password_hash: encryptPassword(password)
    });
  }
}
```

Resumo do código acima:
Transformamos a função `registerUserUseCase` em um metodo de classe chamado `execute`
A responsabilidade deste metodo não mudou.

Continuamos utilizando a interface `RegisterUserBodyParams` informando os parametros
que o objeto dentro do metodo `execute` deve ter.
O metodo `execute` deve ser o único metodo desta classe.

adicionamos um constructor que sera responsável por receber no momento que for instanciado
os parametros do corpo da requisicao que queremos persistir no DB.

Não precisamos mais instanciar a classe `UserRepository`
Ao inves disso, utilizaremos o parametro criado `userRepository`
>Note:
>
>* Parametro: userRepository
>* Classe: UserRepository
>

ultilizamos o mesmo nome da classe para o parametro por que passaremos as funcionalidades dessa classe
para dentro do constructor.

desta forma nosso `Service` já não conhece mais o `Repository`

Porém nossa aplicação ainda não funciona como deveria, vamos continuar a seguir:

Abaixo o código fonte de nosso arquivo `register.controller.ts`
Este arquivo esta responsável por:

* Receber o corpo da requisicao que queremos persistir em DB
* Tratar a comunicacao com o `Service`.
  * Em caso de sucesso o corpo da requisicao é passado para nosso `Service`
    * Retorna status 201 (criado com sucesso)
  * Em caso de falha ele retorna status 409 (confito)

vamos as alterações no arquivo:

```ts
export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = usersSchemaValidateBody.parse(request.body);

  const userRepository = new UserRepository();
  const createUser = new RegisterUser(userRepository);

  try {
    await createUser.execute({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
```

Resumo do código acima:
Instanciamos a classe `RegisterUser` do arquivo `register.ts`
Instanciamos a classe `UserRepository` do arquivo `createUser.repository.ts`

Passamos a instancia de `UserRepository` como parametro constructor para dentro de `RegisterUser`
A partir de agora passaremos o corpo da requisição atravez do execute dentro da instancia `createUser`

</hr>

Agora se quisermos podemos usar outras bibliotecas ao invez do prisma,
podemos fazer alterações na aplicação sem que precisemos reconfigurar todo o fluxo novamente.
A manutencao da aplicação se torna mais facil

Porém para que nossa refatoração esteja completa, precisaremos realizar uma última alteração:

Ao tentarmos executar o metodo create, acaboamos por cair no erro 409
pois nossa aplicação tenta enviar o corpo da requisicao para nosso arquivo de `createUser.repository.ts`
mas o metodo `create` não é reconhecido.

Para isso preciamos alterar a tipagem em `userRepository` de `any` para `UserRepository`
No entanto, se fizermos desta forma nosso arquivo `register.ts` voltara a ter conhecimento de nosso Repository

```ts
export class RegisterUser {
  private userRepository;
  constructor(userRepository: any){ // vamos mudar esta tipagem nas explicações seguintes
    this.userRepository = userRepository;
  }

    async execute({ name, email, password }: RegisterUserBodyParams): Promise<void> {
      
      await this.userRepository.create({
        name,
        email,
        password_hash: encryptPassword(password)
    });
  }
}
```

Para que isso não aconteça, podemos usar uma interface.
Dentro do diretório `repository` criamos outro diretório chamado `IRepository`
Neste diretório colocaremos todas as interfaces de repositórios
Neste caso como estamos usando prisma:

```ts
import { Prisma, User } from '@prisma/client';

export interface IPrismaUsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
}
```

Em nosso arquivo de persistencia:

```ts
import { Prisma } from '@prisma/client';
import { prisma } from '@src/lib/prisma';
import { IPrismaUsersRepository } from './IRepositories/prismaUsers.repository';
export class UserRepository implements IPrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
```

Em nosso arquivo de services:

```ts
export class RegisterUser {
  private userRepository;
  constructor(userRepository: IPrismaUsersRepository) {
    this.userRepository = userRepository;
  }
```

Implementamos a Inversão de Dependencia.
Pronto! Nossa aplicação voltou a funcionar normalmente.
