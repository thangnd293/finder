type Horizontal = {
  w: number;
  readonly h?: undefined;
};

type Vertical = {
  h: number;
  readonly w?: undefined;
};

type Props = Horizontal | Vertical;

const Space = ({ w, h }: Props) => {
  return (
    <div
      style={{
        marginRight: w ? `${w}px` : 0,
        marginBottom: h ? `${h}px` : 0,
      }}
    ></div>
  );
};

export default Space;
