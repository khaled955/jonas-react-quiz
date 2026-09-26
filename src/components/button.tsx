type ButtonProps = {
  children: string;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="btn btn-ui" onClick={onClick}>
      {children}
    </button>
  );
}
