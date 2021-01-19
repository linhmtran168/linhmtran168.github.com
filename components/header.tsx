import Link from 'next/link';
import NavBar from './navbar';
import Wrapper from './wrapper';

const Header = () => {
  return (
    <header>
      <Wrapper>
        <Link href="/">
          <a className="hover:underline">A Lazy Developer's Blog</a>
        </Link>

        <NavBar />
      </Wrapper>
    </header>
  )
};

export default Header;