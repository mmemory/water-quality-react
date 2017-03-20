# Water Quality

Fork/clone and run ```npm install``` then ```npm run dev``` to start developing. Run
```npm run build``` to make a production ready folder (./prod). Index.html is automatically
created based on app.html (./src/app.html), and links are auto generated and inserted.

Any javascript dependency that is imported into your project must be installed through npm. Webpack will automatically
bundle vendor code into a vendor.js file.

Update project title in webpack.config.js 

A config.js file should reside in the config folder (./config/config.js). 
Here is an example of what that should look like:

```javascript
{
    port: 'serverPortNumber'
}
```