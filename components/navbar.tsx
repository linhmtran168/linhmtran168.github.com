import Link from 'next/link';

const NavBar = (): JSX.Element => {
  return (
    <nav>
      <Link href="/about">
        <button className="hover:underline">About</button>
      </Link>
    </nav>
  );
};

export default NavBar;
