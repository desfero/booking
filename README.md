# booking
Backend for booking system for airlines
Frontend: https://github.com/desfero/booking-fr

## Usage

### Start the Development Server
```Bash
npm run up
```

When starting the server there are a couple of parameters you can pass:
* verbose - Enable verbose output
* release - Enable release mode, which will generally disable debugging features

Hot reloading is in place, so you do not need to restart the server on file change.

#### Environment Variables
The following environment variables are supported:
* PORT - defaults to 1234 if not set

### Deployment
If you want to deploy your application, simply copy the build folder and invoke
```Bash
node server.js
```
