# Case: Cypress + GitHub Actions no Swag Labs

Projeto de estudo que automatiza o [Swag Labs](https://www.saucedemo.com), uma loja
de demonstração feita para praticar testes, e roda tudo no GitHub Actions.

## O que é testado

| Arquivo | Cenários |
|---|---|
| `login.cy.js` | Login válido, usuário bloqueado, senha errada, campo vazio, acesso sem login |
| `produtos.cy.js` | Quantidade de produtos, ordenação por preço e por nome |
| `carrinho-checkout.cy.js` | Adicionar/remover do carrinho, compra completa, validação do CEP |

## Estrutura

```
cypress-saucedemo/
├── .github/workflows/e2e.yml    # pipeline
├── cypress/
│   ├── e2e/                     # testes
│   ├── fixtures/checkout.json   # dados de teste
│   └── support/commands.js      # cy.getByTest() e cy.login()
├── cypress.config.js
├── cypress.env.example.json
├── package.json / package-lock.json
├── .nvmrc
└── .gitignore
```

## Rodando na sua máquina

```bash
npm install
cp cypress.env.example.json cypress.env.json
npm run cy:open     # com interface
npm run cy:run      # headless, igual ao CI
```

## Roteiro do case no GitHub

1. Crie um repositório vazio no GitHub, por exemplo `cypress-saucedemo`.
2. Suba o projeto:
   ```bash
   git init
   git add .
   git commit -m "case: cypress + github actions no swag labs"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/cypress-saucedemo.git
   git push -u origin main
   ```
3. Em Settings → Secrets and variables → Actions, crie `CYPRESS_USUARIO`
   (`standard_user`) e `CYPRESS_SENHA` (`secret_sauce`).
4. Abra a aba **Actions**: o push já disparou o workflow. Ao final, o resumo
   da execução mostra a tabela de testes que passaram e falharam.
5. **Simule uma falha:** crie uma branch, troque `'Products'` por `'Produtos'`
   em `login.cy.js`, suba e abra um PR. O check fica vermelho e o screenshot
   aparece em *Artifacts*.
6. **Proteja a main:** em Settings → Branches, exija o check *Cypress E2E*.
   Tente fazer merge do PR do passo 5: o GitHub bloqueia.
7. Corrija o teste no mesmo PR, veja o check ficar verde e faça o merge.

## Quando o pipeline roda git actions

| Evento | Exemplo |
|---|---|
| `push` na main | Merge de um PR |
| `pull_request` | Abrir ou atualizar um PR |
| `workflow_dispatch` | Botão "Run workflow" |
| `schedule` | Dias úteis às 8h (Brasília) |
