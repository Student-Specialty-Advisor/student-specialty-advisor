<h1 align="center">How to build</h1>
<h2>Installations</h2>



1- Install [Node.js](), at least version 17 or later versions

2- Install [MongoDB]() community version with compass included

3- Install [Git]() for source control

4- Install the source-code editor [VS Code]()

<h2>Setup</h2>

1- Clone the project using git and open it in VS Code

2- Open a new terminal in VS Code (preferably Git Bash)

3- Verify that Node.js, npm (should be included with Node.js) and git are correctly installed in your system by typing the following in the terminal
> node -v
> 
> npm --version
> 
> git --version

4- From the extensions sidebar, install the [Prettier]() extension

5- In VS Code settings, set Prettier to be the default Javascript formatter and enable format on save

6- In the terminal, navigate to the client folder and install the dependencies using npm
> cd client
> 
> npm install

7- In the terminal, go back to the root folder, then navigate to server folder and install the dependencies using npm
> cd ..
> 
> cd server
> 
> npm install

8- Inside the client folder, create a .env file with the following setup:
> REACT_APP_API_URL=http://localhost:8000/ssa-api/

9- Inside the server folder, create a .env file with following setup:
Make sure to adapt the variables between () accordingly:
> HASH_SALT=(number between 5-10)
> 
> TOKEN_KEY=(random-string)
>
> TOKEN_DURATION=(number)
>
> AUTH_EMAIL_USER=(if you want to test account email verification, input here the email of the account you are going to send verification emails from)
>
> AUTH_EMAIL_PASS=(password of the email account above)
>
> SHOULD_SEND_EMAIL=(YES or NO : if you want a verification email to be sent on account creation. Only works if SHOULD_VERIFY is set to YES)
>
> SHOULD_VERIFY=(YES or NO : if set to NO the newly created account will be automatically verified, allowing you to skip the email verification step)
