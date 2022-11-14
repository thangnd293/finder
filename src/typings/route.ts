interface ParentRoute {
  children: IRoute[];
  Layout: React.ComponentType<any>;
  readonly Component?: undefined;
}

interface ChildRoute {
  Component: React.ComponentType<any>;
  readonly children?: undefined;
  readonly Layout?: undefined;
}

type IRoute = {
  name: string;
  path: string;
  isPrivate?: boolean;
  isIndex?: boolean;
} & (ParentRoute | ChildRoute);

export default IRoute;
