import React, { Fragment } from 'react';

const Footer = () => {
  return (
    <Fragment>
      <footer className='footer'>
        <div className='content has-text-centered'>
          <p>
            <strong>The Baron</strong> by{' '}
            <a href='https://github.com/HAKIM92-7'>Hakim Barouni</a>. The source
            code is licensed
            <a href='https://github.com/HAKIM92-7'>Github</a>. The website
            content is open to public
            <a href='https://www.facebook.com/medhakim.barouni'>
              {' '}
              Bizerte 2020
            </a>
            .
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
