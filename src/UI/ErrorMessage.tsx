import { FieldError } from "react-hook-form";

type ErrorProps = {
  errors: FieldError | undefined;
}

const ErrorMessage = ({errors}: ErrorProps) => {
  if (!errors) {
    return null;
  }

  const msg = errors.type === 'required' ? '필수 입력 사항입니다.' : errors?.message;
  
  return (
    <div className="cred">{msg}</div>
  );
}

export default ErrorMessage;