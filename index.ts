import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  const tasks = [
    await prisma.task.create({ data: {} }),
    await prisma.task.create({ data: {} }),
    await prisma.task.create({ data: {} }),
    await prisma.task.create({ data: {} }),
    await prisma.task.create({ data: {} }),
  ];

  const allTasks = await prisma.task.findMany();

  const pagedTasks = await prisma.task.findMany({
    orderBy: [{ completedAt: "desc" }, { id: "asc" }],
    take: 2,
    cursor: { id: tasks[1].id },
    skip: 1,
  });

  console.log("all tasks\n", allTasks);

  console.log("paged tasks\n", pagedTasks);
}
main().then(() => process.exit());
