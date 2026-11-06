# Vector Database Practical – JavaScript

A hands-on implementation of vector databases and semantic search using JavaScript, ChromaDB, and Transformers.js.

## Tech Stack
- Node.js
- JavaScript
- ChromaDB
- Transformers.js
- all-MiniLM-L6-v2 embedding model

## Features
- Generate text embeddings.
- Store documents and vectors in ChromaDB.
- Perform semantic similarity search.
- Retrieve Top-K relevant documents.
- Store and retrieve metadata.

## Installation

```bash
npm install
```

Install ChromaDB:

```bash
python -m pip install chromadb
```

Start the ChromaDB server:

```bash
chroma run --path ./chroma_data
```

Run the JavaScript application:

```bash
npm start
```

## Example Query

"How much do I need to pay for my exams?"

Expected relevant result:

"The semester examination fee is 1500 rupees."

## Learning Objectives
- Understanding embeddings.
- Understanding vector databases.
- Semantic search.
- Similarity distance.
- Top-K retrieval.
- Fundamentals of Retrieval-Augmented Generation (RAG).