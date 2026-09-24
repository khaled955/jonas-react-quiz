type ErrorProps = {
  errorMsg: string;
};
export default function ErrorMessage({ errorMsg }: ErrorProps) {
  return (
    <p className="error">
      <span>💥</span> {errorMsg}
    </p>
  );
}
