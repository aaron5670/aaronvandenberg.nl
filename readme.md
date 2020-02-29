# Web Developer portfolio website
This is my personal portfolio website build with GatsbyJS and a small ExpressJS server.

### Prerequirements
1. Latest [Node.js](https://nodejs.org/en/) version
2. [GatsbyJS](https://www.gatsbyjs.org/)

### How to install

1. The easiest way to get started is to clone the repository
2. Change in the root the config.js file.
3. Create a new file named config.js in the server folder and add the following content and adjust it:
```javascript
/*
 * Webserver PORT
 */
const PORT = 3005;

/*
 * Email settings
 */
const EMAIL = 'a.vdberg98@gmail.com';
const EMAIL_PASSWORD = 'gskpglglrxxaparx';

/*
 * Session settings
 */
const SESSION_SECRET = 'Z>==B)$u(iEH6k&m';

/*
 * SSL / HTTPS settings
 * ------------------------
 * if HTTPS is true, the privateKey_path, certificate_path and ca_path MUST be correctly located.
 *
 * privateKey_path is the path where the privkey.pem file is located
 * certificate_path is the path where the cert.pem file is located
 * ca_path is the path where the chain.pem file is located
 */
const isHTTPS = true;
const privateKey_path = 'PATH_TO_THIS_FILE/privkey.pem';
const certificate_path = 'PATH_TO_THIS_FILE/cert.pem';
const ca_path = 'PATH_TO_THIS_FILE/chain.pem';

module.exports = {EMAIL, EMAIL_PASSWORD, PORT, SESSION_SECRET, isHTTPS, privateKey_path, certificate_path, ca_path};
```
5. Install NPM dependencies in the root folder and in the server folder: <br>
``npm install``
6. Then simply start the server in the server folder by doing: <br>
``node server.js``
7. Finally you start the app in the root folder by doing:
8. ``gatsby develop``
