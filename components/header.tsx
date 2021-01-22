import Link from 'next/link';
import NavBar from './navbar';
import Wrapper from './wrapper';
import 'highlight.js/styles/github.css';

const Header = (): JSX.Element => {
  return (
    <header className="border-b layout-separator">
      <Wrapper>
        <div className="flex flex-row items-baseline justify-between leading-loose w-full pt-3">
          <Link href="/">
            <a className="hover:underline font-semibold text-2xl">A Lazy Developer&lsquo;s Blog</a>
          </Link>

          <NavBar />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
