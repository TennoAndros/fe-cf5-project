import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsGithub,
  BsDribbble,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";

const FooterComp = () => {
  return (
    <Footer container className="border border-t-2 border-gray-200">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <div className="flex flex-col items-center md:items-start">
            <Link
              to="/"
              className="whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <h1 className="h-10 px-4 py-1 bg-gradient-to-r from-orange-400 via-purple-600 to-sky-500 rounded-full text-white">
                Book Talk
              </h1>
            </Link>
          </div>
          <div>
            <Footer.Title title="Follow Me" />
            <Footer.LinkGroup col>
              <div className="flex flex-row gap-2">
                <Footer.Icon
                  href="https://github.com/TennoAndros"
                  icon={BsGithub}
                />
                <Footer.Link
                  href="https://github.com/TennoAndros"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
              </div>
              <div className="flex flex-row gap-2">
                <Footer.Icon href="https://dribbble.com/" icon={BsDribbble} />
                <Footer.Link
                  href="https://dribbble.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dribbble
                </Footer.Link>
              </div>
              <div className="flex flex-row gap-2">
                <Footer.Icon
                  href="https://www.linkedin.com"
                  icon={BsLinkedin}
                />
                <Footer.Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </div>
              <div className="flex flex-row gap-2">
                <Footer.Icon
                  href="https://www.instagram.com/"
                  icon={BsInstagram}
                />
                <Footer.Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>
              </div>
              <div className="flex flex-row gap-2">
                <Footer.Icon
                  href="https://www.facebook.com"
                  icon={BsFacebook}
                />
                <Footer.Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Footer.Link>
              </div>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex flex-col items-center">
          <Footer.Copyright
            href="#"
            by="Andreas Apostolatos"
            year={new Date().getFullYear()}
          />
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
