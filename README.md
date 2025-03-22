# MCP Continuity Server

Um servidor MCP para gerenciamento de continuidade e estado em projetos, baseado no MCP Continuity Tool.

## Versão 1.0.5
- Implementação dos handlers `resources/list` e `prompts/list` para conformidade com o protocolo MCP
- Correção de erros "Method not found" nos logs

## Recursos

- Gerenciamento de estado de projetos
- Análise de repositório
- Geração de prompts de continuidade
- Suporte ao protocolo MCP

## Instalação

```bash
npm install -g @lucasdoreac/mcp-continuity-server
```

## Uso

```bash
mcp-continuity-server
```

## API

### Ferramentas disponíveis

- **initProjectState**: Inicializa o estado de um projeto com base em um repositório
- **loadProjectState**: Carrega o estado atual de um projeto
- **updateProjectState**: Atualiza campos específicos no estado do projeto
- **analyzeRepository**: Analisa a estrutura de um repositório para obter insights
- **generateContinuityPrompt**: Gera um prompt otimizado para continuar o desenvolvimento na próxima sessão

### Recursos disponíveis

- **project-state-template**: Template JSON para inicialização de estado de projeto

### Prompts disponíveis

- **continuity-prompt**: Prompt para usar nas próximas sessões para manter continuidade

## Licença

MIT