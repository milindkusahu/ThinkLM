import "dotenv/config";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

async function init() {
  const pdfFilePath = "./google-knowledge-panel.pdf";
  const loader = new PDFLoader(pdfFilePath);

  // Page by page load the PDF file
  const docs = await loader.load();

  // Ready the client OpenAI Embedding Model
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: "http://localhost:6333/",
    collectionName: "think-lm",
  });

  console.log("Indexing of documents done...");
}

init();
