import Link from 'next/link';
import NavBar from './navbar';
import Wrapper from './wrapper';

const Header = (): JSX.Element => {
  return (
    <header>
      <Wrapper>
        <div className="flex flex-row justify-between leading-10 w-full">
          <Link href="/">
            <button className="hover:underline font-semibold text-2xl">A Lazy Developer&lsquo;s Blog</button>
          </Link>

          <NavBar />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
