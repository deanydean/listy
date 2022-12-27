import React, { useState } from 'react';

import styled from 'styled-components';

export interface StyledTextboxProps {
  size: 's' | 'm';
}
const StyledWrapper = styled.div<StyledTextboxProps>`
  input {
    width: ${(props) => (props.size === 'm' ? '100%' : '60%')};
    margin: ${(props) => props.theme.sizes.spacing.m} 0;
    padding: ${(props) =>
      props.size === 'm'
        ? props.theme.sizes.spacing.m
        : props.theme.sizes.spacing.s};

    font-size: ${(props) =>
      props.size === 'm'
        ? props.theme.fonts.sizes.m
        : props.theme.fonts.sizes.s};
    border-radius: ${(props) => props.theme.borders.radius.m};
    border: ${(props) => props.theme.borders.inactive};

    &:focus {
      outline: none;
      border: ${(props) => props.theme.borders.active};
    }
  }
`;

export interface SubmitFieldProps {
  placeholder: string;
  maxLength: number;
  submitHandler: Function;
  size: 's' | 'm';
}

const SubmitField = ({
  placeholder,
  maxLength,
  submitHandler,
  size,
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
    <StyledWrapper size={size}>
      <input
        type="text"
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => userPressedEnter(e) && handleSubmit()}
        value={text}
      />
    </StyledWrapper>
  );
};

export default SubmitField;
