import styled from 'styled-components';

interface PmValueProps {
  grade?: number;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 6px;
`;

export const PmValue = styled.div<PmValueProps>`
  width: 80%;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.grade === 10 ? '#E7EFE6' : '#E6ECEF')};

  div {
    text-align: start;
  }
`;

export const PmValueNum = styled.p`
  align-items: center;
  display: flex;
  font-size: 20px;
`;
