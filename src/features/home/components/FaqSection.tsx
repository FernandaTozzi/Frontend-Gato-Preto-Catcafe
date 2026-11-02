import * as Accordion from "@radix-ui/react-accordion";
import styles from "./FaqSection.module.css";

// Ajuste as respostas conforme as regras reais do café.
const questions = [
  {
    question: "Preciso fazer uma reserva?",
    answer:
      "Para verificar a necessidade de reserva e os horários disponíveis, entre em contato com nossa equipe antes da visita.",
  },
  {
    question: "Como posso adotar um gatinho?",
    answer:
      "Conheça os gatinhos disponíveis na seção Quero Adotar. Lá você encontra as informações sobre adoção responsável e o acesso ao formulário.",
  },
  {
    question: "Como funcionam as atividades especiais?",
    answer:
      "São eventos realizados em datas específicas. Consulte a seção Atividades para conferir as datas, horários e detalhes de cada evento.",
  },
  {
    question: "Como posso contribuir com o café?",
    answer:
      "Você pode ajudar por meio de doações. Na seção Doação, o botão Fazer Doação mostra os dados bancários cadastrados pelo café.",
  },
  {
    question: "Onde encontro o Gato Preto Cat Café?",
    answer:
      "Veja a seção Local na página inicial para conhecer nosso espaço e consultar as informações de localização.",
  },
];

export function FaqSection() {
  return (
    <section
      id="perguntas"
      className={styles.section}
      aria-labelledby="faq-title"
    >
      <div className={styles.container}>
        <h2 id="faq-title" className={styles.heading}>
          Perguntas Frequentes
        </h2>

        <Accordion.Root
          className={styles.questions}
          type="single"
          defaultValue="item-0"
          collapsible
        >
          {questions.map(({ question, answer }, index) => (
            <Accordion.Item
              key={question}
              value={`item-${index}`}
              className={styles.item}
            >
              <Accordion.Header className={styles.question}>
                <Accordion.Trigger className={styles.trigger}>
                  <span>{question}</span>
                  <span className={styles.symbol} aria-hidden="true">
                    <span className={styles.plus}>+</span>
                    <span className={styles.minus}>−</span>
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className={styles.answer}>
                <p>{answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
