document.addEventListener('DOMContentLoaded', () => {

  /* ============ MOBILE SIDEBAR ============ */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const menuToggle = document.getElementById('menuToggle');

  function openSidebar(){ sidebar.classList.add('open'); overlay.classList.add('show'); }
  function closeSidebar(){ sidebar.classList.remove('open'); overlay.classList.remove('show'); }

  menuToggle?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

  document.querySelectorAll('.sidebar a, .sidebar .nav-link').forEach(el=>{
    el.addEventListener('click', () => { if(window.innerWidth <= 980) closeSidebar(); });
  });

  /* ============ NAV LINK SCROLL (top-level groups) ============ */
  document.querySelectorAll('.nav-link[data-target]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.dataset.target);
      if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
    link.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); link.click(); }
    });
    link.setAttribute('tabindex','0');
    link.setAttribute('role','button');
  });

  /* ============ ACTIVE NAV ON SCROLL ============ */
  const sections = Array.from(document.querySelectorAll('main .section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link[data-target]'));
  const subLinks = Array.from(document.querySelectorAll('.side-sub a'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === id));
      }
    });
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
  sections.forEach(s => observer.observe(s));

  const subTargets = subLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const subObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = '#' + entry.target.id;
        subLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-10% 0px -75% 0px', threshold: 0 });
  subTargets.forEach(t => subObserver.observe(t));

  /* ============ READING PROGRESS BAR ============ */
  const progressBar = document.getElementById('progressBar');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    if(progressBar) progressBar.style.width = pct.toFixed(1) + '%';

    const backTop = document.getElementById('backTop');
    if(backTop) backTop.classList.toggle('show', scrolled > 500);
  }
  document.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  document.getElementById('backTop')?.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  });

  /* ============ INTERACTIVE CHECKLIST (localStorage) ============ */
  const checklist = document.getElementById('checklist30');
  if(checklist){
    const STORAGE_KEY = 'orion-checklist-30min';
    let state = {};
    try{ state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }catch(e){ state = {}; }

    function applyState(){
      checklist.querySelectorAll('li').forEach(li => {
        const key = li.dataset.key;
        li.classList.toggle('done', !!state[key]);
      });
    }
    applyState();

    checklist.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if(!li) return;
      const key = li.dataset.key;
      state[key] = !state[key];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      applyState();
    });

    document.getElementById('resetChecklist')?.addEventListener('click', () => {
      state = {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      applyState();
    });
  }

  /* ============ ACCORDIONS ============ */
  document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    head?.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  /* ============ TABS ============ */
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const panels = tabGroup.querySelectorAll('.tab-panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        tabGroup.querySelector('#' + btn.dataset.tab)?.classList.add('active');
      });
    });
  });

  /* ============ PINZINHO WATCH WIDGET ============ */
  const watchAvatar = document.getElementById('watchAvatar');
  const watchBubble = document.getElementById('watchBubble');
  const watchText = document.getElementById('watchText');

  const tips = [
    "Já faz 30 minutos? Hora de checar Concierge e Chatbot! 🐧",
    "Fila acima de 20 casos por pessoa? Confira se você é o último recurso disponível.",
    "A classificação de Não Mapeados deve ser feita seguindo os horários de corte",
    "Cenário 3 com impacto no cliente? Não apague, chame a supervisão.",
    "Mensagem vazia no Chatbot = resposta padrão. Isso não é erro!",
    "A tag 01. Natureza_Aleatório não leva nenhuma tag de Categoria.",
    "01. Natureza_Citação nunca leva sentimento em massa às cegas.",
    "Facebook: não confie na resposta pública, confira sempre a planilha.",
    "Terminou a página do relatório? Não esqueça da tag de revisão final.",
    "Fim do expediente? Preencha o Registro de Tarefas antes de sair. 📝"
  ];
  let tipIndex = 0;

  function showTip(){
    watchText.textContent = tips[tipIndex % tips.length];
    tipIndex++;
    watchBubble.classList.add('show');
  }
  function toggleTip(){
    if(watchBubble.classList.contains('show')){
      watchBubble.classList.remove('show');
    } else {
      showTip();
    }
  }
  watchAvatar?.addEventListener('click', toggleTip);
  watchAvatar?.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleTip(); }
  });

  // auto-peek once after a short delay to invite interaction
  setTimeout(() => { showTip(); setTimeout(()=>watchBubble.classList.remove('show'), 6000); }, 2500);

});

