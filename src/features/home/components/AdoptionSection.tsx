import { useEffect, useState } from "react";
import type { Cat } from "../../cats/cat.types";
import { availableCats, readCatGroup } from "../../cats/catGroup";
import { getCats } from "../../cats/cat.service";
import adoptionImage from "../../../assets/adoption.png";
import greenShape from "../../../assets/green.svg";
import catDecoration from "../../../assets/cat-pose2.png";
import { CatDetailsModal, catAge, catPhotos, catTitle } from "./CatDetailsModal";
import fallbackCat from "../../../assets/cat.png";
import styles from "./AdoptionSection.module.css";

const FORM_URL = "LinkFormulário";

function CatAdoptionCard({ cat }: { cat: Cat }) {
  const [modalOpen, setModalOpen] = useState(false);
  const members = readCatGroup(cat);
  const title = catTitle(cat);
  const photos = catPhotos(cat);
  const isGroup = cat.tipoAdocao === "CONJUNTA";

  return (
    <>
      <article
        className={styles.card}
        role="button"
        tabIndex={0}
        aria-label={`Ver fotos e detalhes de ${title}`}
        onClick={() => setModalOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setModalOpen(true);
          }
        }}
      >
        <div className={styles.cover}>
          <img
            src={photos[0] || fallbackCat}
            alt={isGroup ? `Gatinhos ${title}` : `Gatinho ${title}`}
            loading="lazy"
            onError={(event) => {
              if (event.currentTarget.src !== new URL(fallbackCat, window.location.href).href) {
                event.currentTarget.src = fallbackCat;
              }
            }}
          />
        </div>
        <div className={styles.cardContent}>
          <h3>{title}</h3>
          <div className={styles.memberTags} aria-label="Nomes e gêneros dos gatinhos">
            {members.map((member, index) => (
              <span className={styles.memberTag} key={`${member.nome}-${index}`}>
                {member.nome} {member.genero === "MACHO" ? "♂" : "♀"}
              </span>
            ))}
          </div>
          <p className={styles.age}>{catAge(cat.idade)}</p>
          <div className={styles.badges}>
            <span className={styles.adoptionBadge}>
              {isGroup ? "Adoção conjunta" : "Adoção simples"}
            </span>
            <span className={styles.availableBadge}>Disponível</span>
          </div>
          <p className={styles.description}>
            {cat.descricao || "Sem descrição cadastrada."}
          </p>
        </div>
      </article>
      {modalOpen && <CatDetailsModal cat={cat} onClose={() => setModalOpen(false)} />}
    </>
  );
}

export function AdoptionSection() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getCats()
      .then((data) => { if (active) setCats(availableCats(data)); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section id="adocao" className={styles.section} aria-labelledby="adoption-title">
      <div className={styles.container}>
        <h2 id="adoption-title" className={styles.heading}>
          Gatinhos Disponíveis para Adoção
        </h2>
        {loading && <p className={styles.message} role="status">Carregando gatinhos...</p>}
        {error && <p className={styles.message} role="alert">
          Não foi possível carregar os gatinhos. Tente novamente mais tarde.
        </p>}
        {!loading && !error && cats.length === 0 && (
          <p className={styles.message}>Nenhum gatinho disponível para adoção no momento.</p>
        )}
        {!loading && !error && cats.length > 0 && (
          <div className={styles.grid}>
            {cats.map((cat) => <CatAdoptionCard key={cat.id} cat={cat} />)}
          </div>
        )}
      </div>

      <div className={styles.invitation}>
        <img src={catDecoration} className={styles.catPose} alt="" aria-hidden="true" />
        <div className={styles.invitationText}>
          <h2>Encontrou Seu Par Purrfeito?</h2>
          <p>
            Encontrou um gatinho que é a sua cara? Responda ao formulário de
            adoção responsável e venha visitar nosso café para conhecer seu
            futuro companheiro!
          </p>
          <p>
            A adoção é um compromisso de carinho e cuidado. Nossa equipe vai
            orientar você durante o processo.
          </p>
          <a className={styles.formButton} href={FORM_URL}>
            Responder Formulário <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.invitationVisual}>
          <img src={greenShape} className={styles.greenBlob} alt="" aria-hidden="true" />
          <img
            className={styles.adoptionPhoto}
            src={adoptionImage}
            alt="Uma visitante segurando um gatinho preto no Gato Preto Cat Café"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
