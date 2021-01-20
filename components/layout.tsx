import Footer from './footer';
import Header from './header';
import Wrapper from './wrapper';
import LayoutProp from '../types/layout_prop';

const Layout = ({ children }: LayoutProp): JSX.Element => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
};

export default Layout;
