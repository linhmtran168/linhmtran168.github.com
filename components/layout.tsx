import Footer from './footer';
import Header from './header';
import Wrapper from './wrapper';
import LayoutProp from '../types/layout_prop';

const Layout = ({ children }: LayoutProp): JSX.Element => {
  return (
    <>
      <Header />
      <div className="mt-5">
        <Wrapper>{children}</Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
