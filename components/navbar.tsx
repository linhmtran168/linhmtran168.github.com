import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="right">
      <Link href="/about">
        <a className="hover:underline">About</a>
      </Link>
    </nav>
  );
};

export default NavBar;
