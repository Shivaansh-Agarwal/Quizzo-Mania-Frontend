import iconGithub from "../../../assets/icon-github.svg";
import iconLinkedin from "../../../assets/icon-linkedin.svg";
import iconTwitter from "../../../assets/icon-twitter.svg";
import {
  GITHUB_PROFILE_URL,
  TWITTER_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from "../../../utils/constants.js";

export const SocialMediaBar = () => {
  return (
    <div className="flex flex-row justify-evenly w-32 sm:w-40 pt-0.5 sm:pt-2">
      <ImageLink
        profileURL={GITHUB_PROFILE_URL}
        imgSrc={iconGithub}
        altText="Github"
      />
      <ImageLink
        profileURL={TWITTER_PROFILE_URL}
        imgSrc={iconTwitter}
        altText="Twitter"
      />
      <ImageLink
        profileURL={LINKEDIN_PROFILE_URL}
        imgSrc={iconLinkedin}
        altText="Linkedin"
      />
    </div>
  );
};

const ImageLink = ({ profileURL, imgSrc, altText }) => {
  return (
    <a href={profileURL} target="_blank" rel="noreferrer">
      <img src={imgSrc} alt={altText} className="w-6 h-6 sm:w-7 sm:h-7" />
    </a>
  );
};
