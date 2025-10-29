# 📋 Sistema de Gerenciamento de Tarefas

Um sistema moderno e responsivo para gerenciamento de tarefas, desenvolvido com **Vue 3**, **Pinia**, **Tailwind CSS** e **JSON Server**.

---

## ✨ Funcionalidades

- Visualizar, Criar, editar e remover tarefas
- Marcar tarefas como concluídas/pendentes
- Interface responsiva e intuitiva
- Persistência de dados com JSON Server
- Validação de formulários

---

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo (Composition API)
- **Pinia** - Gerenciamento de estado global
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP para requisições à API
- **JSON Server** - API REST mockada para persistência de dados

---

## 🔧 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- npm (incluso no Node.js) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Passos para rodar o projeto

**1. Clone o repositório**

```bash
git clone https://github.com/LeticiaLopess/desafio-vue-tasks-leticia-lopes.git
cd vue-tasks
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

**4. Inicie o servidor JSON**

Em um terminal, execute:

```bash
npx json-server --watch db.json --port 3000
```

**5. Inicie a aplicação Vue**

Em outro terminal, execute:

```bash
npm run dev
```

**Ou rode tudo junto:**

```bash
npm run dev:full
```

**6. Acesse a aplicação**

Abra seu navegador em: **http://localhost:5173**

---

## 📁 Estrutura

### Arquitetura do Projeto

O projeto segue uma arquitetura modular baseada em boas práticas do Vue 3, priorizando **separação de responsabilidades**, **reutilização de componentes** e **manutenibilidade**.

```
src/
 ├─ api/                 # Configuração do Axios
 │   └─ api.js           # Instância base do Axios com configurações
 │
 ├─ assets/              # Recursos estáticos
 │   └─ images/          # Imagens e ícones
 │
 ├─ components/          # Componentes reutilizáveis
 │   ├─ tasks/           # Componentes específicos do contexto de tarefas
 │   │   ├─ FilterSelect.vue  # Seletor de filtros (todas/pendentes/concluídas)
 │   │   ├─ Form.vue          # Formulário de criação/edição de tarefas
 │   │   └─ List.vue          # Lista de tarefas com renderização dinâmica
 │   │
 │   ├─ Button.vue       # Botão customizado e reutilizável
 │   ├─ Checkbox.vue     # Checkbox estilizado para marcar tarefas
 │   ├─ Footer.vue       # Rodapé da aplicação
 │   ├─ Header.vue       # Cabeçalho da aplicação
 │   ├─ IconAwesome.vue  # Componente wrapper para ícones Font Awesome
 │   ├─ Input.vue        # Campo de entrada de texto customizado
 │   ├─ Modal.vue        # Modal reutilizável para diálogos e formulários
 │   ├─ Table.vue        # Tabela para exibição de tarefas
 │   └─ Textarea.vue     # Área de texto para descrições longas
 │
 ├─ layouts/             # Estruturas de layout
 │   └─ MainLayout.vue   # Layout principal da aplicação
 │
 ├─ services/            # Camada de serviços
 │   └─ taskService.js   # Comunicação com a API de tarefas
 │
 ├─ stores/              # Gerenciamento de estado (Pinia)
 │   └─ taskStore.js     # Store global de tarefas
 │
 ├─ styles/              # Estilos globais
 │   └─ main.css         # Estilos CSS globais e imports do Tailwind
 │
 ├─ utils/               # Funções utilitárias
 │   └─ validators.js    # Validações de formulário
 │
 ├─ views/               # Páginas da aplicação
 │   └─ TasksView.vue    # Página principal de gerenciamento de tarefas
 │
 ├─ App.vue              # Componente raiz
 └─ main.js              # Ponto de entrada da aplicação
```

### Descrição da Arquitetura

**Camada de Apresentação (Components/Views)**
- **Components**: Componentes reutilizáveis e agnósticos de lógica de negócio
- **Views**: Páginas que orquestram os componentes e conectam com os stores
- **Layouts**: Templates de estrutura que envolvem as views

**Camada de Estado (Stores)**
- Utiliza **Pinia** para gerenciamento de estado global
- Stores contêm a lógica de negócio e o estado compartilhado
- Comunicação reativa entre componentes através dos stores

**Camada de Serviços (Services)**
- Abstração da comunicação com APIs externas
- Utiliza **Axios** configurado em `api/api.js`
- Centraliza todas as requisições HTTP

**Camada de Utilitários (Utils)**
- Funções auxiliares e validações
- Código compartilhado que não se encaixa em outras camadas

**Configuração e Estilização**
- **Tailwind CSS** configurado em `tailwind.config.js` com paleta personalizada
- Estilos globais em `styles/main.css`
- `db.json` simula um backend REST para desenvolvimento

### Fluxo de Dados

1. **View** renderiza componentes e interage com o usuário
2. **Componentes** disparam ações nos **Stores** (Pinia)
3. **Stores** chamam os **Services** para operações assíncronas
4. **Services** fazem requisições HTTP via **Axios**
5. **Stores** atualizam o estado e os componentes reagem automaticamente

---

## Scripts Disponíveis para Iniciar o Projeto
```bash
# Opção 1: Rodar separadamente (dois terminais)
npm run dev                                 # Terminal 1: Inicia o servidor de desenvolvimento Vue
npx json-server --watch db.json --port 3000 # Terminal 2: Inicia o JSON Server

# Opção 2: Rodar tudo junto (recomendado)
npm run dev:full                            # Inicia Vue + JSON Server simultaneamente
```

---

## Arquivos de Configuração

- **`tailwind.config.js`** - Configuração do Tailwind CSS com identidade visual definida (cores e tipografia)
- **`vite.config.js`** - Configuração do Vite
- **`db.json`** - Banco de dados JSON para persistência local
- **`.env`** - Variáveis de ambiente

---

**Desenvolvido por Letícia Lopes** | [GitHub](https://github.com/LeticiaLopess)