import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createCostumeSeed() {
  const newCostume = await prisma.figurino.create({
    data: {
      id: 99,
      description: "camiseta preta basica",
      quantity: 20,
      size: "M",
      available_quantity: 20,
    },
  });

  console.log("Figurino criado com sucesso!", newCostume);
}

async function createClientSeed() {
  const clientAlreadyExists = await prisma.cliente.findUnique({
    where: {
      email: "johndoe@email.com",
    },
  });

  if (!clientAlreadyExists) {
    const newClient = await prisma.cliente.create({
      data: {
        id: 99,
        name: "John Doe",
        email: "johndoe@email.com",
        phone: "111111111",
      },
    });
    console.log("Cliente criado com sucesso!", newClient);
  } else {
    console.log("Cliente ja existe no banco de dados");
  }
}

async function createUserSeed() {
  const adminAlreadyExists = await prisma.usuario.findUnique({
    where: {
      email: "admin@email.com",
    },
  });

  if (!adminAlreadyExists) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const adminUser = await prisma.usuario.create({
      data: {
        firstName: "usuario",
        lastName: "admin",
        email: "admin@email.com",
        phone: "11111111111",
        password: hashedPassword,
      },
    });

    console.log("Usuário admin criado com sucesso!", adminUser);
  } else {
    console.log("Usuário admin ja encontrado");
  }
}

async function createLoanSeed() {
  const newLoan = await prisma.emprestimo.create({
    data: {
      costumeId: 99,
      clientId: 99,
      quantity: 1,
    },
  });

  console.log("Emprestimo criado com sucesso!", newLoan);
}

async function seed() {
  await createCostumeSeed();
  await createUserSeed();
  await createClientSeed();
  await createLoanSeed();
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Erro ao rodas o seed", e);
    prisma.$disconnect();
    process.exit(1);
  });
