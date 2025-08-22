import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI();

async function chat() {
  const USER_QUERY =
    "Can you summarize about google knowledge panel in 200 words?";

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    { url: "http://localhost:6333/", collectionName: "think-lm" }
  );

  // Search vector database
  const vectorSearcher = vectorStore.asRetriever({
    k: 3, // Retrive 3 relevant chunks
  });

  vectorSearcher.invoke(USER_QUERY);

  // Provides top 3 relevant chunks, the chunks will have embeddings, metadata & content
  const relevantChunks = await vectorSearcher.invoke(USER_QUERY);

  const SYSTEM_PROMPT = `
    You are an AI assistant who helps resolving user query based on the
    context available to you from a PDF file with the content and page number.

    Only answer based on the available context from file only.

    Context:
    ${JSON.stringify(relevantChunks)}
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: USER_QUERY },
    ],
  });

  console.log(`> ${response.choices[0].message.content}`);
}

chat();
