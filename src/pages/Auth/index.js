/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import instaclone from '../../assets/instaclone.png';
import RegisterForm from '../../components/RegisterForm';

import getContent from './content';
import './sass/styles.scss';

const spaceName = 'auth';

export default function Auth() {
  const {
    signIn: { descriptionSI, ctaTextSI },
    singUp: { descriptionSU, ctaTextSU },
  } = getContent();
  const [showLogin, setShowLogin] = React.useState(true);

  return (
    <Container fluid className={spaceName}>
      <Image className={`${spaceName}--image`} src={instaclone} />
      <div className={`${spaceName}__container--form`}>
        {showLogin ? <p>Formulario Login</p> : <RegisterForm setShowLogin={setShowLogin} />}
      </div>
      <div className={`${spaceName}__container--change-form`}>
        {showLogin
          ? (
            <p className={`${spaceName}--no-account`}>
              {descriptionSU}
              <span
                className={`${spaceName}__container--change-form__link`}
                onClick={() => setShowLogin(!showLogin)}
              >
                {ctaTextSU}
              </span>
            </p>
          )
          : (
            <p className={`${spaceName}--with-account`}>
              {descriptionSI}
              <span
                className={`${spaceName}__container--change-form__link`}
                onClick={() => setShowLogin(!showLogin)}
              >
                {ctaTextSI}
              </span>
            </p>
          )}
      </div>
    </Container>
  );
}
