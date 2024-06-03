import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // serial - integer with auto_increment on every new item
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});
