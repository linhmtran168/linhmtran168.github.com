import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <Link href="/about">
        <a className="hover:underline">About</a>
      </Link>
    </nav>
  )
};

export default NavBar;