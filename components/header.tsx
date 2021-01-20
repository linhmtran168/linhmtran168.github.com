import Link from 'next/link';
import NavBar from './navbar';
import Wrapper from './wrapper';

const Header = () => {
  return (
    <header>
      <Wrapper>
        <div className="flex flex-row justify-between leading-10">
          <Link href="/">
            <a className="hover:underline font-semibold text-2xl">A Lazy Developer's Blog</a>
          </Link>

          <NavBar />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
