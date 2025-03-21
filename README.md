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

## Instalação e Configuração

Para usar o MCP Continuity Server, você pode adicioná-lo através do [PulseMCP](https://www.pulsemcp.com/servers) ou executá-lo localmente:

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
