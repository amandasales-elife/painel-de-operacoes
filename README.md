# Manual de Automações · Squad Órion

Guia oficial de operação da **Squad Órion (Elife)** para os projetos **Casas Bahia & Pontofrio**. Ele reúne em uma única página as rotinas de revisão das automações de **Concierge**, **Chatbot** e **Classificação**, além do **Registro de Tarefas** preenchido no fim do expediente.

O manual serve como material de consulta no dia a dia e de onboarding para quem está entrando no time.

## Estrutura dos arquivos

```
├── index.html    → conteúdo do manual e do Registro de Tarefas
├── style.css     → visual (cores, fontes, layout, menu, formulário)
├── script.js     → interações (menu, checklist, abas, formulário, Pinzinho)
└── assets/       → imagens (logo, mascotes)
```

Os três arquivos precisam ficar na mesma pasta, junto da pasta `assets/`.

## Como abrir

Basta abrir o `index.html` no navegador. Não é preciso instalar nada.

| Endereço | O que mostra |
|---|---|
| `index.html` | Manual de Automações |
| `index.html#registro` | Registro de Tarefas, sozinho em uma aba própria |

## O que tem no manual

As seções principais são estas:

1. **Tarefas e Prioridades**: a rotina de 30 em 30 minutos, o atendimento geral, a classificação e o Coolhunting.
2. **Monitoramento das Automações**: a visão geral do que precisa ser acompanhado.
3. **Concierge**: a análise das respostas, a conferência do envio de link e as respostas removidas.
4. **Chatbot**: a auditoria na planilha e os casos críticos.
5. **Classificação**: a revisão da classificação automática.
6. **Não-Mapeados**: os casos que a automação não classificou.
7. **Escala de Expediente**: os horários e a atuação compartilhada.

## Recursos da página

- **Menu hambúrguer.** A navegação fica escondida no botão ☰ Menu, no topo da página. Ela pode ser fechada pelo ✕, clicando fora dela ou com a tecla `Esc`.
- **Checklist de 30 minutos.** Os itens marcados ficam salvos no navegador da pessoa. Cada um vê apenas o próprio checklist.
- **Pinzinho de plantão.** O mascote no canto da tela mostra dicas rápidas da operação a cada clique.
- **Registro de Tarefas.** É um formulário passo a passo que mostra apenas as perguntas dos escopos em que a pessoa atuou no dia (Atendimento, Coolhunting e/ou Automações). Ele abre em uma nova aba pelo botão amarelo do menu.
- **Responsivo.** A página funciona no computador e no celular.

## Como editar

- **Nova seção:** crie um `<section class="section" id="...">` no `index.html` e adicione o item correspondente no menu (`.side-nav`), com o mesmo `id` no `data-target`.
- **Nova subseção:** use `<h3 class="sub-head" id="...">` e um link `<a href="#...">` dentro do `.side-sub` do menu.
- **Ids:** use apenas letras minúsculas, números e hífens, **sempre começando com uma letra**. Por exemplo, `estrategia-2026` funciona, mas `101-estrategia` não, porque um id que começa com número quebra o destaque do menu.
- **Dicas do Pinzinho:** edite a lista `tips` no `script.js`.
- **Nomes da equipe no Registro de Tarefas:** edite as opções do campo `reg-nome` no `index.html`.

## Pendências

- **Envio das respostas do Registro de Tarefas.** Hoje o formulário apenas exibe a confirmação, e os dados não são enviados para nenhum lugar. Eles já são reunidos pela função `coletarRespostas()` no `script.js`, que é o ponto de integração com uma planilha ou um webhook (por exemplo, n8n ou Google Apps Script).
