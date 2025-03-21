# MCP Continuity Server

Um servidor MCP para gerenciamento de continuidade e estado em projetos, permitindo manter contexto entre sessões de desenvolvimento.

## Visão Geral

MCP Continuity Server é uma implementação de servidor [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) que fornece ferramentas para gerenciar o estado de projetos entre sessões, facilitando a retomada do trabalho exatamente de onde parou.

## Funcionalidades

- **Gerenciamento de Estado**: Salva e recupera o estado do projeto entre sessões
- **Controle de Progresso**: Mantém rastreamento de arquivos em edição e tarefas pendentes
- **Persistência de Contexto**: Armazena pensamentos, próximos passos e dependências
- **Integração com Git**: Sincroniza com repositórios para análise automática
- **Geração de Prompts**: Cria prompts otimizados para continuidade nas próximas sessões

## Ferramentas Disponíveis

### 1. `initProjectState`
Inicializa o estado de um projeto com base em um repositório.

```javascript
{
  "repositoryUrl": "username/repo",
  "workingDirectory": "src" // opcional
}
```

### 2. `loadProjectState`
Carrega o estado atual de um projeto.

```javascript
{
  "projectPath": "project-status.json" // opcional
}
```

### 3. `updateProjectState`
Atualiza campos específicos no estado do projeto.

```javascript
{
  "updates": {
    "development": {
      "currentFile": "src/component.js",
      "inProgress": {
        "description": "Implementando recurso X"
      }
    }
  },
  "projectPath": "project-status.json" // opcional
}
```

### 4. `analyzeRepository`
Analisa a estrutura de um repositório para obter insights.

```javascript
{
  "workingDirectory": "src" // opcional
}
```

### 5. `generateContinuityPrompt`
Gera um prompt otimizado para continuar o desenvolvimento na próxima sessão.

```javascript
{
  "projectPath": "project-status.json" // opcional
}
```

## Instalação Fácil (Recomendado)

A maneira mais simples de usar o MCP Continuity Server é instalá-lo usando o MCP Installer:

1. Primeiro, instale o MCP Installer adicionando o seguinte ao seu arquivo `claude_desktop_config.json`:

```json
"mcpServers": {
  "mcp-installer": {
    "command": "npx",
    "args": [
      "@anaisbetts/mcp-installer"
    ]
  }
}
```

2. Inicie o Claude Desktop e peça ao Claude que instale o MCP Continuity Server:

```
Claude, por favor instale o servidor MCP chamado @lucasdoreac/mcp-continuity-server
```

3. Reinicie o Claude Desktop, e o servidor estará pronto para uso!

## Instalação Manual

Para instalação manual, você pode:

1. Clone este repositório:
   ```
   git clone https://github.com/Lucasdoreac/mcp-continuity-server.git
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Execute o servidor:
   ```
   npm start
   ```

4. Configure seu cliente MCP para usar o servidor na URL: `http://localhost:3000`

## Uso com Claude

Para usar este servidor com Claude:

1. Solicite que Claude use o servidor MCP de continuidade:
   ```
   Por favor, utilize o servidor MCP de continuidade para gerenciar o estado do projeto [nome-do-repositório].
   ```

2. Claude automaticamente utilizará as ferramentas do servidor para manter o contexto entre sessões.

## Desenvolvimento

Este projeto é baseado no [MCP Continuity Tool](https://github.com/Lucasdoreac/mcp-continuity-tool), adaptado para funcionar como um servidor MCP compatível.

## Licença

MIT
