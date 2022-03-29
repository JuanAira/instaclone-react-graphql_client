import React from 'react';
import { Image } from 'semantic-ui-react';

import imageNotFound from '../../assets/page-not-found.png';
import './sass/styles.scss';

const nameSpace = 'page-not-found';

export default function Error() {
  return (
    <div className={nameSpace}>
      <Image className={`${nameSpace}--image`} src={imageNotFound} alt="page not found" />
    </div>
  );
}
