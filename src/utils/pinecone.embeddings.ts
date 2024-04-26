import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { pinecone } from "./pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Document } from "langchain/dist/document";

// Cambiar nombre de espacio de trabajo: ejemplo curso-video-aws o ejemplo curso-repositorio-aws
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? "";
const PINECONE_NAME_SPACE = process.env.PINECONE_NAMESPACE ?? "";

const runPinecone = async (docs: Document<Record<string, any>>[]) => {
  const embeddings = new OpenAIEmbeddings();
  const index = pinecone.Index(PINECONE_INDEX_NAME);

  console.log("index", index);
  console.log("embeddings", embeddings);

  const pineconeStore = await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    // namespace: PINECONE_NAME_SPACE,
    // textKey: "text",
  });

  console.log("PineconeStore", PineconeStore);
};

export { runPinecone };
