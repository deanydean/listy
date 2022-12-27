import React, { useState } from 'react';

export interface SubmitFieldProps {
  placeholder: string;
  maxLength: number;
  submitHandler: Function;
}

const SubmitField = ({
  placeholder,
  maxLength,
  submitHandler,
}: SubmitFieldProps): JSX.Element => {
  const [text, setText] = useState<string>('');

  const userPressedEnter = (e: React.KeyboardEvent<HTMLElement>): boolean => {
    return e.key === 'Enter';
  };

  const handleSubmit = (): void => {
    if (text.length > 0) {
      submitHandler(text);
      setText('');
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => userPressedEnter(e) && handleSubmit()}
      value={text}
    />
  );
};

export default SubmitField;
