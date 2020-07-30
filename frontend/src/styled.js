import styled from 'styled-components';
import media from 'styled-media-query';

const colors = {
  primary: '#04D361',
  secondary: '#7159C1',
  background: '#0B0A0D',
  neutral: '#202024',
  text: '#FFFFFF',
};

export const Container = styled.div`
  align-items: center;
  background-color: ${colors.background};
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const CenteredCard = styled.div`
  align-items: center;
  background-color: ${colors.neutral};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
  padding: 32px 24px;
  width: 500px;

  ${media.lessThan('medium')`
    padding: 64px;
    width: 100%;
  `}

  svg {
    width: 48px;
    height: 48px;
  }
`;

export const CardForm = styled.form`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
`;

export const FormInput = styled.input`
  border: 0;
  border-radius: 4px;
  height: 48px;
  margin-right: 8px;
  padding: 16px;
  width: 100%;

  &:focus {
    border: 3px solid ${colors.primary};
  }
`;

export const FormButton = styled.button.attrs({
  type: 'submit',
})`
  align-items: center;
  background-color: ${colors.primary};
  color: ${colors.neutral};
  border: 0;
  border-radius: 4px;
  box-shadow: 0px 3px 4px rgba(4, 211, 97, 0.12), 0px 1px 5px rgba(4, 211, 97, 0.2), 0px 2px 4px rgba(4, 211, 97, 0.14);
  display: flex;
  font-weight: 600;
  height: 48px;
  justify-content: center;
  padding: 16px;
  text-align: center;
  transition: opacity .3s ease-in-out;

  &:hover {
    opacity: .8;
  }
`;

export const RepositoriesList = styled.ul`
  margin-top: 16px;
  padding: 16px 0;
  width: 100%;
`;

export const Repository = styled.li`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;

  &:first-child {
    border-top: 1px solid rgba(255,255,255,.05);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255,255,255,.05);
  }
`;

export const RepositoryTitle = styled.p`

  color: ${colors.text};
`;

export const RepositoryDeletion = styled(FormButton)`
  background-color: #ED3F5F;
  box-shadow: 0px 3px 4px rgba(237, 63, 95, 0.12), 0px 1px 5px rgba(237, 63, 95, 0.2), 0px 2px 4px rgba(237, 63, 95, 0.14);
  color: ${colors.text};
  height: 40px;

  svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;
