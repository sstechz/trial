import React from "react";
import "./contact.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contact">
      <ContentWrapper>
        <div className="title">Contact</div>
        <div className="contactForm">
          <form>
            <div className="subject">
              <input
                name="subject"
                type="text"
                size={40}
                maxLength={200}
                required
                placeholder="Subject"
              />
            </div>
            <div className="message">
              <textarea
                name="message"
                cols={50}
                rows={5}
                required
                placeholder="Write your message"
              />
            </div>
            <div className="nameMail">
              <input
                name="name"
                type="text"
                size={40}
                maxLength={150}
                required
                placeholder="Your name"
              />
              <input
                name="mail"
                type="email"
                size={40}
                maxLength={150}
                required
                placeholder="Your email"
              />
            </div>
          </form>
          <Button>Send Message</Button>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Contact;
