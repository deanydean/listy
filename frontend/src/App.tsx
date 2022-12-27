import List from './components/list';
import React from 'react';
import SubmitField from './components/submit-field';
import styled from 'styled-components';
import { useLists } from './hooks/useLists';

const StyledHeader = styled.h1`
  font-size: ${(props) => props.theme.fonts.sizes.xl};
  font-family: ${(props) => props.theme.fonts.family.heading};
  color: ${(props) => props.theme.colours.textPrimary};
`;

const StyledSlug = styled.p`
  font-size: ${(props) => props.theme.fonts.sizes.s};
  font-family: ${(props) => props.theme.fonts.family.info};
  color: ${(props) => props.theme.colours.textPrimary};
  margin-top: -${(props) => props.theme.sizes.spacing.l};
`;

function App(): JSX.Element {
  // TODO: tests to check controls call the functions
  const { lists, createList } = useLists();

  return (
    <div>
      <StyledHeader>Listy</StyledHeader>
      <StyledSlug>
        A simple MERN stack app for creating and managing lists.
      </StyledSlug>
      <SubmitField
        placeholder="Add a new list..."
        maxLength={60}
        submitHandler={(text: string) => createList({ title: text, items: [] })}
        size="m"
      />
      {/* Render lists */}
      {lists?.map((list, index) => (
        <List key={index} list={list} />
      ))}
    </div>
  );
}

export default App;
