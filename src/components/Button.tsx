// function component

// type / interface Props

type Props = {
  count: number;
  label: string;
  color: "primary" | "secondary";
  bgColor?: string;
  onClick?: () => void;
};

function Button({ count, label, color, bgColor, onClick }: Props) {
  return (
    <button
      color={color}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {label} - {count}
    </button>
  );
}

export default Button;