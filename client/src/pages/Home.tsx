import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Globe2,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "./home.css";

type Session = {
  id: number;
  day: number;
  weekday: string;
  time: string;
  track: string;
  stage: string;
  title: string;
  description: string;
};

const WHATSAPP_NUMBER = "5511978546190";

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const sessions: Session[] = [
  {
    id: 1,
    day: 21,
    weekday: "QUA",
    time: "10:00",
    track: "Visibilidade",
    stage: "TRILHA 01 · VISIBILIDADE",
    title: "Seu negócio no Google: primeiros passos",
    description: "O que uma vitrine digital precisa para apresentar seu negócio com clareza.",
  },
  {
    id: 2,
    day: 23,
    weekday: "SEX",
    time: "14:30",
    track: "Vitrine digital",
    stage: "TRILHA 02 · VITRINE DIGITAL",
    title: "Raio-X da sua vitrine digital",
    description: "Uma conversa para organizar serviços, produtos e informações essenciais.",
  },
  {
    id: 3,
    day: 26,
    weekday: "SEG",
    time: "18:00",
    track: "WhatsApp",
    stage: "TRILHA 03 · WHATSAPP",
    title: "Do clique à conversa: WhatsApp sem rodeios",
    description: "Como deixar o caminho até o atendimento simples e direto.",
  },
  {
    id: 4,
    day: 28,
    weekday: "QUA",
    time: "11:00",
    track: "Black antecipada",
    stage: "TRILHA 04 · BLACK ANTECIPADA",
    title: "Sua loja pronta para a temporada de Black",
    description: "Organize sua presença digital com antecedência e tire dúvidas sobre os planos SPT.",
  },
  {
    id: 5,
    day: 30,
    weekday: "SEX",
    time: "16:00",
    track: "Vitrine digital",
    stage: "TRILHA 02 · VITRINE DIGITAL",
    title: "Briefing sem complicação",
    description: "Quais informações básicas ajudam a tirar seu site do papel em até 7 dias úteis.",
  },
];

const tracks = ["Todas", ...Array.from(new Set(sessions.map((session) => session.track)))];
const dates = ["Todas", ...Array.from(new Set(sessions.map((session) => String(session.day))))];

const faqs = [
  {
    question: "Em quanto tempo meu site fica no ar?",
    answer:
      "O prazo é de até 7 dias úteis depois que recebemos o briefing completo e os materiais necessários. A contagem começa com as informações aprovadas para produção.",
  },
  {
    question: "O que eu preciso enviar?",
    answer:
      "As informações básicas do negócio, como nome, serviços ou produtos, contatos, região de atendimento e fotos disponíveis. A equipe orienta você durante o briefing — não é preciso entender de tecnologia.",
  },
  {
    question: "O que está incluído em cada plano?",
    answer:
      "Cada card mostra as entregas previstas para aquela categoria. Antes de contratar, a equipe confirma na proposta o escopo, o material necessário e quais recursos de hospedagem, SSL, backup e acompanhamento fazem parte do seu plano.",
  },
  {
    question: "O domínio está incluído?",
    answer:
      "O domínio fica registrado em seu nome e é pago diretamente por você ao registrador. A SPT orienta o apontamento para o site. Assim, o endereço continua sendo seu mesmo se um dia você encerrar o serviço.",
  },
  {
    question: "Hospedagem, SSL e backup estão incluídos?",
    answer:
      "A mensalidade cobre a estrutura de hospedagem e os recursos de segurança e backup descritos na proposta do plano. O escopo é informado antes de você contratar.",
  },
  {
    question: "Que suporte recebo depois que o site fica no ar?",
    answer:
      "A proposta informa o canal de atendimento e o que o acompanhamento mensal inclui. A equipe confirma esse escopo com você antes de iniciar o projeto.",
  },
  {
    question: "Como funciona a fidelidade de 6 meses?",
    answer:
      "Os planos mencionados na referência trabalham com permanência mínima de 6 meses. As condições completas e o início da contagem são apresentados para você antes da contratação.",
  },
  {
    question: "Vou aparecer em primeiro lugar no Google?",
    answer:
      "Não prometemos posição específica nem prazo de ranqueamento. O site pode ser preparado com informações claras e estrutura adequada para mecanismos de busca, mas a indexação e a posição dependem de fatores externos.",
  },
  {
    question: "Como contrato ou peço um plano personalizado?",
    answer:
      "Toque em um dos botões de WhatsApp. A mensagem já identifica o plano escolhido e a equipe conversa com você sobre escopo, disponibilidade e próximos passos. Não há pagamento pelo site.",
  },
];

