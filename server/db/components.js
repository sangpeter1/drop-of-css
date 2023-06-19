let bgColor;
let primaryColor;
let secondaryColor;
let tertiaryColor;

//for html style, would have an object and then within the object we would have props, that are the same as className (like navbar, dropbtn)

// type, name, html text with classes and actual color (eg "style=background-color: primaryColor"), css for export (preferably in JSX object format)

const components = [
  {
    type: "navbar",
    name: "Simple",
    htmlText: `
      <style>
        .navbar {
          background-color: inherit;
          font-size: calc(10px + 0.5vw);
          padding: 10px;
          text-align: center;
        }
        
        .navbar a {
          text-decoration: none;
          color: primaryColor;
          padding: 8px;
        }

        .navbar a:hover{
          border-bottom: 1px solid tertiaryColor;
          border-radius: .5rem;
        }

        @media screen and (max-width: 768px) {
          .navbar{
            font-size: calc(12px + 1vw);
          }
      </style>
      <body>
        <div class="navbar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </body>
    `,
  },
  {
    type: "navbar",
    name: "Dropdown",
    htmlText: `
    <style>
    .dropdownNav {
      display: flex;
      width: 100%;
      align-items: center;
      font-size: calc(12px + 0.5vw);
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: primaryColor;
      color: primaryColorContrast;
    }
    
    .drop-li {
      float: left;
    }
    
    .drop-li a,
    .dropbtn {
      display: inline-block;
      color: primaryColorContrast;
      text-align: center;
      padding: 16px;
      text-decoration: none;
    }
    
    .drop-li a:hover,
    .dropdown:hover .dropbtn {
      background-color: bgColor;
      color: bgColorContrast;
    }
    
    .drop-li .dropdown {
      display: inline-block;
    }
    
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: secondaryColor;
      color: secondaryColorContrast;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    
    .dropdown-content a {
      color: secondaryColorContrast;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      text-align: left;
    }
    
    .dropdown-content a:hover {
      background-color: primaryColor;
      color: primaryColorContrast;
    }
    
    .dropdown:hover .dropdown-content {
      display: block;
      color: primaryColor;
    }
    
    @media screen and (max-width: 768px) {
      .drop-li {
        flex-grow: 1;
        font-size: calc(12px + 1vw);

      }
    </style>
    <body>
    
    <ul class="dropdownNav">
    <li class="drop-li"><a href="#">Home</a></li>
    <li class="drop-li"><a href="#">News</a></li>
    <li class="dropdown drop-li">
      <a class="dropbtn">Dropdown</a>
      <div class="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </li>
  </ul>
    
    </body>
  `,
  },
  {
    type: "navbar",
    name: "Gradient Background",
    htmlText: `
      <style>
        .navbar {
          background: linear-gradient(to right, bgColor, secondaryColor);
          color: secondaryColorContrast;
          padding: 10px;
          display: flex;
          justify-content: center;
        }
        
        .navbar a {
          text-decoration: none;
          color: secondaryColorContrast;
          padding: 1rem;
        }
        .navbar a:hover{
            background: secondaryColor40;
            border-radius: 4px;
            box-shadow: 0 4px 30px rgba(100, 100, 100, 0.2);
            backdrop-filter: blur(21.4px);
            -webkit-backdrop-filter: blur(2.4px);
            outline: 1px solid rgba(255, 255, 255, 1); 
        }

        
        @media screen and (max-width: 768px) {
          .navbar{
            font-size: calc(12px + 1vw);
          }
      </style>
      <body>
        <div class="navbar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </body>
    `,
  },
  {
    type: "navbar",
    name: "Border Bottom",
    htmlText: `
      <style>
        .navbar {
          background-color: bgColor;
          color: bgColorContrast;
          padding: 10px;
          display: flex;
          justify-content: space-evenly;
          font-size: calc(10px + 0.5vw);
          border-bottom: 4px solid secondaryColor;
        }
        
        .navbar a {
          text-decoration: none;
          color: primaryColor;
          padding: 8px;
        }
        .navbar a:hover{
          color: white
        }
        
        @media screen and (max-width: 768px) {
          .navbar{
            font-size: calc(12px + 1vw);
          }
      </style>
      <body>
        <div class="navbar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </body>
    `,
  },

  //FORMS

  {
    type: "form",
    name: "Contact Us - Light",
    //front end preview window html
    htmlText: `
    <style>
    .formComponent {
      background-color: bgColor26;
      color: bgColorContrast;
      border: 2px solid primaryColor;
      border-radius: 2px;
      width: 50vw;
      min-height: 45vh;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 2rem 2rem 1fr;
      grid-column-gap: 4px;
      grid-row-gap: 4px;
    }
  
    .formComponent > h1 {
      grid-column: 1/ span 2;
      grid-row: 1;
      text-align: center;
      font-size: calc(12px + 0.5vw);
      margin-top: 4px;
      padding: 0;
    }
  
    .formComponent > h2 {
      grid-column: 1/ span 2;
      grid-row: 2;
      text-align: center;
      font-size: calc(8px + 0.5vw);
      margin: 0;
      padding: 0;
    }
  
    .formComponent > form {
      width: 80%;
      grid-column: 1;
      grid-row: 3/ span 3;
      font-size: calc(8px + 0.5vw);
      padding: 1rem;
    }
    .formComponent > form > input{
      border-radius: 4px; 
      border:2px solid primaryColor;
    }
    .formComponent > form > textarea{
      border-radius: 4px; 
      border:2px solid primaryColor;
      height: 2rem;
      resize: vertical; 
    }

    .formComponent > p {
      grid-column: 2;
      grid-row: 3/ span 3;
      font-size: calc(8px + 0.5vw);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 2px;
      margin-top: 0;
      padding-top: 0;
      word-wrap: break-word;
    }
  
    .formComponent > p > span {
      display: flex;
      align-items: center;
      margin-right: 5px;
      word-wrap: break-word;
    }
  
    #icon {
      padding: 1rem;
      font-size: calc(22px + 0.5vw);
      text-align: center;
      justify-content: center;
    }
    @media screen and (max-width: 1000px) {
      .formComponent {
        width: 100%;
      }}
  </style>
  
  <div class="formComponent">
    <h1>contact us!</h1>
    <h2>we'd love to hear from you</h2>
  
    <form>
      <input placeholder="Name"/>
      <input placeholder="Email Address"/>
      <input placeholder="Phone Number"/>
      <textarea placeholder="Message">
      </textarea>
      <div>
      <label> How should we contact you?
        <input type="checkbox" />
        <label>Phone</label>
        <input type="checkbox" />
        <label>Email</label>
      </label>
      </div>
      <div>
        <input type="radio" />
        <label>Agree to be contacted?</label>
      </div>
    </form>
    <p>
      <span id="icon">&#128382;</span>
      <span>phone</span>
      <span>(917) 867-5309</span>
      <span id="icon">&#x2709;</span>
      <span>email</span>
      <span>peter@peter.com</span>
    </p>
  </div>

    `,
  },
  {
    type: "form",
    name: "Contact Us - Dark",
    //front end preview window html
    htmlText: `
    <style>
    .formComponent {
      background-color: secondaryColor;
      color: secondaryColorContrast;
      border: 2px solid primaryColor;
      border-radius: 2px;
      width: 50vw;
      min-height: 45vh;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 2rem 2rem 1fr;
      grid-column-gap: 4px;
      grid-row-gap: 4px;
    }
  
    .formComponent > h1 {
      grid-column: 1/ span 2;
      grid-row: 1;
      text-align: center;
      font-size: calc(12px + 0.5vw);
      margin-top: 4px;
      padding: 0;
      color: white;
    }
  
    .formComponent > h2 {
      grid-column: 1/ span 2;
      grid-row: 2;
      text-align: center;
      font-size: calc(8px + 0.5vw);
      margin: 0;
      padding: 0;

    }
  
    .formComponent > form {
      width: 80%;
      grid-column: 1;
      grid-row: 3/ span 3;
      font-size: calc(8px + 0.5vw);
      padding: 1rem;
    }
    .formComponent > form > input{
      border-radius: 4px; 
      border:2px solid primaryColor;
    }
    .formComponent > form > textarea{
      border-radius: 4px; 
      border:2px solid primaryColor;
      height: 2rem;
      resize: vertical; 
    }

    .formComponent > p {
      grid-column: 2;
      grid-row: 3/ span 3;
      font-size: calc(8px + 0.5vw);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 2px;
      margin-top: 0;
      padding-top: 0;
      word-wrap: break-word;
    }
  
    .formComponent > p > span {
      display: flex;
      align-items: center;
      margin-right: 5px;
      word-wrap: break-word;
    }
  
    #icon {
      padding: 1rem;
      font-size: calc(22px + 0.5vw);
      text-align: center;
      justify-content: center;
    }

    @media screen and (max-width: 1000px) {
      .formComponent {
        width: 100%;
      }}
  </style>
  
  <div class="formComponent">
    <h1>contact us!</h1>
    <h2>we'd love to hear from you</h2>
  
    <form>
      <input placeholder="Name"/>
      <input placeholder="Email Address"/>
      <input placeholder="Phone Number"/>
      <textarea placeholder="Message">
      </textarea>
      <div>
      <label> How should we contact you?
        <input type="checkbox" />
        <label>Phone</label>
        <input type="checkbox" />
        <label>Email</label>
      </label>
      </div>
      <div>
        <input type="radio" />
        <label>Agree to be contacted?</label>
      </div>
    </form>
    <p>
      <span id="icon">&#128382;</span>
      <span>phone</span>
      <span>(917) 867-5309</span>
      <span id="icon">&#x2709;</span>
      <span>email</span>
      <span>peter@peter.com</span>
    </p>
  </div>

    `,
  },
  {
    type: "form",
    name: "Login - with OAuth",
    htmlText: `
    <style>  
    .loginWithOauth {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      min-width: 40vw;
      max-width: 60vw;
    }
  
    .login-container {
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: #000;
      padding: 20px;
      border-radius: 4px;
      border: 2px solid white;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden; /* Prevent vertical overflow */
    }
  
    .login-container input[type="text"],
    .login-container input[type="password"] {
      width: 90%;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid tertiaryColor;
      border-radius: 4px;
    }
  
    .login-container input[type="text"]:focus,
    .login-container input[type="password"]:focus {
      border: 2px solid secondaryColor;
      outline: none;
    }
  
    .login-container button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: secondaryColor;
      color: secondaryColorContrast;
      border: 2px solid secondaryColor;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .login-container button:hover {
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: 2px solid primaryColor;
    }
  
    .oauth-buttons {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .google-btn {
      margin: 25px;
      width: 80%;
      min-width: 184px;
      max-width: 184px;
      height: 42px;
      background-color: #fcfcfc;
      border-radius: 2px;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .2);
      cursor: pointer;
      user-select: none;
      transition: all 400ms ease 0s;
      display: flex;
    }
  
    .google-btn .google-icon-wrapper {
      position: absolute;
      margin-top: 1px;
      margin-left: 1px;
      width: 40px;
      height: 40px;
      border-radius: 2px;
      user-select: none;
    }
  
    .google-btn .google-icon-svg {
      position: absolute;
      margin-top: 11px;
      margin-left: 11px;
      width: 18px;
      height: 18px;
      user-select: none;
    }
  
    .google-btn .btn-text {
      float: right;
      margin: 11px 14px 40px 40px;
      color: #757575;
      font-size: 11px;
      align-items: center;
      letter-spacing: .2px;
      font-family: Roboto;
      user-select: none;
    }
  
    .google-btn:hover {
      box-shadow: 0 3px 8px secondaryColor40;
    }
    @media screen and (max-width: 768px) {
      .google-btn {
        margin: 10px 25px; /* Adjusted */
      }
  
      .oauth-buttons {
        flex-direction: column; /* Added */
        align-items: center; /* Added */
      }
    }
  </style>
  
  <div class="loginWithOauth">
    <div class="login-container">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <div class="oauth-buttons">
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
          </div>
          <p class="btn-text"><b>Sign in with Google</b></p>
        </div>
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/9/91/036-facebook.png" />
          </div>
          <p class="btn-text"><b>Sign in with Facebook</b></p>
        </div>
      </div>
    </div>
  </div>
  
    
    `,
  },

  {
    type: "form",
    name: "Generic Form",
    htmlText: `
    <style>
    #genericform > form {
      font-size: calc(12px + 0.5vw);
      background-color: primaryColor;
      color: primaryColorContrast;

      padding: 1rem;
    }
   #genericform > form > label {
      font-size: calc(12px + 0.5vw);
      color: white;
    }
    #genericform > form > input {
      color: white;
      border-radius: 0.5rem; 
      outline: none; 
      padding: 0.5rem; 
    }

    #genericform > form > #checkboxes{
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    #genericform > form > #radios{
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    #genericform > form > button{
      font-size: calc(12px + 0.5vw)
      border: none; 
      background-color: bgColor; 
      color: bgColorContrast;
      padding: 0.5rem 1rem; 
      border-radius: 0.25rem; 
    }

    #genericform > form > div > label {
      color: white;
    }
    
    #genericform > form > div > input {
      color: black;
    }
   #genericform > form >  button:hover{
      outline: 2px solid white; 
      background-color: bgColor40; 
      color: bgColorContrast;
      padding: 0.5rem 1rem; 
      border-radius: 0.25rem; 
      cursor: pointer;
    }
    </style>
    <div id="genericform">
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="insertfieldvalue">Type something here:</label>
          <input value="insert field value" id="inputField" placeholder="Type something here" style="border: 2px solid tertiaryColor">
        </div>
        <div id="checkboxes">
        <label for="checkbox">I am a checkbox button
          <input type="checkbox" id="checkbox"></label>
          <label for="checkbox">You can pick multiple checkboxes
          <input type="checkbox" id="checkbox"></label>
        </div>
        <div id="radios">
        <label for="radio1">I am a radio button
        <input type="radio" id="radio1" name="radio"></label>
        <label for="radio2">You can only choose one radio button!
        <input type="radio" id="radio2" name="radio"></label>
      </div>
        <button >
          Submit
        </button>
      </form>
    </div>
    `,
  },
  {
    type: "form",
    name: "Generic Form 2",
    htmlText: `
    <div>
      <form style="background-color: bgColor;       color: bgColorContrast;
      padding: 1rem;">
        <div style="margin-bottom: 1rem;">
          <label for="inputField" style="color: primaryColor;">Type something here:</label>
          <input id="inputField" placeholder="Type something here" style="border-radius: 0.5rem; border: 1px solid primaryColor; padding: 0.5rem; outline: none;">
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="checkbox" id="checkbox">
          <label for="checkbox" style="color: primaryColor;">I am a checkbox</label>
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="radio" id="radio">
          <label for="radio" style="color: primaryColor;">I am a radio</label>
        </div>
        <button style="border: 1px solid secondaryColor; color: tertiaryColor; background-color: bgColor;       color: bgColorContrast;
        padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
    `,
  },
  {
    type: "form",
    name: "Generic Form Three",
    htmlText: `
    <div>
      <form style="background-color: bgColor;       color: bgColorContrast;
      padding: 1rem;">
        <div style="margin-bottom: 1rem;">
          <label for="inputField" style="color: primaryColor;">Type something here:</label>
          <input id="inputField" placeholder="Type something here" style="border-radius: 0.5rem; border: 2px solid primaryColor; padding: 0.5rem; outline: none;">
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="checkbox" id="checkbox">
          <label for="checkbox" style="color: secondaryColor;">I am a checkbox</label>
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="radio" id="radio">
          <label for="radio" style="color: secondaryColor;">I am a radio</label>
        </div>
        <button style="border: none; background-color: primaryColor; color: primaryColorContrast; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
  `,
  },
  {
    type: "form",
    name: "Checkout - Payment",
    htmlText: `
    <style>
    .payment-form {
      min-width: 40vw;
      max-width: 60vw;
      margin: 0 auto;
      padding: 1rem;
      background-color: bgColor;
      color: bgColorContrast;
      border-radius: 4px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
    
    .payment-form h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .form-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }
    
    .form-row label {
      font-weight: bold;
    }
    
    .form-row input[type="text"] {
      padding: .5rem;
      border: 2px solid secondaryColor;
      border-radius: 4px;
    }
    
    .submit-button {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    
    .submit-button:hover {
      background-color: #333;
      color: black;

    }

    </style>
    <div class="payment-form">
  <h1>Payment Details</h1>
  
  <div class="form-row">
    <label for="card-number">Card Number</label>

    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
  </div>
  
  <div class="form-row">
    <label for="expiry-date">Expiry Date</label>
    <input type="text" id="expiry-date" placeholder="MM / YY" />
  </div>
  
  <div class="form-row">
    <label for="cvv">CVV</label>
    <input type="text" id="cvv" placeholder="123" />
  </div>
  
  <div class="form-row">
    <label for="name">Cardholder Name</label>
    <input type="text" id="name" placeholder="John Doe" />
  </div>
  
  <button class="submit-button">Submit Payment</button>
</div>

    
`,
  },
  {
    type: "form",
    name: "Checkout - Address",
    htmlText: `
    <style>
    .payment-form {
      min-width: 40vw;
      max-width: 60vw;
      margin: 0 auto;
      padding: 1rem;
      background-color: bgColor;
      color: bgColorContrast;
      border-radius: 4px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
  
    .payment-form h1 {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .form-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }
  
    .form-row label {
      font-weight: bold;
    }
  
    .form-row input[type="text"],
    .form-row select {
      padding: 10px;
      border: 2px solid secondaryColor;
      border-radius: 4px;
    }
  
    .form-row select {
      appearance: none;
      background-color: #fff;
    }
  
    .submit-button {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
  
    .submit-button:hover {
      background-color: #333;
    }
  </style>
  
  <div class="payment-form">
    <h1>Address Details</h1>
  
    <div class="form-row">
      <label for="street">Street Address</label>
      <input type="text" id="street" placeholder="123 Main St" />
    </div>
  
    <div class="form-row">
      <label for="city">City</label>
      <input type="text" id="city" placeholder="Enter your city" />
    </div>
  
    <div class="form-row">
      <label for="state">State</label>
      <select id="state">
        <option value="" disabled selected>Select State</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
    </div>
  
    <div class="form-row">
      <label for="zip">Zip Code</label>
      <input type="text" id="zip" placeholder="12345" minlength="5" maxlength="5" />
    </div>
  
    <button class="submit-button">Submit Address</button>
  </div>
  
  `,
  },

  //TITLES

  {
    type: "title",
    name: "Title & Subtitle",
    htmlText: `
    <style>
    .title-header{
      display: flex;

      float: left;
        color: primaryColor;
        font-weight: bold;
        text-align: left;
        margin: 2px;
        flex-grow: 1;
        flex-direction: column;
    }
    .title-header > h1{
      margin: 1px;
      padding: 1px;
      font-size: calc(22px + 0.5vw);
      display:block;
    }
    .title-header > h2{
      margin: 0px;
      padding: 0px;
      font-size: calc(8px + 0.5vw);
      display:block;

    }
    </style>

    <div class="title-header">
    <h1>Your Website Title</h1>
    <h2>Your Website Subtitle</h2>
  <div>
  `,
  },
  {
    type: "title",
    name: "Text Shadow",
    htmlText: `
    <style>
    .title-header{
      font-size: calc(32px + 1vw);
      color: primaryColor;
      font-weight: bold;
      text-align: left;
      margin: 10px 0;
      text-shadow: 2px 2px 4px secondaryColor;
    }
    </style >
    <h1 class="title-header">
      Your Website Title
    </h1>
  `,
  },
  {
    type: "title",
    name: "Uppercase",
    htmlText: `
    <style>
    .title-header{
      font-size: calc(32px + 1vw);
      color: primaryColor;
        fontWeight: bold;
        textAlign: left;
        margin: 10px 0;
        textShadow: 2px 2px secondaryColor;
        text-transform: uppercase;
    }
    </style >
    <h1 class="title-header">
      Your Website Title
    </h1>
  `,
  },
  {
    type: "title",
    name: "Neon Style",
    htmlText: `
    <style>
    .title-header{
      height: 100%;
      width: 100%;
      margin: 0;
      font-size: calc(32px + 1vw);
      color: primaryColor;
        text-shadow:
          0 0 5px secondaryColor,
          0 0 20px secondaryColor,
          0 0 40px secondaryColor,
          0 0 80px secondaryColor;
    }
    </style >
    <h1 class="title-header">
      Your Website Title
    </h1>
  `,
  },
  {
    type: "title",
    name: "Underline Style",
    htmlText: `
    <style>
    .title-header{
      height: 100%;
      width: 100%;
      margin: 0;
      font-size: calc(32px + 1vw);
      color: primaryColor;
      text-decoration: underline;
    }
    </style >
    <h1 class="title-header">
      Your Website Title
    </h1>
  `,
  },
  {
    type: "title",
    name: "Italic Style",
    htmlText: `
    <style>
    .title-header{
      height: 100%;
      width: 100%;
      margin: 0;
      font-size: calc(32px + 1vw);
        color: primaryColor;
        font-style: italic;
    }
    </style >
    <h1 class="title-header">
      Your Website Title
    </h1>
  `,
  },
  {
    type: "title",
    name: "Border Top",
    htmlText: `
    <style>
    .title-header{
      border-top: 4px solid secondaryColor;
      height: 100%;
      
      margin: 0;
      padding-left: 2rem;
      font-size: calc(22px + 1vw);
      text-align: left;
      color: primaryColor;
      font-variant-caps: all-small-caps;
    }
    </style >
    <h1 class="title-header">
      Your Website Title
    </h1>
  `,
  },
  {
    type: "title",
    name: "Border Gradiant",
    htmlText: `
    <style>
    .title-header{
      border-bottom: 6px solid;
      border-image: linear-gradient(to right, bgColor, secondaryColor) 1;

      height: 100%;
      
      margin: 0;
      padding-left: 2rem;
      font-size: calc(22px + 1vw);
      text-align: left;
      color: primaryColor;
      font-variant-caps: all-small-caps;
    }
    </style >
    <h1 class="title-header">
      Your Website Title
    </h1>
  `,
  },

  //BUTTONS
  {
    type: "button",
    name: "Basic Color Buttons",
    htmlText: `
    <style>
    .mui-style-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      color: #fff;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
      transition: background-color 0.3s ease;
    }
  
    .mui-style-button:hover {
      background-color: #888;
    }
  
    .mui-style-primary {
      background-color: primaryColor;
    }
  
    .mui-style-secondary {
      background-color: secondaryColor;
    }
  
    .mui-style-tertiary {
      background-color: tertiaryColor;
    }
  
    .mui-style-bg {
      background-color: bgColor;
    }
  </style>
  
  <div style="display: flex; justify-content: space-around;">
    <button class="mui-style-button mui-style-primary">
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-secondary">
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-tertiary">
      Click Me
    </button>
  </div>
  
  `,
  },
  {
    type: "button",
    name: "Variety: Text, Outlined, Contained)",
    htmlText: `
    <style>

    #basic-text-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      background-color: transparent;
      color: primaryColor;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 0;
      cursor: pointer;
      margin: 2px;
    }

    #basic-contained-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      background-color: primaryColor;
      color: #fff;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
    }

    #basic-outlined-button{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      background-color: transparent;
      color: primaryColor;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: 2px solid primaryColor;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
    }
  </style>
  <div style="display:flex; justify-content: space-around;">
  <button id="basic-text-button">
    Click Me
  </button>

    <button id="basic-outlined-button">
      Click Me
    </button>

    <button id="basic-contained-button">
    Click Me
  </button>
  
  </div>
  `,
  },
  {
    type: "button",
    name: "Bold Buttons",
    htmlText: `
    <style>
    .custom-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .custom-button:hover {
      background-color: #888;
    }
  
    .custom-button-primary {
      color: #fff;
      background-color: primaryColor;
    }
  
    .custom-button-secondary {
      color: #fff;
      background-color: secondaryColor;
    }
  
    .custom-button-tertiary {
      color: #fff;
      background-color: tertiaryColor;
    }
  
    .custom-button-outline {
      color: primaryColor;
      background-color: transparent;
      border: 2px solid primaryColor;
    }
  </style>
  
  <div style="display: flex; justify-content: space-around;">
    <a class="custom-button custom-button-primary" href="#">Primary</a>
    <a class="custom-button custom-button-secondary" href="#">Secondary</a>
    <a class="custom-button custom-button-tertiary" href="#">Tertiary</a>
    <a class="custom-button custom-button-outline" href="#">Outline</a>
  </div>
  
  `,
  },
  {
    type: "button",
    name: "Social Media Icons",
    htmlText: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <style>
      .social-button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 30px
        max-width: 50px;
        min-height: 30px
        max-height: 50px;
        color: #fff;
        font-size: calc(8px + 0.5vw);
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 2px;
        transition: background-color 0.3s ease;
      }
    
      .social-button:hover {
        background-color: bgColor;
        outline: 1px solid primaryColor;

      }
    
      .facebook-button {
        background-color: #3b5998;
      }
    
      .twitter-button {
        background-color: #1da1f2;
      }
    
      .instagram-button {
        background-color: #e4405f;
      }
    
      .linkedin-button {
        background-color: #0077b5;
      }
    </style>
    
<div style="display: flex; justify-content: space-around;">
<button class="social-button facebook-button">
  <i class="fab fa-facebook-f"></i>
</button>

<button class="social-button twitter-button">
  <i class="fab fa-twitter"></i>
</button>

<button class="social-button instagram-button">
  <i class="fab fa-instagram"></i>
</button>

<button class="social-button linkedin-button">
  <i class="fab fa-linkedin-in"></i>
</button>
</div>
    `,
  },
  {
    type: "button",
    name: "Icon Buttons",
    htmlText: `
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <style>
      .mui-style-icon-button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 30px
        max-width: 50px;
        min-height: 30px
        max-height: 50px;
        color: #fff;
        font-size: calc(8px + 0.5vw);
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 2px;
        transition: background-color 0.3s ease;
      }
    
      .mui-style-icon-button:hover {
        background-color: #888;
      }
    
      .mui-style-primary {
        background-color: primaryColor;
      }
    
      .mui-style-secondary {
        background-color: secondaryColor;
      }
    
      .mui-style-tertiary {
        background-color: tertiaryColor;
      }
    
      .mui-style-bg {
        background-color: bgColor;
      }
    </style>
    
    <div style="display: flex; justify-content: space-around;">
      <button class="mui-style-icon-button mui-style-primary">
        <span class="material-icons">home</span>
      </button>
    
      <button class="mui-style-icon-button mui-style-secondary">
        <span class="material-icons">favorite</span>
      </button>
    
      <button class="mui-style-icon-button mui-style-tertiary">
        <span class="material-icons">settings</span>
      </button>
    </div>
    
  `,
  },
  {
    type: "button",
    name: "Disabled Buttons",
    htmlText: `
    <style>
    .mui-style-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      color: #fff;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
      transition: background-color 0.3s ease;
      border: 2px solid transparent;
    }
  
    .mui-style-button:hover {
      background-color: #888;
    }
  
    .mui-style-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .mui-style-primary {
      background-color: primaryColor;
      border-color: secondaryColor;
    }
  
    .mui-style-secondary {
      background-color: secondaryColor;
      border-color: tertiaryColor;
    }
  
    .mui-style-tertiary {
      background-color: tertiaryColor;
      border-color: primaryColor;
    }
  
    .mui-style-bg {
      background-color: bgColor;
      border-color: bgColor;
    }
  </style>
  
  <div style="display: flex; justify-content: space-around;">
    <button class="mui-style-button mui-style-primary" disabled>
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-secondary" disabled>
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-tertiary" disabled>
      Click Me
    </button>
  </div>
  
  `,
  },
  {
    type: "card",
    name: "Product - Generic",
    htmlText: `
    <style>
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 3px solid primaryColor;
      background-color: bgColor0D;
      color: bgColorContrast;
      border-radius: 6px;
      padding: 4px;
      box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
    .card > img {
      width: 95%;
      height: auto;
      aspect-ratio: 1/1;
      box-shadow: 0 3px 3px 0px secondaryColor;
      margin: 1rem 0.5rem;
    }
    .cardcontent{
      flex-direction: column;
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      font-size: calc(10px + 0.5vw);
      padding: 8px;
    }
    .action-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .5rem;
      padding: .25rem;
    }

    .button {
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      align-items: center;
      font-size: calc(6px + 0.5vw);
      background-color: 0;
      border: none;
      color: black;
      margin: 4px;
      padding: .3rem;
      border-radius: 5px;
    }
    .button:hover{
      background-color: bgColor40;
      color: bgColorContrast;
      cursor: pointer;
    }
    .card:hover {
      transform: scale(1.01);
    }
    
    @media screen and (max-width: 1000px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        box-sizing: border-box;
        margin: 1rem;   
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      @media screen and (max-width: 768px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      }
    @media screen and (max-width: 550px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        width: 90%;
        min-width: none;
        aspect-ratio: 8/10;
        box-sizing: border-box;
        margin: 1rem;
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      
    </style>

    <div class="card"> 
    <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png"></img>

    <div class="cardcontent">Here's some fun text about whatever item you're putting in here! 
    <div class="action-items">

       <div class="button">Learn More!</div>
       <div class="button">Add to Cart!</div>
       <div class="button">&#x2665;</div>

      </div>
    </div>

    </div>
    `,
  },
  {
    type: "card",
    name: "Product - Gradient BG",
    htmlText: `
    <style>
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 2px solid primaryColor;
      background-image: linear-gradient(to right, tertiaryColor, bgColor);
      border-radius: 6px;
      padding: 4px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
    .card > img {
      width: 95%;
      height: auto;
      aspect-ratio: 1/1;
      box-shadow: 1px 1px 1rem secondaryColor;
      margin: 1rem 0.5rem;
    }
    .cardcontent{
      flex-direction: column;
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      font-size: calc(10px + 0.5vw);
      padding: 8px;
      color: white;
    }
    .action-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .5rem;
      padding: .25rem;
    }

    .button {
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      align-items: center;
      font-size: calc(6px + 0.5vw);
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: 1px solid secondaryColor;
      color: white;
      margin: 4px;
      padding: .3rem;
      border-radius: 5px;
    }

    .button:hover{
      cursor: pointer;
      background-color: bgColor;
      color: bgColorContrast;
      border: 1px solid primaryColor;
    }
    
    @media screen and (max-width: 1000px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        box-sizing: border-box;
        margin: 1rem;
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      @media screen and (max-width: 768px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      }

    @media screen and (max-width: 550px) {
      main > #previewCardContainer{
        min-height: none;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        aspect-ratio: none;
      }
      #previewCardContainer > #previewCard {
        aspect-ratio: 10/9;
      }
      .card {
        width: 90%;
        min-width: none;
        aspect-ratio: 8/10;
        box-sizing: border-box;
        margin: 1rem;
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      
    </style>

    <div class="card"> 
    <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png"></img>

    <div class="cardcontent">Here's some fun text about whatever item you're putting in here! 
    <div class="action-items">

       <div class="button">Learn More!</div>
       <div class="button">Add to Cart!</div>
       <div class="button">&#x2665;</div>

      </div>
    </div>

    </div>`,
  },
  {
    type: "card",
    name: "Product - Curved Edges",
    htmlText: `
    <style>
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 2px solid primaryColor;
      background-color: bgColor;
      color: bgColorContrast;
      border-radius: 2rem;
      padding: 4px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
    .card > img {
      width: 95%;
      height: auto;
      aspect-ratio: 1/1;
      box-shadow: 1px 1px 1rem primaryColor;
      margin: 1rem 0.5rem;
    }
    .cardcontent{
      flex-direction: column;
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      font-size: calc(10px + 0.5vw);
      padding: 8px;
    }
    .action-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .5rem;
      padding: .25rem;
    }

    .button {
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      align-items: center;
      font-size: calc(6px + 0.5vw);
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: 1px solid primaryColor;
      color: white;
      margin: 4px;
      padding: .3rem;
      border-radius: 5px;
    }
    .button:hover{
      background-color: bgColor;
      color: bgColorContrast;
      cursor: pointer;
    }
    .card:hover {
      transform: scale(1.01);
    }
    
    @media screen and (max-width: 1000px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        box-sizing: border-box;
        margin: 1rem;   
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      @media screen and (max-width: 768px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      }
    @media screen and (max-width: 550px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        width: 90%;
        min-width: none;
        aspect-ratio: 8/10;
        box-sizing: border-box;
        margin: 1rem;
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
    </style>

    <div class="card"> 
    <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png"></img>

    <div class="cardcontent">Here's some fun text about whatever item you're putting in here! 
    <div class="action-items">

       <div class="button">Learn More!</div>
       <div class="button">Add to Cart!</div>
       <div class="button">&#x2665;</div>

      </div>
    </div>
    </div>
    `,
  },
  {
    type: "card",
    name: "Product - Hover Grow",
    htmlText: `
    <style>
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 2px solid primaryColor;
      background-color: bgColor;
      color: bgColorContrast;
      border-radius: 6px;
      padding: 4px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
    .card > img {
      width: 95%;
      height: auto;
      aspect-ratio: 1/1;
      box-shadow: 1px 1px 1rem primaryColor;
      margin: 1rem 0.5rem;
    }
    .cardcontent{
      flex-direction: column;
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      font-size: calc(10px + 0.5vw);
      padding: 8px;
    }
    .action-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .5rem;
      padding: .25rem;
    }

    .button {
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      align-items: center;
      font-size: calc(6px + 0.5vw);
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: 1px solid primaryColor;
      color: white;
      margin: 4px;
      padding: .3rem;
      border-radius: 5px;
    }
    .button:hover{
      background-color: bgColor;
      color: bgColorContrast;
      cursor: pointer;
    }
    .card:hover {
      transform: scale(1.01);
    }
    
    @media screen and (max-width: 1000px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        box-sizing: border-box;
        margin: 1rem;   
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      @media screen and (max-width: 768px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      }
    @media screen and (max-width: 550px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        width: 90%;
        min-width: none;
        aspect-ratio: 8/10;
        box-sizing: border-box;
        margin: 1rem;
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      
    </style>

    <div class="card"> 
    <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png"></img>

    <div class="cardcontent">Here's some fun text about whatever item you're putting in here! 
    <div class="action-items">

       <div class="button">Learn More!</div>
       <div class="button">Add to Cart!</div>
       <div class="button">&#x2665;</div>

      </div>
    </div>

    </div>
    `,
  },
  {
    type: "card",
    name: "Shopping - Generic",
    htmlText: `
      <style>
        .card {
          box-sizing: border-box;
          aspect-ratio: 9/16;
          min-height: 30vh;
          max-width: 20vw;
          border: 3px solid primaryColor;
          background-color: bgColor0D;
          color: bgColorContrast;
          border-radius: 10px;
          padding: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }
  
        .card > img {
          max-height: 70%;
          max-width: 100%;
          object-fit: cover;
          border-radius: 5px;
          box-shadow: 0 3px 3px 0px secondaryColor;

        }
  
        .card-content {
          flex-grow: 1;
          padding: 8px;
          color: secondaryColor;
        }
  
        .card-title {
          font-size: calc(14px + 0.5vw);
          font-weight: bold;
          margin-bottom: 4px;
        }
  
        .card-description {
          font-size: calc(8px + 0.5vw);
          margin-bottom: 8px;
        }
  
        .card-price {
          font-size: calc(10px + 0.5vw);
          font-weight: bold;
        }
  
        .button {
          box-sizing: border-box;
          font-size: 14px;
          background-color: tertiaryColor;
          color: tertiaryColorContrast;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
        }
        .button:hover{
          cursor: pointer;
          box-sizing: border-box;
          padding: 6.5px 16px;
          background-color: bgColor;
          color: bgColorContrast;
          border: 2px solid tertiaryColor
        }

      @media screen and (max-width: 1000px) {
          main > #previewCardContainer{
            min-height: none;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            aspect-ratio: none;
          }
          #previewCardContainer > #previewCard {
            aspect-ratio: 9/16;
          }
        .card {
          box-sizing: border-box;
          margin: 1rem;
          min-height: none;
          max-width: none;
        }
        .card > img {
          width: 90%;
          height: auto;
          aspect-ratio: 1/1;
          box-shadow: 1px 1px 1rem secondaryColor;
          margin: 1rem 0.5rem;
        }
        .cardcontent{
          font-size: calc(12px + 1vw);
          padding: 8px;
        }
        .action-items {
          margin-top: 2rem;
          padding: .5rem;
        }
        .button {
          font-size: calc(10px + 0.5vw);
          margin: 8px;
          padding: 8px;
          border-radius: 5px;
        }
      }
        @media screen and (max-width: 768px) {
          main > #previewCardContainer{
            min-height: none;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            aspect-ratio: none;
          }
          #previewCardContainer > #previewCard {
            aspect-ratio: 10/9;
          }
          .card {
            box-sizing: border-box;
            aspect-ratio: 1/1;
            min-height: none;
            max-width: none;
        }
      }
      @media screen and (max-width: 550px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 1/1;
        }
        .card {
          width: 90%;
          min-width: none;
          aspect-ratio: 8/10;
          box-sizing: border-box;
          margin: 1rem;
          min-height: none;
          max-width: none;
        }
        .card > img {
          width: 90%;
          height: auto;
          aspect-ratio: 1/1;
          box-shadow: 1px 1px 1rem secondaryColor;
          margin: 1rem 0.5rem;
        }
        .cardcontent{
          font-size: calc(12px + 1vw);
          padding: 8px;
        }
        .action-items {
          margin-top: 2rem;
          padding: .5rem;
        }
        .button {
          font-size: calc(10px + 0.5vw);
          margin: 8px;
          padding: 8px;
          border-radius: 5px;
        }  

      </style>
  
      <div class="card">
      <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png" />
      <div class="card-content">
          <h2 class="card-title">Product Title</h2>
          <p class="card-description">Product description goes here.</p>
          <p class="card-price">$19.99</p>
        </div>
        <button class="button">Add to Cart</button>
      </div>
    `,
  },
  {
    type: "card",
    name: "Shopping - Hover Grow",
    htmlText: `
    <style>
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 2px solid primaryColor;
      background: linear-gradient(to right, bgColor, secondaryColor);
      border-radius: 6px;
      padding: 4px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
    .card > img {
      width: 95%;
      height: auto;
      aspect-ratio: 1/1;
      box-shadow: 1px 1px 1rem primaryColor;
      margin: 1rem 0.5rem;
    }
    .cardcontent{
      flex-direction: column;
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      font-size: calc(10px + 0.5vw);
      padding: 8px;
    }
    .action-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .5rem;
      padding: .25rem;
    }

    .button {
      display: flex;
      justify-content: center;
      align-self: stretch;
      align-items: center;
      font-size: calc(6px + 0.5vw);
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: 1px solid primaryColor;
      margin: 4px;
      padding: .3rem;
      border-radius: 5px;
    }
    .button:hover{
      background-color: bgColor;
      color: bgColorContrast;
      cursor: pointer;
    }
    .card:hover {
      transform: scale(1.01);
    }
    
    @media screen and (max-width: 1000px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      .card {
        box-sizing: border-box;
        margin: 1rem;
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      @media screen and (max-width: 768px) {
        main > #previewCardContainer{
          min-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          aspect-ratio: none;
        }
        #previewCardContainer > #previewCard {
          aspect-ratio: 10/9;
        }
      }
    @media screen and (max-width: 550px) {
      .card {
        width: 90%;
        min-width: none;
        aspect-ratio: 8/10;
        box-sizing: border-box;
        margin: 1rem;
      }
      .card > img {
        width: 90%;
        height: auto;
        aspect-ratio: 1/1;
        box-shadow: 1px 1px 1rem secondaryColor;
        margin: 1rem 0.5rem;
      }
      .cardcontent{
        font-size: calc(12px + 1vw);
        padding: 8px;
      }
      .action-items {
        margin-top: 2rem;
        padding: .5rem;
      }
      .button {
        font-size: calc(10px + 0.5vw);
        margin: 8px;
        padding: 8px;
        border-radius: 5px;
      }
    }
      
    </style>

  
      <div class="card">
      <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png" />
        <div class="card-content">
          <h2 class="card-title">Product Title</h2>
          <p class="card-description">Product description goes here. And look, this card grows on hover.</p>
          <p class="card-price">$19.99</p>
        </div>
        <button class="button">Add to Cart</button>
      </div>
    `,
  },
  {
    type: "card",
    name: "Social Media Photo Card",

    htmlText: `
      <style>

      main > #previewCardContainer{
        min-height: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        aspect-ratio: none;
      }
      #previewCardContainer > #previewCard {
        aspect-ratio: 1/1;
      }
        .card {
          background-color: white;
          border: 2px solid primaryColor;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          max-width: 100%;
          margin: 0 auto;
        }
  
        .card-header {
          display: flex;
          align-items: center;
          padding: 8px;
        }
  
        .card-header img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 8px;
        }
  
        .card-header .username {
          font-weight: bold;
          color: secondaryColor;
        }
  
        .card-image img {
          max-width: 100%;
          object-fit: cover;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
        }
  
        .card-content {
          padding: 8px;
        }
        .card-content .icons {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
  
        .card-content .icons .icon {
          margin-right: 4px;
        }
        .card-content #likesandcomments{
          display: flex;
          justify-content: space-evenly;
        }

        .card-content .caption {
          text-align: left;
          margin-bottom: 4px;
          margin-top: 0;
        }
  
        .card-content .likes {
          color: #8e8e8e;
          font-size: 12px;
        }

        @media screen and (max-width: 768px) {
          main > #previewCardContainer{
            min-height: none;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            aspect-ratio: none;
          }
          #previewCardContainer > #previewCard {
            aspect-ratio: 10/9;
          }
        }
        @media screen and (max-width: 550px) {
          .card {
            width: 90%;
            max-width: 90%;
            min-width: none;
            min-height: none;
            aspect-ratio: 1/1;
            box-sizing: border-box;
            margin: 1rem;
            grid-column-gap: 0;
          }
          .card > img {
            width: 90%;
            height: auto;
            aspect-ratio: 1/1;
            box-shadow: 1px 1px 1rem secondaryColor;
            margin: 1rem 0.5rem;
          }
          .cardcontent{
            font-size: calc(12px + 1vw);
            padding: 8px;
          }
          .action-items {
            margin-top: 2rem;
            padding: .5rem;
          }
          .button {
            font-size: calc(10px + 0.5vw);
            margin: 8px;
            padding: 8px;
            border-radius: 5px;
          }

      </style>
  
      <div class="card">
        <div class="card-header">
          <img src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" />
          <span class="username">username</span>
        </div>
        <div class="card-image">
          <img src="https://www.moatrek.com/sites/default/files/styles/1200_x_630/public/2016-10/Nature-Cruise-Milford-Sound.jpg?itok=fT2KvZs6" />
        </div>
        <div class="card-content">
        <div class="icons">
        <img class="icon" src="https://clipart-library.com/new_gallery/23-239546_png-black-and-white-library-chalk-heart-clipart.png" style="width:18px;height:16px;" alt="Heart Icon" />
        <img class="icon" src="https://clipart-library.com/images/8T686eR7c.png" style="width:16px;height:16px;" alt="Comment Icon" />
        <img class="icon" src="https://clipart-library.com/data_images/405621.png" style="width:32px;height:16px;" alt="Share Icon" />
      </div>
          <p class="caption">oh. em. geeeeeee this place #takemeback</p>
          <div id="likesandcomments">
          <p class="likes">Likes: 12,034</p>
          <p class="likes">Comments: 847</p>
          <div>
        </div>
      </div>
    `,
  },

  {
    type: "card",
    name: "Photo Card",

    htmlText: `
      <style>

  main > #previewCardContainer{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        aspect-ratio: 1/1;
      }

      #previewCardContainer > #previewCard {
        aspect-ratio: 1/1;
      }
  .card {
    grid-gap: 0.5vw;
    justify-items: center;
    aspect-ratio: 1/1;
    min-width: 25vw;
    max-width: 100%;
    min-height: 0;
    border: 2px solid primaryColor;
    background-color: white;
    border-radius: 2px;
    padding: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.01);
  }

  .card > img {
    aspect-ratio: 16/9
    max-height: 80%;
    max-width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .card-content {
    flex-grow: 1;
    padding: 4px;
    color: secondaryColor;
  }

  .card-title {
    font-size: calc(12px + 0.5vw);
    font-weight: bold;
    margin-bottom: 4px;
  }

  .card-description {
    font-size: calc(8px + 0.5vw);
    margin-bottom: 8px;
  }

  @media screen and (max-width: 768px) {
    main > #previewCardContainer{
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      aspect-ratio: 1/1;
    }
    .card {
      aspect-ratio: 1/1;
      min-width: 50vw;
      min-height: 0;
    }
  }
