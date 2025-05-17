
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faDribbble,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

export default function MobileMenuSocials() {
  return (
    <>
       <a href="https://www.facebook.com/">
        <span className="link-effect">
          <span className="effect-1">
            <FontAwesomeIcon icon={faFacebook} />
          </span>
          <span className="effect-1">
            <FontAwesomeIcon icon={faFacebook} />
          </span>
        </span>
      </a>

      <a href="https://instagram.com/">
        <span className="link-effect">
          <span className="effect-1">
            <FontAwesomeIcon icon={faInstagram} />
          </span>
          <span className="effect-1">
            <FontAwesomeIcon icon={faInstagram} />
          </span>
        </span>
      </a>

      <a href="https://twitter.com/">
        <span className="link-effect">
          <span className="effect-1">
            <FontAwesomeIcon icon={faXTwitter} />
          </span>
          <span className="effect-1">
            <FontAwesomeIcon icon={faXTwitter} />
          </span>
        </span>
      </a>

      {/* <a href="https://dribbble.com/">
        <span className="link-effect">
          <span className="effect-1">
            <FontAwesomeIcon icon={faDribbble} />
          </span>
          <span className="effect-1">
            <FontAwesomeIcon icon={faDribbble} />
          </span>
        </span>
      </a> */}

      <a href="https://dribbble.com/">
        <span className="link-effect">
          <span className="effect-1">
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
        
        </span>
      </a>
    </>
  );
}
