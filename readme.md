![Website Aaron van den Berg](https://github.com/aaron5670/aaronvandenberg.nl/blob/master/screenshot.png?raw=true)

# Web Developer portfolio website
This is my personal portfolio website build with GatsbyJS and a small ExpressJS server.

### Features
- React 16.x
- Gatsby framework
- PWA (desktop & mobile)
- Functional components with Recompose React Hooks
- Frontend design by [@smakosh](https://github.com/smakosh/)
- Amazing illustrations by [Undraw.co](https://undraw.co/)
- Express as backend framework
- Socket.IO intergration (realtime online users counter & notifications)
- Simple authentication system with PassportJS
- Contact form with Google reCAPTCHA

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
const EMAIL = 'your@email.com';
const EMAIL_PASSWORD = 'your-mail-password';

/*
 * Session settings
 */
const SESSION_SECRET = 'Zsjfkrkwujskcfjskw&m';

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
