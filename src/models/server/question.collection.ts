import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export default async function createQuestionCollection() {

  // 1️⃣ Create collection
  await databases.createCollection(
    db,
    questionCollection,
    questionCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log("Question collection is created");

  // 2️⃣ Create attributes (SEQUENTIAL)
  await databases.createStringAttribute(db, questionCollection, "title", 100, true);
  await databases.createStringAttribute(db, questionCollection, "content", 10000, true);
  await databases.createStringAttribute(db, questionCollection, "authorId", 50, true);
  await databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true);
  await databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false);

  console.log("Question attributes created");

  // ⏳ Give Appwrite time to register attributes
  await sleep(2000);

  // 3️⃣ Create indexes
  await databases.createIndex(
    db,
    questionCollection,
    "title_index",
    IndexType.Fulltext,
    ["title"]
  );

  await databases.createIndex(
    db,
    questionCollection,
    "content_index",
    IndexType.Fulltext,
    ["content"]
  );

  console.log("Question indexes created");
}
