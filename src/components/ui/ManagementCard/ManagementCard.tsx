import { useEffect, useState, type ReactNode } from "react";
import styles from "./ManagementCard.module.css";

export type CardBadge = {
  label: string;
  backgroundColor?: string;
  color?: string;
};

type ManagementCardProps = {
  image: string;
  imageAlt: string;

  title: ReactNode;
  subtitle?: ReactNode;

  badges?: CardBadge[];

  description?: ReactNode;
  extraContent?: ReactNode;

  onEdit: () => void;
  onDelete: () => void;
};

export function ManagementCard({
  image,
  imageAlt,
  title,
  subtitle,
  badges = [],
  description,
  extraContent,
  onEdit,
  onDelete,
}: ManagementCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.leftContent}>
        <img
          src={image}
          alt={imageAlt}
          className={styles.image}
        />

        <div className={styles.info}>
          <h3 className={styles.title}>
            {title}
          </h3>

          {subtitle && (
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          )}

          {badges.length > 0 && (
            <div className={styles.badges}>
              {badges.map((badge, index) => (
                <span
                  key={`${badge.label}-${index}`}
                  className={styles.badge}
                  style={{
                    backgroundColor:
                      badge.backgroundColor ?? "#7c75a3",
                    color: badge.color ?? "#ffffff",
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}

          {!isMobile && description && (
            <div className={styles.description}>
              {description}
            </div>
          )}

          {extraContent && (
            <div className={styles.extraContent}>
              {extraContent}
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onEdit}
          className={`${styles.editButton} ${
            isMobile ? styles.editButtonMobile : ""
          }`}
        >
          {isMobile ? "✏️" : "Editar ✏️"}
        </button>

        <button
          type="button"
          onClick={onDelete}
          className={styles.deleteButton}
        >
          ✖
        </button>
      </div>
    </div>
  );
}