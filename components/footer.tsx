import Wrapper from './wrapper';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Footer = () => {
  return (
    <IconContext.Provider value={{ className: 'inline' }}>
      <footer>
        <Wrapper>
          <div className="flex lg:flex-row flex-col flex-wrap justify-between">
            <div className="lg:w-1/4 w-auto pt-8">
              <ul>
                <li>
                  <Link href="https://github.com/linhmtran168">
                    <a className="hover:underline">
                      <FaGithub /> linhmtran168
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/day_dreamer168">
                    <a className="hover:underline">
                      <FaTwitter /> day_dreamer168
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:w-2/4 w-auto pt-8">
              <p className="font-thin">
                This is a blog where a lazy developer ranting about his developer's life and his never ending journey in
                the land of knowledge.
              </p>
            </div>
          </div>
        </Wrapper>
      </footer>
    </IconContext.Provider>
  );
};

export default Footer;