</style>

<div class="card">
  <img src="https://www.moatrek.com/sites/default/files/styles/1200_x_630/public/2016-10/Nature-Cruise-Milford-Sound.jpg?itok=fT2KvZs6" />
  <div class="card-content">
    <h2 class="card-title">Location</h2>
    <p class="card-description">Location description goes here. And look, this card grows on hover.</p>
  </div>
</div>`,
  },

  {
    type: "sideNav",
    name: "Side Nav",
    htmlText: `
    <style>
    .sidebar {
      margin: 0;
      padding: 0;
      min-width: 10vw;
      background-color: bgColor;
      color: bgColorContrast;
      min-height: 70vh;
      overflow: auto;
      border: 2px solid primaryColor;
    }
    
    /* Sidebar links */
    .sidebar a {
      display: block;
      color: black;
      padding: 16px;
      text-decoration: none;
    }
    .sidebar a:hover{
      color: white;
    }
    </style>
    <div class="sidebar">
  <a class="active" href="#">Home</a>
  <a href="#">News</a>
  <a href="#">Contact</a>
  <a href="#">About</a>
</div>
    `,
  },
  {
    type: "sideNav",
    name: "SideNav 2",
    htmlText: `
      <style>
        @media screen and (max-width: 900px) {
          .sidebar {
            display: none;
          }
        }
  
        .sidebar {
          margin: 0;
          padding: 0;
          min-width: 10vw;
          max-width: 100%;
          background-color: bgColor;
          color: bgColorContrast;
          min-height: 70vh;
          overflow: auto;
          border: 2px solid primaryColor;
        }
  
        /* Sidebar links */
        .sidebar a {
          display: block;
          color: black;
          padding: 16px;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
  
        .sidebar a:hover {
          background-color: secondaryColor;
          color: secondaryColorContrast;
        }
      </style>
  
      <div class="sidebar">
        <a class="active" href="#">Home</a>
        <a href="#">News</a>
        <a href="#">Contact</a>
        <a href="#">About</a>
      </div>
    `,
  },
  {
    type: "sideNav",
    name: "Side Nav 3",
    htmlText: `
      <style>
        @media screen and (max-width: 900px) {
          .sidebar {
            display: none;
          }
        }
  
        .sidebar {
          background-color: bgColor;
          color: bgColorContrast;
          height: 100%;
          overflow: auto;
          border-right: 2px solid primaryColor;
          padding-top: 20px;
        }
  
        .sidebar a {
          display: block;
          color: secondaryColor;
          border-bottom: 2px solid bgColor;
          padding: .3rem .7rem;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
  
        .sidebar a:hover {
          background-color: tertiaryColor;
          color: tertiaryColorContrast;

          border-bottom: 2px solid secondaryColor;
        }
      </style>
  
      <div class="sidebar">
      <a class="active" href="#">Home</a>
      <a href="#">News</a>
      <a href="#">Contact</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Portfolio</a>
      <a href="#">Gallery</a>
      <a href="#">Blog</a>
      <a href="#">Shop</a>
      <a href="#">Events</a>
      <a href="#">Team</a>
      <a href="#">FAQ</a>
      <a href="#">Pricing</a>
      <a href="#">Testimonials</a>
      <a href="#">Contact Us</a>
      </div>
    `,
  },
  {
    type: "sideNav",
    name: "Dropdown SideNav",
    htmlText: `
      <style>
        @media screen and (max-width: 900px) {
          .sidebar {
            display: none;
          }
        }
  
        .sidebar {
          width: 150px;
          background-color: bgColor;
          color: bgColorContrast;
          height: 70vh;
          overflow: auto;
          border-right: 2px solid primaryColor;
          padding: 10px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          position: relative;
        }
  
        .sidebar a {
          display: block;
          color: primaryColor;
          padding: 10px;
          text-decoration: none;
          transition: color 0.3s ease;
        }
  
        .sidebar a:hover {
          background-color: primaryColor;
          color: primaryColorContrast;

        }
  
        .sidebar a.active {
          background-color: secondaryColor;
          color: secondaryColorContrast;
        }
  
        .sidebar .dropdown {
          position: relative;
        }
  
        .sidebar a.has-dropdown::after {
          content: ' ▼';
          margin-left: 5px;
        }
  
        .sidebar a.has-dropdown:hover::after {
          color: tertiaryColor;
        }
  
        .sidebar .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          margin-bottom: 50px;
          width: 147px;
          background-color: bgColor;
          color: bgColorContrast;
          border: 2px solid primaryColor;
          z-index: 1;
        }
  
        .sidebar .dropdown-content a {
          display: block;
          padding: 8px 16px;
          color: black;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
  
        .sidebar .dropdown-content a:hover {
          background-color: secondaryColor;
          color: secondaryColorContrast;
          
        }
  
        .sidebar .dropdown:hover .dropdown-content {
          display: block;
        }

      </style>
  
      <div class="sidebar">
        <a class="active" href="#">Home</a>
        <a href="#">News</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Testimonials</a>
        <div class="dropdown">
        <a class="has-dropdown" href="#">Contact</a>
        <div class="dropdown-content">
          <a href="#">Sublink 1</a>
          <a href="#">Sublink 2</a>
        </div>
      </div>
      </div>
    `,
  },
];

module.exports = components;
