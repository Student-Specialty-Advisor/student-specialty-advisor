<h1 align="center">How to build</h1>
<h2>Installations</h2>



1- Install a version of [Node.js](https://nodejs.org/en/download/) that includes at least npm 8.0 (latest version of Node.js should come with it)

2- Install [MongoDB](https://www.mongodb.com/try/download/community) community version with compass included

3- Install [Git](https://git-scm.com/downloads) for source control

4- Install the source-code editor [VS Code](https://code.visualstudio.com/download)

<h2>Setup</h2>

1- Clone the project repository using git and open it in VS Code

2- Open a new terminal in VS Code

3- Verify that Node.js, npm (should be included with Node.js) and git are correctly installed in your system by typing the following in the terminal
```
git --version  
node -v  
npm --version  
```

4- From the extensions sidebar, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension

5- In VS Code settings, set Prettier to be the default Javascript formatter and enable format on save

6- In the terminal, navigate to the client folder and install the dependencies using npm
```
cd client  
npm install  
```

7- In the terminal, go back to the root folder, then navigate to server folder and install the dependencies using npm
```
cd ..  
cd server  
npm install  
```

8- Inside the client folder, create a .env file with the following starter setup:
```
REACT_APP_API_URL=http://localhost:8000/ssa-api/
```

9- Inside the server folder, create a .env file with the following starter setup:
```
HASH_SALT=5
TOKEN_KEY=i-am-a-contributor
TOKEN_DURATION=86400  
AUTH_EMAIL_USER=no-backend-email-yet 
AUTH_EMAIL_PASS=no-password-yet
SHOULD_SEND_EMAIL=NO
SHOULD_VERIFY=NO
MONGODB_URL=mongodb://localhost:27017/student-specialty-advisor
```
> For more information on what each variable does, [check out ENV.md in the documentation folder](/documentation/ENV.md)

10- To run the frontend, navigate to the client folder in the terminal and then type:
```
npm start
```
11- To run the backend, open a new terminal, navigate to the server folder and then type:
```
npm run dev
```
12- Congratulations! You should have a working instance of the project on your system! We can't wait for your contributions!
