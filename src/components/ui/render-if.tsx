interface RenderIfProps {
  condition: boolean;
  show: React.ReactNode;
  elseShow?: React.ReactNode;
}

export const RenderIf = ({ condition, show, elseShow }: RenderIfProps) => {
  return condition ? show : elseShow;
};
