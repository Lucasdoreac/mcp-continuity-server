import { MCP } from '@modelcontextprotocol/mcp';
import { StateManager } from '../services/stateManager.js';
import { AutoSetup } from '../services/autoSetup.js';
import { RepositoryTools } from '../services/repositoryTools.js';

export class MCPServer {
  constructor() {
    // Inicializa o servidor MCP
    this.server = new MCP.Server({
      name: 'MCP Continuity Server',
      version: '1.0.0',
    });

    // Inicializa os serviços
    this.stateManager = new StateManager();
    this.autoSetup = new AutoSetup();
    this.repoTools = new RepositoryTools();

    // Registra os handlers das ferramentas MCP
    this.registerToolHandlers();
  }

  registerToolHandlers() {
    // Registra as ferramentas
    this.registerInitProjectState();
    this.registerLoadProjectState();
    this.registerUpdateProjectState();
    this.registerAnalyzeRepository();
    this.registerGenerateContinuityPrompt();
  }

  registerInitProjectState() {
    this.server.registerTool({
      name: 'initProjectState',
      description: 'Inicializa o estado de um projeto com base em um repositório',
      parameters: {
        type: 'object',
        properties: {
          repositoryUrl: {
            type: 'string',
            description: 'URL ou identificador do repositório'
          },
          workingDirectory: {
            type: 'string',
            description: 'Diretório de trabalho opcional (ex: \'src\', \'frontend/src\')'
          }
        },
        required: ['repositoryUrl']
      },
      handler: async (params) => {
        try {
          const { repositoryUrl, workingDirectory = '' } = params;
          const result = await this.autoSetup.setupProjectState(repositoryUrl, workingDirectory);
          return { result };
        } catch (error) {
          console.error('Erro em initProjectState:', error);
          return { error: error.message || 'Erro ao inicializar estado do projeto' };
        }
      }
    });
  }

  registerLoadProjectState() {
    this.server.registerTool({
      name: 'loadProjectState',
      description: 'Carrega o estado atual de um projeto',
      parameters: {
        type: 'object',
        properties: {
          projectPath: {
            type: 'string',
            description: 'Caminho para o arquivo project-status.json (opcional)'
          }
        }
      },
      handler: async (params) => {
        try {
          const { projectPath = 'project-status.json' } = params;
          const result = await this.stateManager.loadProjectState(projectPath);
          return { result };
        } catch (error) {
          console.error('Erro em loadProjectState:', error);
          return { error: error.message || 'Erro ao carregar estado do projeto' };
        }
      }
    });
  }

  registerUpdateProjectState() {
    this.server.registerTool({
      name: 'updateProjectState',
      description: 'Atualiza campos específicos no estado do projeto',
      parameters: {
        type: 'object',
        properties: {
          updates: {
            type: 'object',
            description: 'Objeto com os campos a serem atualizados'
          },
          projectPath: {
            type: 'string',
            description: 'Caminho para o arquivo project-status.json (opcional)'
          }
        },
        required: ['updates']
      },
      handler: async (params) => {
        try {
          const { updates, projectPath = 'project-status.json' } = params;
          const result = await this.stateManager.updateProjectState(updates, projectPath);
          return { result };
        } catch (error) {
          console.error('Erro em updateProjectState:', error);
          return { error: error.message || 'Erro ao atualizar estado do projeto' };
        }
      }
    });
  }

  registerAnalyzeRepository() {
    this.server.registerTool({
      name: 'analyzeRepository',
      description: 'Analisa a estrutura de um repositório para obter insights',
      parameters: {
        type: 'object',
        properties: {
          workingDirectory: {
            type: 'string',
            description: 'Diretório de trabalho opcional (ex: \'src\', \'frontend/src\')'
          }
        }
      },
      handler: async (params) => {
        try {
          const { workingDirectory = '' } = params;
          const result = await this.repoTools.analyzeRepository(workingDirectory);
          return { result };
        } catch (error) {
          console.error('Erro em analyzeRepository:', error);
          return { error: error.message || 'Erro ao analisar repositório' };
        }
      }
    });
  }

  registerGenerateContinuityPrompt() {
    this.server.registerTool({
      name: 'generateContinuityPrompt',
      description: 'Gera um prompt otimizado para continuar o desenvolvimento na próxima sessão',
      parameters: {
        type: 'object',
        properties: {
          projectPath: {
            type: 'string',
            description: 'Caminho para o arquivo project-status.json (opcional)'
          }
        }
      },
      handler: async (params) => {
        try {
          const { projectPath = 'project-status.json' } = params;
          const state = await this.stateManager.loadProjectState(projectPath);
          const prompt = this.stateManager.generateContinuityPrompt(state);
          return { prompt };
        } catch (error) {
          console.error('Erro em generateContinuityPrompt:', error);
          return { error: error.message || 'Erro ao gerar prompt de continuidade' };
        }
      }
    });
  }

  async start() {
    console.log('Iniciando servidor MCP...');
    await this.server.start();
    console.log('Servidor MCP iniciado com sucesso!');
  }

  async stop() {
    console.log('Parando servidor MCP...');
    await this.server.stop();
    console.log('Servidor MCP parado com sucesso!');
  }
}
