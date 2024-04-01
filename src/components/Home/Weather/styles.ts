import styled from 'styled-components';

export const City = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 14px;
  }
`;

export const Temp = styled.p`
  font-size: 3.75rem;
  font-weight: 300;
`;

export const TempMinMax = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  position: relative;

  div {
    width: 20px;
    border-top: 1px solid;
    position: absolute;
    top: 8px;
  }

  p:first-child {
    color: ${({ theme }) => theme.colors.blue};
    width: 20px;
  }

  p:last-child {
    color: ${({ theme }) => theme.colors.red};
    width: 20px;
  }
`;
