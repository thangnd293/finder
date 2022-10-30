interface Props {
  children: React.ReactNode;
}
const PrivateRoute = ({ children }: Props) => {
  return <>{children}</>;
};

export default PrivateRoute;
