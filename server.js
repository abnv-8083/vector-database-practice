import { pipeline } from "@huggingface/transformers";
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000
});

// Load embedding model
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

// Generate embedding function
async function generateEmbedding(text) {
  const output = await embedder(text, {
    pooling: "mean",
    normalize: true
  });

  return Array.from(output.data);
}

const collection = await client.getOrCreateCollection({
  name: "college_knowledge",
  embeddingFunction: null
});

const documents = [
  "Students must maintain at least 75% attendance.",
  "The semester examination fee is 1500 rupees.",
  "The new semester starts on January 10.",
  "Students who miss an exam must apply for a supplementary examination.",
  "Students can pay examination fees through the college portal."
];

// Generate embeddings
const embeddings = await Promise.all(
  documents.map(doc => generateEmbedding(doc))
);

// Store in vector database
await collection.add({
  ids: ["1", "2", "3", "4", "5"],
  documents: documents,
  embeddings: embeddings,
  metadatas: [
    { category: "attendance" },
    { category: "payment" },
    { category: "schedule" },
    { category: "exams" },
    { category: "payment" }
  ]
});

console.log("Documents stored successfully!");


async function searchDocuments(query) {

  // Convert user query into embedding
  const queryEmbedding = await generateEmbedding(query);

  // Search ChromaDB
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3
  });

  console.log("\nSearch Results:");

  results.documents[0].forEach((doc, index) => {
    console.log({
      document: doc,
      distance: results.distances[0][index]
    });
  });
}

// Test search
await searchDocuments(
  "How much do I need to pay for my exams?"
);