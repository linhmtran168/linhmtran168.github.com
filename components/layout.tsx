import Footer from './footer';
import Header from './header';
import Wrapper from './wrapper';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{ children }</Wrapper>
      <Footer />
    </>
  );
};

export default Layout;