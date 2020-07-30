import React, { useRef, useState, useEffect } from 'react';

import { ReactComponent as GoStackLogo } from './assets/gostack-logo.svg';
import { ReactComponent as RemoveIcon } from './assets/remove.svg';

import api from './services/api';
import GlobalStyles from './styles/global';

import * as S from './styled';

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/repositories');
      setRepositories(data);
    })();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    const { value } = inputRef.current;
    const { data } = await api.post('/repositories', { title: value });
    setRepositories([...repositories, data]);

    inputRef.current.value = '';
    inputRef.current.focus();
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <>
      <S.Container>
        <S.CenteredCard>
          <GoStackLogo />
          <S.CardForm onSubmit={handleAddRepository}>
            <S.FormInput
              placeholder="Digite o título do seu repositório"
              ref={inputRef}
              name="repository-title"
              autoComplete="off"
              autoFocus
            />
            <S.FormButton>Adicionar</S.FormButton>
          </S.CardForm>
          <S.RepositoriesList data-testid="repository-list">
            {repositories.map(({ title, id }) => (
              <S.Repository key={id}>
                <S.RepositoryTitle>{title}</S.RepositoryTitle>
                <S.RepositoryDeletion onClick={() => handleRemoveRepository(id)}>
                  <RemoveIcon />
                  Remover
                </S.RepositoryDeletion>
              </S.Repository>
            ))}
          </S.RepositoriesList>
        </S.CenteredCard>
      </S.Container>

      <GlobalStyles />
    </>
  );
}