/* ============================================================
   REGISTRO DE TAREFAS (seção 08)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('regCard');
  if(!card) return;

  const $ = (id) => document.getElementById(id);
  const screens = {
    projeto: $('reg-projeto'),
    identificacao: $('reg-identificacao'),
    questionario: $('reg-questionario')
  };
  const allSteps = Array.from(card.querySelectorAll('.reg-step'));
  const progress = $('regProgress');
  const modal = $('regModal');

  let ativas = [];
  let indice = 0;

  // data de hoje (fuso local)
  function preencherData(){
    const hoje = new Date();
    const offset = hoje.getTimezoneOffset() * 60000;
    $('reg-data').value = new Date(hoje.getTime() - offset).toISOString().split('T')[0];
  }
  preencherData();

  function animar(el){
    el.classList.remove('reg-anim');
    void el.offsetWidth;
    el.classList.add('reg-anim');
  }

  function mostrarTela(nome){
    Object.values(screens).forEach(s => s.classList.remove('is-active'));
    screens[nome].classList.add('is-active');
    animar(screens[nome]);
    progress.hidden = (nome !== 'questionario');
    $('regErrProjeto').textContent = '';
    $('regErrIdent').textContent = '';
  }

  // ---- Tela 1: projeto ----
  card.querySelectorAll('.reg-project').forEach(btn => {
    btn.addEventListener('click', () => {
      if(btn.dataset.projeto === 'MOBIL'){
        $('regErrProjeto').textContent = 'O projeto MOBIL ainda não tem formulário ativo. Escolha Casas Bahia ou fale com a supervisão.';
        return;
      }
      mostrarTela('identificacao');
      setTimeout(() => $('reg-nome').focus(), 60);
    });
  });

  // ---- Tela 2: identificação ----
  $('regTrocarProjeto').addEventListener('click', () => mostrarTela('projeto'));

  function iniciar(){
    const nome = $('reg-nome').value;
    const escopos = Array.from(card.querySelectorAll('input[name="escopo"]:checked')).map(c => c.value);
    if(!nome){ $('regErrIdent').textContent = 'Selecione o seu nome para continuar.'; $('reg-nome').focus(); return; }
    if(escopos.length === 0){ $('regErrIdent').textContent = 'Selecione pelo menos um escopo de atuação.'; return; }

    ativas = allSteps.filter(st => escopos.includes(st.dataset.scope));
    indice = 0;
    mostrarTela('questionario');
    exibir(indice);
  }
  $('regIniciar').addEventListener('click', iniciar);

  // ---- Tela 3: perguntas ----
  function exibir(i){
    allSteps.forEach(st => st.classList.remove('is-active'));
    const atual = ativas[i];
    atual.classList.add('is-active');
    animar(atual);

    const campo = atual.querySelector('input, select, textarea');
    if(campo) setTimeout(() => campo.focus({ preventScroll:true }), 80);

    const total = ativas.length;
    $('regFill').style.width = ((i + 1) / total * 100) + '%';
    $('regCounter').textContent = `Pergunta ${i + 1} de ${total}`;
    $('regScope').textContent = atual.dataset.scope;

    $('regVoltar').textContent = i === 0 ? '← Identificação' : '← Anterior';
    $('regAvancarTxt').textContent = i === total - 1 ? 'Finalizar registro' : 'Avançar';
  }

  function proxima(){
    if(indice < ativas.length - 1){
      indice++;
      exibir(indice);
    } else {
      finalizar();
    }
  }
  function anterior(){
    if(indice > 0){
      indice--;
      exibir(indice);
    } else {
      mostrarTela('identificacao');
    }
  }
  $('regAvancar').addEventListener('click', proxima);
  $('regVoltar').addEventListener('click', anterior);

  // Sim/Não avança sozinho
  card.querySelectorAll('.reg-step input[type="radio"]').forEach(r => {
    r.addEventListener('change', () => setTimeout(proxima, 250));
  });

  // Coleta das respostas (ponto de integração: envie `dados` para onde precisar)
  function coletarRespostas(){
    const dados = {
      projeto: 'Casas Bahia',
      data: $('reg-data').value,
      nome: $('reg-nome').value,
      escopos: Array.from(card.querySelectorAll('input[name="escopo"]:checked')).map(c => c.value),
      respostas: {}
    };
    ativas.forEach(st => {
      st.querySelectorAll('input, textarea').forEach(el => {
        if(el.type === 'radio'){
          if(el.checked) dados.respostas[el.name] = el.value;
        } else if(el.id){
          dados.respostas[el.id] = el.value;
        }
      });
    });
    return dados;
  }

  function finalizar(){
    const dados = coletarRespostas();
    console.log('Registro de tarefas:', dados);
    modal.classList.add('show');
    setTimeout(() => $('regConcluir').focus(), 60);
  }

  function resetar(){
    card.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.checked = false);
    card.querySelectorAll('input[type="number"], textarea').forEach(el => el.value = '');
    $('reg-nome').selectedIndex = 0;
    preencherData();
    ativas = []; indice = 0;
    $('regFill').style.width = '0%';
    mostrarTela('projeto');
  }

  $('regConcluir').addEventListener('click', () => {
    modal.classList.remove('show');
    resetar();
    document.getElementById('registro').scrollIntoView({ behavior:'smooth', block:'start' });
  });
  modal.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') $('regConcluir').click();
  });

  // Atalho Enter — só dentro do formulário
  card.addEventListener('keydown', (e) => {
    if(e.key !== 'Enter') return;
    const el = document.activeElement;
    if(el && el.tagName === 'BUTTON') return; // o próprio botão já trata o Enter

    if(el && el.tagName === 'TEXTAREA'){
      if(e.ctrlKey || e.metaKey){ e.preventDefault(); proxima(); }
      return;
    }
    if(screens.identificacao.classList.contains('is-active')){
      e.preventDefault(); iniciar();
    } else if(screens.questionario.classList.contains('is-active')){
      e.preventDefault(); proxima();
    }
  });
});
