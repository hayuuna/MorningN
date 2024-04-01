import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  button {
    width: 20px;
    height: 20px;
  }
`;

export const News = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
`;

export const Title = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
`;
