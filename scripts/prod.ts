import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// !@ts-ignore
const db = drizzle(sql, { schema });

const insertChallengeOptions = async (
  challengeId: number,
  options: {
    correct: boolean;
    text: string;
    imageSrc?: string;
    audioSrc?: string;
  }[]
) => {
  await db.insert(schema.challengeOptions).values(
    options.map((option) => ({
      challengeId,
      ...option,
    }))
  );
};

const insertCourse = async (
  title: string,
  imageSrc: string,
  unitDescriptions: string[],
  lessonTitles: string[],
  challengesData: any[]
) => {
  const courses = await db
    .insert(schema.courses)
    .values([{ title, imageSrc }])
    .returning();

  for (const course of courses) {
    const units = await db
      .insert(schema.units)
      .values([
        {
          courseId: course.id,
          title: "Unit 1",
          description: unitDescriptions[0],
          order: 1,
        },
        {
          courseId: course.id,
          title: "Unit 2",
          description: unitDescriptions[1],
          order: 2,
        },
      ])
      .returning();

    for (const unit of units) {
      const lessons = await db
        .insert(schema.lessons)
        .values(
          lessonTitles.map((title, index) => ({
            unitId: unit.id,
            title,
            order: index + 1,
          }))
        )
        .returning();

      for (const lesson of lessons) {
        const challenges = await db
          .insert(schema.challenges)
          .values(
            challengesData.map((challenge, index) => ({
              lessonId: lesson.id,
              type: challenge.type,
              question: challenge.question,
              order: index + 1,
            }))
          )
          .returning();
        // @ts-ignore
        for (const [index, challenge] of challenges.entries()) {
          await insertChallengeOptions(
            challenge.id,
            challengesData[index].options
          );
        }
      }
    }
  }
};

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data in a batched manner
    await db.delete(schema.userProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.courses);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.userSubscription);

    // Insert Spanish course
    await insertCourse(
      "Spanish",
      "/icons/es.svg",
      ["Learn the basics of Spanish", "Learn intermediate Spanish"],
      ["Nouns", "Verbs", "Adjectives", "Phrases", "Sentences"],
      [
        {
          type: "SELECT",
          question: 'Which one of these is "the man"?',
          options: [
            {
              correct: true,
              text: "el hombre",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/es_man.mp3",
            },
            {
              correct: false,
              text: "la mujer",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/es_woman.mp3",
            },
            {
              correct: false,
              text: "el chico",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/es_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the woman"?',
          options: [
            {
              correct: true,
              text: "la mujer",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/es_woman.mp3",
            },
            {
              correct: false,
              text: "el chico",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/es_boy.mp3",
            },
            {
              correct: false,
              text: "el hombre",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/es_man.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the boy"?',
          options: [
            {
              correct: false,
              text: "la mujer",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/es_woman.mp3",
            },
            {
              correct: false,
              text: "el hombre",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/es_man.mp3",
            },
            {
              correct: true,
              text: "el chico",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/es_boy.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the man"',
          options: [
            {
              correct: false,
              text: "la mujer",
              audioSrc: "/audio/es_woman.mp3",
            },
            { correct: true, text: "el hombre", audioSrc: "/audio/es_man.mp3" },
            { correct: false, text: "el chico", audioSrc: "/audio/es_boy.mp3" },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the zombie"?',
          options: [
            {
              correct: false,
              text: "el hombre",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/es_man.mp3",
            },
            {
              correct: false,
              text: "la mujer",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/es_woman.mp3",
            },
            {
              correct: true,
              text: "el zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/es_zombie.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the robot"?',
          options: [
            {
              correct: true,
              text: "el robot",
              imageSrc: "/icons/robot.svg",
              audioSrc: "/audio/es_robot.mp3",
            },
            {
              correct: false,
              text: "el zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/es_zombie.mp3",
            },
            {
              correct: false,
              text: "el chico",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/es_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the girl"?',
          options: [
            {
              correct: true,
              text: "la nina",
              imageSrc: "/icons/girl.svg",
              audioSrc: "/audio/es_girl.mp3",
            },
            {
              correct: false,
              text: "el zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/es_zombie.mp3",
            },
            {
              correct: false,
              text: "el hombre",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/es_man.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the zombie"',
          options: [
            {
              correct: false,
              text: "la mujer",
              audioSrc: "/audio/es_woman.mp3",
            },
            {
              correct: true,
              text: "el zombie",
              audioSrc: "/audio/es_zombie.mp3",
            },
            { correct: false, text: "el chico", audioSrc: "/audio/es_boy.mp3" },
          ],
        },
      ]
    );

    // Insert French course
    await insertCourse(
      "French",
      "/icons/fr.svg",
      ["Learn the basics of French", "Learn intermediate French"],
      ["Nouns", "Verbs", "Adjectives", "Phrases", "Sentences"],
      [
        {
          type: "SELECT",
          question: 'Which one of these is "the man"?',
          options: [
            {
              correct: true,
              text: "l'homme",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/fr_man.mp3",
            },
            {
              correct: false,
              text: "la femme",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/fr_woman.mp3",
            },
            {
              correct: false,
              text: "le garçon",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/fr_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the woman"?',
          options: [
            {
              correct: true,
              text: "la femme",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/fr_woman.mp3",
            },
            {
              correct: false,
              text: "le garçon",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/fr_boy.mp3",
            },
            {
              correct: false,
              text: "l'homme",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/fr_man.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the boy"?',
          options: [
            {
              correct: false,
              text: "la femme",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/fr_woman.mp3",
            },
            {
              correct: false,
              text: "l'homme",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/fr_man.mp3",
            },
            {
              correct: true,
              text: "le garçon",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/fr_boy.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the man"',
          options: [
            {
              correct: false,
              text: "la femme",
              audioSrc: "/audio/fr_woman.mp3",
            },
            { correct: true, text: "l'homme", audioSrc: "/audio/fr_man.mp3" },
            {
              correct: false,
              text: "le garçon",
              audioSrc: "/audio/fr_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the zombie"?',
          options: [
            {
              correct: false,
              text: "l'homme",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/fr_man.mp3",
            },
            {
              correct: false,
              text: "la femme",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/fr_woman.mp3",
            },
            {
              correct: true,
              text: "le zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/fr_zombie.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the robot"?',
          options: [
            {
              correct: true,
              text: "le robot",
              imageSrc: "/icons/robot.svg",
              audioSrc: "/audio/fr_robot.mp3",
            },
            {
              correct: false,
              text: "le zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/fr_zombie.mp3",
            },
            {
              correct: false,
              text: "le garçon",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/fr_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the girl"?',
          options: [
            {
              correct: true,
              text: "la fille",
              imageSrc: "/icons/girl.svg",
              audioSrc: "/audio/fr_girl.mp3",
            },
            {
              correct: false,
              text: "le zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/fr_zombie.mp3",
            },
            {
              correct: false,
              text: "l'homme",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/fr_man.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the zombie"',
          options: [
            {
              correct: false,
              text: "la femme",
              audioSrc: "/audio/fr_woman.mp3",
            },
            {
              correct: true,
              text: "le zombie",
              audioSrc: "/audio/fr_zombie.mp3",
            },
            {
              correct: false,
              text: "le garçon",
              audioSrc: "/audio/fr_boy.mp3",
            },
          ],
        },
      ]
    );

    // Insert Croatian course
    await insertCourse(
      "Croatian",
      "/icons/hr.svg",
      ["Learn the basics of Croatian", "Learn intermediate Croatian"],
      ["Nouns", "Verbs", "Adjectives", "Phrases", "Sentences"],
      [
        {
          type: "SELECT",
          question: 'Which one of these is "the man"?',
          options: [
            {
              correct: true,
              text: "muškarac",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/hr_man.mp3",
            },
            {
              correct: false,
              text: "žena",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/hr_woman.mp3",
            },
            {
              correct: false,
              text: "dječak",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/hr_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the woman"?',
          options: [
            {
              correct: true,
              text: "žena",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/hr_woman.mp3",
            },
            {
              correct: false,
              text: "dječak",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/hr_boy.mp3",
            },
            {
              correct: false,
              text: "muškarac",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/hr_man.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the boy"?',
          options: [
            {
              correct: false,
              text: "žena",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/hr_woman.mp3",
            },
            {
              correct: false,
              text: "muškarac",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/hr_man.mp3",
            },
            {
              correct: true,
              text: "dječak",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/hr_boy.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the man"',
          options: [
            { correct: false, text: "žena", audioSrc: "/audio/hr_woman.mp3" },
            { correct: true, text: "muškarac", audioSrc: "/audio/hr_man.mp3" },
            { correct: false, text: "dječak", audioSrc: "/audio/hr_boy.mp3" },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the zombie"?',
          options: [
            {
              correct: false,
              text: "muškarac",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/hr_man.mp3",
            },
            {
              correct: false,
              text: "žena",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/hr_woman.mp3",
            },
            {
              correct: true,
              text: "zombi",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/hr_zombie.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the robot"?',
          options: [
            {
              correct: true,
              text: "robot",
              imageSrc: "/icons/robot.svg",
              audioSrc: "/audio/hr_robot.mp3",
            },
            {
              correct: false,
              text: "zombi",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/hr_zombie.mp3",
            },
            {
              correct: false,
              text: "dječak",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/hr_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the girl"?',
          options: [
            {
              correct: true,
              text: "djevojka",
              imageSrc: "/icons/girl.svg",
              audioSrc: "/audio/hr_girl.mp3",
            },
            {
              correct: false,
              text: "zombi",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/hr_zombie.mp3",
            },
            {
              correct: false,
              text: "muškarac",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/hr_man.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the zombie"',
          options: [
            { correct: false, text: "žena", audioSrc: "/audio/hr_woman.mp3" },
            { correct: true, text: "zombi", audioSrc: "/audio/hr_zombie.mp3" },
            { correct: false, text: "dječak", audioSrc: "/audio/hr_boy.mp3" },
          ],
        },
      ]
    );

    // Insert Italian course
    await insertCourse(
      "Italian",
      "/icons/it.svg",
      ["Learn the basics of Italian", "Learn intermediate Italian"],
      ["Nouns", "Verbs", "Adjectives", "Phrases", "Sentences"],
      [
        {
          type: "SELECT",
          question: 'Which one of these is "the man"?',
          options: [
            {
              correct: true,
              text: "l'uomo",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/it_man.mp3",
            },
            {
              correct: false,
              text: "la donna",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/it_woman.mp3",
            },
            {
              correct: false,
              text: "il ragazzo",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/it_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the woman"?',
          options: [
            {
              correct: true,
              text: "la donna",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/it_woman.mp3",
            },
            {
              correct: false,
              text: "il ragazzo",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/it_boy.mp3",
            },
            {
              correct: false,
              text: "l'uomo",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/it_man.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the boy"?',
          options: [
            {
              correct: false,
              text: "la donna",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/it_woman.mp3",
            },
            {
              correct: false,
              text: "l'uomo",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/it_man.mp3",
            },
            {
              correct: true,
              text: "il ragazzo",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/it_boy.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the man"',
          options: [
            {
              correct: false,
              text: "la donna",
              audioSrc: "/audio/it_woman.mp3",
            },
            { correct: true, text: "l'uomo", audioSrc: "/audio/it_man.mp3" },
            {
              correct: false,
              text: "il ragazzo",
              audioSrc: "/audio/it_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the zombie"?',
          options: [
            {
              correct: false,
              text: "l'uomo",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/it_man.mp3",
            },
            {
              correct: false,
              text: "la donna",
              imageSrc: "/icons/woman.svg",
              audioSrc: "/audio/it_woman.mp3",
            },
            {
              correct: true,
              text: "lo zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/it_zombie.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the robot"?',
          options: [
            {
              correct: true,
              text: "il robot",
              imageSrc: "/icons/robot.svg",
              audioSrc: "/audio/it_robot.mp3",
            },
            {
              correct: false,
              text: "lo zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/it_zombie.mp3",
            },
            {
              correct: false,
              text: "il ragazzo",
              imageSrc: "/icons/boy.svg",
              audioSrc: "/audio/it_boy.mp3",
            },
          ],
        },
        {
          type: "SELECT",
          question: 'Which one of these is "the girl"?',
          options: [
            {
              correct: true,
              text: "la ragazza",
              imageSrc: "/icons/girl.svg",
              audioSrc: "/audio/it_girl.mp3",
            },
            {
              correct: false,
              text: "lo zombie",
              imageSrc: "/icons/zombie.svg",
              audioSrc: "/audio/it_zombie.mp3",
            },
            {
              correct: false,
              text: "l'uomo",
              imageSrc: "/icons/man.svg",
              audioSrc: "/audio/it_man.mp3",
            },
          ],
        },
        {
          type: "ASSIST",
          question: '"the zombie"',
          options: [
            {
              correct: false,
              text: "la donna",
              audioSrc: "/audio/it_woman.mp3",
            },
            {
              correct: true,
              text: "lo zombie",
              audioSrc: "/audio/it_zombie.mp3",
            },
            {
              correct: false,
              text: "il ragazzo",
              audioSrc: "/audio/it_boy.mp3",
            },
          ],
        },
      ]
    );

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

main();
