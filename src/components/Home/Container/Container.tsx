import { StyledContainer } from '@/src/components/Home/Container/styles';

type Size = 'small' | 'medium' | 'large' | 'long';

type ContainerProps = {
  size: Size;
  children: React.ReactElement;
  widthRef?: React.Ref<HTMLDivElement>;
  heightNum?: number;
};

function Container({ size, children, widthRef, heightNum }: ContainerProps) {
  return (
    <StyledContainer size={size} ref={widthRef} heightNum={heightNum}>
      {children}
    </StyledContainer>
  );
}

export default Container;
