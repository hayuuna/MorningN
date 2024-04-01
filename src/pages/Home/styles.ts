import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

export const Date = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  div {
    width: 1.25rem;
    height: 1.25rem;
    overflow: hidden;
    border-radius: 50%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
