import styled, { css } from 'styled-components';

type Size = 'small' | 'medium' | 'large' | 'long';

type SizeParams = {
  width: string;
  height: string;
};

type Sizes = {
  [key in Size]: SizeParams;
};

const sizes: Sizes = {
  long: {
    width: '100%',
    height: '54px',
  },
  large: {
    width: '100%',
    height: '255px',
  },
  medium: {
    width: '100%',
    height: '140px',
  },
  small: {
    width: `calc((100% - 23px) / 2)`,
    height: `calc((100% - 23px) / 2)`,
  },
};

const sizeStyles = css<{ size: Size; heightNum?: number }>`
  ${({ size, heightNum }) => css`
    width: ${sizes[size].width};
    height: ${heightNum ? `${heightNum}px` : sizes[size].height};
  `}
`;

export const StyledContainer = styled.div<{ size: Size; heightNum?: number }>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${sizeStyles}
`;

export default StyledContainer;
