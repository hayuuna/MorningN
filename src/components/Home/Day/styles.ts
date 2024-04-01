import styled from 'styled-components';

export const Container = styled.section`
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  span {
    height: 50px;
    display: flex;
    flex-direction: column;
    text-align: end;
    justify-content: center;
  }
`;

export const Month = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-top: 0;
`;

export const Day = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

export const Date = styled.p`
  font-size: 50px;
  font-weight: 600;
  line-height: 50px;
  padding-top: 5px;
`;

export const Time = styled.p`
  margin-top: 10px;
`;
