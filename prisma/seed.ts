import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@gmail.com' },
    update: {},
    create: {
      name: 'User1Name',
      lastName: 'User1Lastname',
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'safepassword123',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@gmail.com' },
    update: {},
    create: {
      name: 'User2Name',
      lastName: 'User2Lastname',
      username: 'user2',
      email: 'user2@gmail.com',
      password: 'safepassword123',
    },
  });

  const article1 = await prisma.article.upsert({
    where: { title: 'Title 1' },
    update: { userId: user1.id },
    create: {
      title: 'Title 1',
      body: 'Body1',
      description: 'Description1',
      published: false,
    },
  });

  const article2 = await prisma.article.upsert({
    where: { title: 'Title 2' },
    update: { userId: user2.id },
    create: {
      title: 'Title 2',
      body: 'Body2',
      description: 'Description2',
      published: false,
    },
  });

  console.log(article1, article2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
