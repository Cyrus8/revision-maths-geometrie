import { PrismaClient } from "@prisma/client";
import { CHAPTERS, THEMES } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  const classLevel = await prisma.classLevel.upsert({
    where: { slug: "seconde" },
    update: { name: "Seconde", order: 0, active: true },
    create: { slug: "seconde", name: "Seconde", order: 0, active: true },
  });

  let problemCount = 0;

  for (const theme of THEMES) {
    const themeRow = await prisma.theme.upsert({
      where: { classLevelId_slug: { classLevelId: classLevel.id, slug: theme.slug } },
      update: { name: theme.name, description: theme.description, order: theme.order },
      create: {
        classLevelId: classLevel.id,
        slug: theme.slug,
        name: theme.name,
        description: theme.description,
        order: theme.order,
      },
    });

    const chaptersForTheme = CHAPTERS.filter((chapter) => chapter.themeSlug === theme.slug);

    for (const chapter of chaptersForTheme) {
      const chapterRow = await prisma.chapter.upsert({
        where: { themeId_slug: { themeId: themeRow.id, slug: chapter.slug } },
        update: { name: chapter.name, description: chapter.description, order: chapter.order },
        create: {
          themeId: themeRow.id,
          slug: chapter.slug,
          name: chapter.name,
          description: chapter.description,
          order: chapter.order,
        },
      });

      for (const [index, problem] of chapter.problems.entries()) {
        const questionsData = problem.questions.map((question, questionIndex) => ({
          order: questionIndex,
          type: question.type,
          statement: question.statement,
          points: question.points,
          difficulty: question.difficulty,
          data: question.data,
          hints: question.hints,
          solution: question.solution,
          explanation: question.explanation,
        }));

        await prisma.problem.upsert({
          where: { chapterId_slug: { chapterId: chapterRow.id, slug: problem.slug } },
          update: {
            title: problem.title,
            intro: problem.intro,
            difficulty: problem.difficulty,
            order: index,
            published: true,
            questions: { deleteMany: {}, create: questionsData },
          },
          create: {
            chapterId: chapterRow.id,
            slug: problem.slug,
            title: problem.title,
            intro: problem.intro,
            difficulty: problem.difficulty,
            order: index,
            published: true,
            questions: { create: questionsData },
          },
        });
        problemCount += 1;
      }
    }
  }

  console.log(`Seed complete: ${THEMES.length} themes, ${CHAPTERS.length} chapters, ${problemCount} problems.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
