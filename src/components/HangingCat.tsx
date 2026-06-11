import hangingCatTop from "../assets/hanging-cat-top.png";
import hangingCatBottom from "../assets/hanging-cat-bottom.png";

type Props = {
  position: "top" | "bottom";
  width?: number;
  offset?: number;
};

export function HangingCat({
  position,
  width = 180,
  offset = 90,
}: Props) {
  const image =
    position === "top"
      ? hangingCatTop
      : hangingCatBottom;

  const positionStyle =
    position === "top"
      ? { top: `-${offset}px` }
      : { bottom: `-${offset}px` };

  return (
    <img
      src={image}
      alt="Gatinho decorativo"
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        width: `${width}px`,
        height: "auto",
        zIndex: 10,
        pointerEvents: "none",
        ...positionStyle,
      }}
    />
  );
}