import utils from '../utils';

function SignInForm() {

    const getFormData = () => {

        var form = document.getElementById("signInForm").elements;
        var email = utils.check(form["iEmail"].value);
        if(email === null) return null;
        if(email.substring(email.indexOf('@') + 1) !== utils.possible_email[0]
        && email.substring(email.indexOf('@') + 1) !== utils.possible_email[1]) return null;
        var password = utils.check(form["iPassword"].value);
        if(password === null) return null;

        const formDataHolder = {
            email: email,
            password: password
        }

       return formDataHolder // If all values are there, create an object with them and return it
    }

    const task = (e) => { 
        e.preventDefault(); // Prevent form from refreshing the page on button click
        var data = getFormData();
        if(data === null)
        {
            alert("Invalid Sign In!");
        }
        else
        {
            alert(JSON.stringify(data));
        }
    }

    const Form = (
        <form id = "signInForm">
            <h3>Sign into your account!</h3>
            <label htmlFor="iEmail">E-mail Address:</label><br></br>
            <input type="text" name="iEmail"></input><br></br>
            <label htmlFor="iPassword">Password:</label><br></br>
            <input type="password" name="iPassword"></input><br></br>
            <button id='taskButton' onClick={task}>Sign In now!</button>
        </form>
    );

    return (
        <div>
            {Form}
        </div>
    );
}

export default SignInForm;