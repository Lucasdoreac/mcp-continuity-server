#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { MCPServer } from './mcp/server.js';

// Configuração do ambiente
dotenv.config();

// Configuração do diretório atual (para ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Página inicial com documentação
app.get('/', (req, res) => {
  res.send('MCP Continuity Server - Consulte a documentação em https://github.com/Lucasdoreac/mcp-continuity-server');
});

// Inicializa o servidor MCP
const mcpServer = new MCPServer();

// Inicia o servidor Express
app.listen(PORT, () => {
  console.log(`MCP Continuity Server rodando na porta ${PORT}`);
  console.log('Documentação: https://github.com/Lucasdoreac/mcp-continuity-server');
  
  // Inicia o servidor MCP
  mcpServer.start();
});

// Tratamento de encerramento
process.on('SIGINT', async () => {
  console.log('Encerrando servidor MCP...');
  await mcpServer.stop();
  process.exit(0);
});
