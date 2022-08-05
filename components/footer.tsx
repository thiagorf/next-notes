import { AiFillHeart, AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const socialMedias = [
  {
    socialMedia: "Linkedin",
    Icon: AiFillLinkedin,
  },
  {
    socialMedia: "Github",
    Icon: AiFillGithub,
  },
];

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-36  border -mt-36">
      <p className="mb-2">
        Made with <AiFillHeart className="inline text-red-500" /> by thiagorf
      </p>
      <div>
        <p className="text-sm">Developer Social Medias</p>
        <div className="flex justify-evenly">
          {socialMedias.map(({ socialMedia, Icon }, index) => (
            <p className=" text-sm align-middle" key={index}>
              <Icon className="inline mr-1 mb-[0.125em]" />
              {socialMedia}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};
