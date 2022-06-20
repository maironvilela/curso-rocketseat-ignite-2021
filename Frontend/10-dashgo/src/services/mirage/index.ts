/* eslint-disable camelcase */
import faker from 'faker';
import { createServer, Factory, Model, Response } from 'miragejs';

/* Define o tipo de dados que será retornado pela API Fake */
type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

/* Partial - Tipo onde não e necessário repassar todas as informações para o tipo principal (User) que foi definido */
export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        id() {
          return String(faker.datatype.uuid());
        },
        name() {
          return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },

        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200);
    },

    /* Shorthands: Definição dos endpoints padrao (CRUD) para o modelo definido */
    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = Number(pageStart) + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd,
        );

        console.log(users);

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });
      this.post('/users');

      this.namespace = '';

      // Todas chamadas passam pelo mirage. Caso nao detectadas, as requisições passam direto
      this.passthrough();
    },
  });

  return server;
}
