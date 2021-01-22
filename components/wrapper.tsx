import LayoutProp from '../types/layout_prop';

const Wrapper = ({ children }: LayoutProp): JSX.Element => {
  return <div className="sm:w-5/6 lg:w-1/2 mx-auto h-full flex p-3">{children}</div>;
};

export default Wrapper;
