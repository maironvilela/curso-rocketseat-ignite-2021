import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = process.env.SEEDS_ADMIN_ID;
  const password = process.env.SEEDS_ADMIN_PASSWORD;
  const email = process.env.SEEDS_ADMIN_EMAIL;

  const query = `INSERT INTO USERS(id, name, email, password, is_admin, driver_license,created_at, updated_at)
VALUES('${id}', 'admin', '${email}','${password}',true,'xxxxxxx', now(), now())
`;

  await connection.query(query);
  await connection.close();
}

create().then(() => {
  console.log("Admin user created");
});