function BrandMark() {
  return (
    <a className="brand" href="#inicio" aria-label="SPT Site Pra Todos — início">
      <span className="brand-mark" aria-hidden="true">SPT<span>.</span></span>
      <span className="brand-name">SITE PRA<br />TODOS</span>
    </a>
  );
}

function WhatsAppButton({
  children,
  message,
  className = "",
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
}) {
  return (
    <a
      className={`button button-lime ${className}`.trim()}
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [activeTrack, setActiveTrack] = useState("Todas");
  const [activeDate, setActiveDate] = useState("Todas");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleSessions = useMemo(
    () =>
      sessions.filter(
        (session) =>
          (activeTrack === "Todas" || session.track === activeTrack) &&
          (activeDate === "Todas" || String(session.day) === activeDate),
      ),
    [activeTrack, activeDate],
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="spt-site">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
          <nav id="primary-nav" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Navegação principal">
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#programacao" onClick={closeMenu}>Programação</a>
            <a href="#planos" onClick={closeMenu}>Planos</a>
            <a href="#duvidas" onClick={closeMenu}>FAQ</a>
            <WhatsAppButton
              className="header-cta"
              message="Olá! Quero entender como colocar o site do meu negócio no ar em até 7 dias."
            >
              Falar com a SPT
            </WhatsAppButton>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero-section" id="inicio" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light"><span className="live-dot" /> INCLUSÃO DIGITAL PARA NEGÓCIOS DE VERDADE</p>
              <h1 id="hero-title">
                Seu negócio merece ser <span className="hero-outline">encontrado.</span>
                <span className="hero-second-line">Seu site no ar em <em>7 dias.</em></span>
              </h1>
              <p className="hero-lead">
                Uma vitrine digital feita para pequenos negócios aparecerem com mais clareza e receberem contatos pelo WhatsApp — sem complicação e sem depender só de indicação.
              </p>
              <div className="hero-actions">
                <WhatsAppButton message="Olá! Quero minha vitrine digital no ar em até 7 dias. Meu negócio é: ">
                  Quero meu site no ar
                </WhatsAppButton>
                <a className="button button-outline" href="#como-funciona">
                  Conhecer a SPT <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <p className="hero-note"><Clock3 size={15} aria-hidden="true" /> Prazo contado após o briefing completo e os materiais necessários.</p>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one" aria-hidden="true" />
              <div className="art-orbit orbit-two" aria-hidden="true" />
              <div className="art-spark spark-one" aria-hidden="true">✳</div>
              <div className="art-spark spark-two" aria-hidden="true">✳</div>
              <div className="phone-card">
                <div className="phone-top"><span /><span /><span /><small>VITRINE DIGITAL</small></div>
                <div className="phone-content">
                  <span className="phone-kicker">NEGÓCIO LOCAL · ONLINE</span>
                  <div className="phone-visual"><Globe2 size={36} strokeWidth={1.5} aria-hidden="true" /><span>SEU<br />NEGÓCIO</span></div>
                  <div className="phone-lines"><i /><i /><i /></div>
                  <div className="phone-contact"><MessageCircle size={16} aria-hidden="true" /> Conversar no WhatsApp</div>
                </div>
                <span className="phone-stamp"><Check size={15} aria-hidden="true" /> NO AR</span>
              </div>
              <div className="float-card float-google"><span className="float-icon"><Globe2 size={17} aria-hidden="true" /></span><span><b>Mais presença</b><small>na busca local</small></span><span className="float-arrow">↗</span></div>
              <div className="float-card float-zap"><span className="zap-icon"><MessageCircle size={19} aria-hidden="true" /></span><span><b>Contato direto</b><small>sem copiar número</small></span></div>
              <div className="art-caption"><span>01 / 03</span> UMA VITRINE QUE TRABALHA JUNTO</div>
            </div>
          </div>
          <div className="hero-marquee" aria-hidden="true">
            <div className="marquee-track"><span>NEGÓCIO LOCAL</span><b>✳</b><span>VITRINE DIGITAL</span><b>✳</b><span>WHATSAPP DIRETO</span><b>✳</b><span>NO AR EM 7 DIAS</span><b>✳</b><span>NEGÓCIO LOCAL</span><b>✳</b><span>VITRINE DIGITAL</span><b>✳</b><span>WHATSAPP DIRETO</span><b>✳</b><span>NO AR EM 7 DIAS</span><b>✳</b></div>
          </div>
        </section>

        <section className="intro-section section-pad" id="como-funciona" aria-labelledby="intro-title">
          <div className="section-wrap intro-grid">
            <div className="intro-heading">
              <p className="eyebrow"><span className="eyebrow-index">01</span> A INTERNET TAMBÉM É SUA</p>
              <h2 id="intro-title">Você não precisa de mais um post. Precisa de uma <span>casa digital.</span></h2>
            </div>
            <div className="intro-copy">
              <p>Quando alguém procura um serviço perto de casa, uma presença clara ajuda essa pessoa a entender o que você faz e como falar com você.</p>
              <p>A SPT cria sites simples e profissionais para pequenos negócios. Você envia as informações básicas. A gente cuida da vitrine e do caminho até o WhatsApp.</p>
              <a className="text-link" href="#planos">Ver o que combina com meu negócio <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="section-wrap benefit-strip" aria-label="Etapas da vitrine digital">
            <article className="benefit-item"><span className="benefit-icon"><Globe2 size={20} aria-hidden="true" /></span><span className="benefit-num">01</span><h3>Presença própria</h3><p>Uma página para sua marca, seus serviços e seus contatos.</p></article>
            <article className="benefit-item"><span className="benefit-icon"><ShieldCheck size={20} aria-hidden="true" /></span><span className="benefit-num">02</span><h3>Base profissional</h3><p>Estrutura preparada para celular, segurança e presença em buscadores.</p></article>
            <article className="benefit-item"><span className="benefit-icon"><MessageCircle size={20} aria-hidden="true" /></span><span className="benefit-num">03</span><h3>Contato fácil</h3><p>Um botão leva a conversa direto para o seu WhatsApp.</p></article>
          </div>
        </section>

        <section className="black-section" id="black" aria-labelledby="black-title">
          <div className="black-pattern" aria-hidden="true" />
          <div className="section-wrap black-inner">
            <div className="black-label"><Sparkles size={15} aria-hidden="true" /> SPT APRESENTA <span>BLACK ANTECIPADA</span></div>
            <div className="black-content">
              <div>
                <p className="eyebrow eyebrow-light">PREPARE SUA VITRINE COM ANTECEDÊNCIA</p>
                <h2 id="black-title">A Black começa <span>antes</span> da Black.</h2>
                <p className="black-text">Organize sua presença digital com tempo. Conheça as opções da SPT e converse com a equipe sobre a disponibilidade da campanha.</p>
              </div>
              <div className="black-side">
                <p className="black-sticker" aria-hidden="true">B<br />L<br />K</p>
                <WhatsAppButton message="Olá! Quero saber sobre a campanha Black antecipada da SPT e preparar a vitrine digital do meu negócio.">
                  Quero me preparar
                </WhatsAppButton>
                <small>Condições e disponibilidade: consulte pelo WhatsApp.</small>
              </div>
            </div>
            <div className="black-foot"><span>SEM PROMESSA DE DESCONTO NÃO CONFIRMADO</span><span>UMA CAMPANHA DIGITAL PARA NEGÓCIOS LOCAIS <ArrowUpRight size={14} aria-hidden="true" /></span></div>
          </div>
        </section>

        <section className="schedule-section section-pad" id="programacao" aria-labelledby="schedule-title">
          <div className="section-wrap">
            <div className="schedule-head">
              <div>
                <p className="eyebrow"><span className="eyebrow-index">02</span> OUTUBRO 2026 · AGENDA SPT</p>
                <h2 id="schedule-title">Programação <span>do mês.</span></h2>
                <p className="section-intro">Conversas e atividades para organizar sua vitrine digital e preparar o negócio para a campanha.</p>
              </div>
              <div className="schedule-month" aria-label="Mês da programação"><span>2026</span><b>OUT</b><i>10</i></div>
            </div>

            <div className="schedule-notice" role="note">
              <span className="notice-mark">i</span>
              <p><strong>Agenda demonstrativa e editável.</strong> As datas, horários e atividades abaixo são exemplos para a programação promocional. Confirme e atualize as informações oficiais antes de divulgar.</p>
            </div>

            <div className="schedule-controls">
              <div className="filter-group" role="group" aria-label="Filtrar programação por trilha">
                {tracks.map((track) => (
                  <button
                    key={track}
                    type="button"
                    className={`filter-button${activeTrack === track ? " is-active" : ""}`}
                    aria-pressed={activeTrack === track}
                    onClick={() => setActiveTrack(track)}
                  >
                    {track === "Todas" ? "Todas as trilhas" : track}
                  </button>
                ))}
              </div>
              <label className="date-filter">Filtrar por dia
                <select value={activeDate} onChange={(event) => setActiveDate(event.target.value)}>
                  {dates.map((date) => <option key={date} value={date}>{date === "Todas" ? "Todo o mês" : `${date} de outubro`}</option>)}
                </select>
              </label>
            </div>

            <div className="schedule-table" aria-live="polite" aria-relevant="additions removals">
              <div className="schedule-table-head"><span>DATA</span><span>PALCO / TRILHA</span><span>ATIVIDADE</span><span>HORÁRIO</span></div>
              {visibleSessions.length > 0 ? visibleSessions.map((session) => (
                <article className="session-row" key={session.id}>
                  <div className="session-date"><b>{String(session.day).padStart(2, "0")}</b><span>{session.weekday}<small>OUT</small></span></div>
                  <div className="session-stage"><span className={`stage-dot stage-${session.id}`} /><span>{session.stage}</span></div>
                  <div className="session-description"><h3>{session.title}</h3><p>{session.description}</p></div>
                  <div className="session-time"><Clock3 size={15} aria-hidden="true" /> {session.time}<small>CONSULTAR CONFIRMAÇÃO</small></div>
                </article>
              )) : <p className="empty-schedule">Nenhuma atividade encontrada para esses filtros. Escolha outra trilha ou data.</p>}
            </div>
            <p className="schedule-footnote"><span>✳</span> A programação é da campanha promocional digital da SPT; não representa festival ou evento presencial.</p>
          </div>
        </section>

        <section className="plans-section section-pad" id="planos" aria-labelledby="plans-title">
          <div className="section-wrap">
            <div className="plans-heading">
              <p className="eyebrow"><span className="eyebrow-index">03</span> PLANOS SEM ENROLAÇÃO</p>
              <h2 id="plans-title">Um começo digital<br /><span>do seu tamanho.</span></h2>
              <p>Implantação para criar sua vitrine. Mensalidade para manter a estrutura. Escolha o caminho e tire dúvidas com a equipe.</p>
            </div>

            <div className="plans-grid">
              <article className="plan-card">
                <div className="plan-topline"><span>01 / COMEÇAR</span><span className="plan-symbol">↗</span></div>
                <h3>Individual</h3>
                <p className="plan-for">Para profissionais e negócios locais que precisam de uma presença digital clara.</p>
                <div className="plan-price"><small>IMPLANTAÇÃO</small><strong>R$ 450<span>,00</span></strong></div>
                <div className="monthly-price"><strong>+ R$ 180</strong><span>/ mês</span><em>≈ R$ 6/dia</em></div>
                <ul className="plan-features">
                  <li><Check size={16} aria-hidden="true" /> 1 página para apresentar seu negócio</li>
                  <li><Check size={16} aria-hidden="true" /> Imagens do seu negócio organizadas na página</li>
                  <li><Check size={16} aria-hidden="true" /> Botão de contato com mensagem pronta</li>
                  <li><Check size={16} aria-hidden="true" /> Hospedagem, SSL e backup conforme proposta</li>
                </ul>
                <WhatsAppButton className="plan-cta" message="Olá! Tenho interesse no plano Individual da SPT (R$ 450,00 de implantação + R$ 180/mês). Meu negócio é: ">
                  Escolher Individual
                </WhatsAppButton>
              </article>

              <article className="plan-card plan-featured">
                <div className="sold-badge"><Zap size={13} fill="currentColor" aria-hidden="true" /> +VENDIDO</div>
                <div className="plan-topline"><span>02 / EXPOR PRODUTOS</span><span className="plan-symbol">✳</span></div>
                <h3>Logista Vitrine</h3>
                <p className="plan-for">Para lojas que querem mostrar mais opções em uma vitrine organizada.</p>
                <div className="plan-price"><small>IMPLANTAÇÃO</small><strong>R$ 600<span>,00</span></strong></div>
                <div className="monthly-price"><strong>+ R$ 250</strong><span>/ mês</span><em>≈ R$ 8,33/dia</em></div>
                <ul className="plan-features">
                  <li><Check size={16} aria-hidden="true" /> Vitrine curta para apresentar produtos do catálogo</li>
                  <li><Check size={16} aria-hidden="true" /> Página e lista de produtos organizada</li>
                  <li><Check size={16} aria-hidden="true" /> WhatsApp com mensagem que orienta o contato</li>
                  <li><Check size={16} aria-hidden="true" /> Hospedagem, SSL e backup conforme proposta</li>
                </ul>
                <WhatsAppButton className="plan-cta" message="Olá! Tenho interesse no plano Logista Vitrine da SPT (R$ 600,00 de implantação + R$ 250/mês). Quero entender o que preciso enviar para começar.">
                  Quero a Logista Vitrine
                </WhatsAppButton>
              </article>

              <article className="plan-card plan-custom">
                <div className="plan-topline"><span>03 / SOB MEDIDA</span><span className="plan-symbol">✳</span></div>
                <h3>Personalizado</h3>
                <p className="plan-for">Para operações com mais unidades, necessidades específicas ou um escopo diferente.</p>
                <div className="custom-price"><span>SOB CONSULTA</span><strong>Vamos entender<br />seu projeto.</strong></div>
                <div className="custom-note"><span className="custom-line" /> Escopo e valores definidos após conversa.</div>
                <ul className="plan-features">
                  <li><Check size={16} aria-hidden="true" /> Estrutura alinhada ao seu negócio</li>
                  <li><Check size={16} aria-hidden="true" /> Opções para múltiplas unidades</li>
                  <li><Check size={16} aria-hidden="true" /> Conteúdo e contatos por local, quando necessário</li>
                  <li><Check size={16} aria-hidden="true" /> Proposta detalhada antes da contratação</li>
                </ul>
                <WhatsAppButton className="plan-cta" message="Olá! Quero conversar sobre um projeto Personalizado com a SPT. Meu negócio e necessidade são: ">
                  Pedir proposta
                </WhatsAppButton>
              </article>
            </div>

            <div className="plan-terms"><ShieldCheck size={19} aria-hidden="true" /><p><strong>Transparência antes de começar.</strong> Os planos têm permanência mínima de 6 meses, conforme condições da proposta. O domínio é registrado e renovado pelo cliente em seu próprio nome. A mensalidade, os itens incluídos e qualquer custo adicional serão explicados antes da contratação. Os valores diários são aproximações dividindo a mensalidade por 30 dias.</p></div>
          </div>
        </section>

        <section className="promise-section" aria-labelledby="promise-title">
          <div className="section-wrap promise-grid">
            <div className="promise-copy">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-index">04</span> PRAZO, PROCESSO E COMPROMISSO</p>
              <h2 id="promise-title">Você envia o básico.<br /><span>A gente põe no ar.</span></h2>
              <p>Sem precisar virar especialista ou passar semanas montando páginas. A SPT orienta o briefing e organiza o conteúdo com você.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon"><Clock3 size={21} aria-hidden="true" /></div>
              <span className="promise-kicker">COMPROMISSO DE PRAZO</span>
              <h3>Até 7 dias úteis<br />após o briefing completo.</h3>
              <p>Se o site não for publicado nesse prazo após o envio de todos os materiais necessários, a implantação não será cobrada.</p>
              <small>A garantia cobre o prazo de publicação, não posições no Google, vendas ou volume de contatos.</small>
            </div>
            <div className="capacity-note"><span className="capacity-pulse" /><p><strong>Capacidade mensal de produção limitada.</strong> A equipe trabalha com número limitado de projetos por mês para acompanhar cada entrega. Consulte a disponibilidade atual no WhatsApp.</p></div>
          </div>
        </section>

        <section className="truth-section section-pad">
          <div className="section-wrap truth-box">
            <span className="truth-icon"><Sparkles size={22} aria-hidden="true" /></span>
            <div><p className="eyebrow">SEM PROMESSA VAZIA</p><h2>Clareza primeiro.<br /><span>Confiança se constrói.</span></h2><p>Não publicamos depoimentos, avaliações ou números sem autorização e origem verificável. Antes de contratar, você conhece o escopo, o prazo, a mensalidade e as condições do seu plano.</p></div>
            <a className="text-link" href={whatsappLink("Olá! Quero conhecer o escopo, prazo e condições do meu plano antes de contratar.")} target="_blank" rel="noreferrer">Tirar dúvidas no WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="faq-section section-pad" id="duvidas" aria-labelledby="faq-title">
          <div className="section-wrap faq-layout">
            <div className="faq-heading">
              <p className="eyebrow"><span className="eyebrow-index">05</span> PERGUNTAS DIRETAS</p>
              <h2 id="faq-title">Dúvidas?<br /><span>Sem mistério.</span></h2>
              <p>Se a sua pergunta não está aqui, chama a equipe. A conversa começa pelo WhatsApp, sem checkout ou pagamento no site.</p>
              <WhatsAppButton message="Olá! Tenho uma dúvida sobre os sites da SPT. Minha pergunta é: ">Falar com a equipe</WhatsAppButton>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question} open={index === 0}>
                  <summary><span>{faq.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="section-wrap final-cta-inner">
            <span className="final-spark" aria-hidden="true">✳</span>
            <p className="eyebrow eyebrow-light">SEU NEGÓCIO TAMBÉM PODE TER UMA VITRINE PRÓPRIA</p>
            <h2 id="final-title">Chega de depender<br />só da <em>indicação.</em></h2>
            <p>Converse com a SPT, escolha seu plano e dê o próximo passo para colocar seu site no ar em até 7 dias úteis.</p>
            <WhatsAppButton message="Olá! Quero dar o próximo passo para colocar o site do meu negócio no ar em até 7 dias."
              className="final-button">
              Chamar no WhatsApp
            </WhatsAppButton>
            <span className="final-number">(11) 97854-6190</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-main">
          <BrandMark />
          <p>Inclusão digital para pequenos negócios.<br />Uma vitrine própria, com conversa direta.</p>
          <a href="#inicio">Voltar ao topo <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="section-wrap footer-bottom"><span>© 2026 SPT — Site Pra Todos</span><span>Presença digital sem complicação.</span></div>
      </footer>

      <div className="mobile-contact">
        <WhatsAppButton message="Olá! Quero conversar com a SPT sobre um site para meu negócio.">Conversar com a SPT</WhatsAppButton>
      </div>
    </div>
  );
}
