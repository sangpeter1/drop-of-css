let bgColor;
let primaryColor;
let secondaryColor;
let tertiaryColor;

//for html style, would have an object and then within the object we would have props, that are the same as className (like navbar, dropbtn)

// type, name, html text with classes and actual color (eg "style=background-color: primaryColor"), css for export (preferably in JSX object format)

const components = [
  {
    type: "navbar",
    name: "plain nav bar",
    htmlText: `
     <ul class={navbar} style=subStyleOne>
        <li style="padding-left: 1rem; color: inherit">
          <a href="#home" style="color: inherit">Home</a>
        </li>
        <li style="padding-left: 1rem; color: inherit">
          <a href="#about" style="color: inherit">About</a>
        </li>
        <li style="padding-left: 1rem; color: inherit">
          <a href="#services" style="color: inherit">Services</a>
        </li>
        <li style="padding-left: 1rem; color: inherit">
          <a href="#contact" style="color: inherit">Contact</a>
        </li>
        <li style="padding-left: 1rem; color: inherit">
          <div class="dropdown">
            <button class="dropbtn">Dropdown
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content" "style=background-color: primaryColor";
            >
              <a href="#" >Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </li>
      </ul>`,
    htmlStyle: {
      colors: {
        primaryColor,
        secondaryColor,
        tertiaryColor,
        bgColor,
      },
      styles: {
        navbar: {
          navbar: "border: 10px solid red",
          backgroundColor: `{bgColor}`,
          boxSizing: "content-box",
          display: "grid",
          gridAutoFlow: "row",
          gridColumn: "1/3",
          gridRow: 2,
          fontSize: "1.2rem",
          color: `{primaryColor}`,
          textAlign: "center",
          margin: 0,
          height: "100%",
          width: "100%",
          verticalAlign: "center",
          letterSpacing: "2px",
          listStyle: "none",
          borderBottom: `5px solid {tertiaryColor}`,
          textDecoration: `underline {secondaryColor}`,
        },
      
        ul: {
          backgroundColor: `{secondaryColor}`,
          listStyleType: 'none',
          height: '100%',
          margin: '0',
          paddingLeft: '1rem',
          color: '#FFFFFF',
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          textDecoration: 'none',
        },
        
        dropdownContent: {
          display: 'none',
          position: 'absolute',
          minWidth: '160px',
          boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
          zIndex: '1',
        },
        'dropdownContent a': {
          float: 'none',
          color: 'black',
          padding: '12px 16px',
          textDecoration: 'none',
          display: 'block',
          textAlign: 'left',
        },
        'dropdown:hover .dropdownContent': {
          display: 'block',
        },
      },  
    },
  },
  
  //FORMS 
  
  {
    type: "form",
    name: "joe's test form",
    //front end preview window html
    htmlText: `
    <div>
      <form style="background-color: bgColor">
        <input placeholder='type something here'/ style="border-radius: .5rem; border:4px solid primaryColor">
        <div>
          <input type="checkbox">
          <label> I am a check box </label> 
        </div>
        <div>
          <input type="radio">
          <label> I am a radio </label>
        </div>
        <button style="border: .5rem solid secondaryColor"> Submit </button>
      </form>
      </div>
    `,
  },
  {
    type: "form",
    name: "form one",
    htmlText: `
    <div>
      <form style="background-color: primaryColor; padding: 1rem;">
        <div style="margin-bottom: 1rem;">
          <label for="inputField" style="color: tertiaryColor;">Type something here:</label>
          <input id="inputField" placeholder="Type something here" style="border-radius: 0.5rem; border: 2px solid secondaryColor; padding: 0.5rem; outline: none;">
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="checkbox" id="checkbox">
          <label for="checkbox" style="color: secondaryColor;">I am a checkbox</label>
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="radio" id="radio">
          <label for="radio" style="color: secondaryColor;">I am a radio</label>
        </div>
        <button style="border: none; background-color: tertiaryColor; color: primaryColor; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
    `,
  },
  {
    type: "form",
    name: "form two",
    htmlText: `
    <div>
      <form style="background-color: bgColor; padding: 1rem;">
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
        <button style="border: 1px solid secondaryColor; color: tertiaryColor; background-color: bgColor; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
    `,
  },
  {
  type: "form",
  name: "form three",
  htmlText: `
    <div>
      <form style="background-color: bgColor; padding: 1rem;">
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
        <button style="border: none; background-color: primaryColor; color: bgColor; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
  `,
  },
  {
  type: "form",
  name: "form four",
  htmlText: `
    <div>
      <form style="background-color: secondaryColor; padding: 1rem;">
        <div style="margin-bottom: 1rem;">
          <label for="inputField" style="color: tertiaryColor;">Type something here:</label>
          <input id="inputField" placeholder="Type something here" style="border-radius: 0.5rem; border: 2px solid tertiaryColor; padding: 0.5rem; outline: none;">
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="checkbox" id="checkbox">
          <label for="checkbox" style="color: bgColor;">I am a checkbox</label>
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="radio" id="radio">
          <label for="radio" style="color: bgColor;">I am a radio</label>
        </div>
        <button style="border: none; background-color: primaryColor; color: secondaryColor; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
  `,
  },
  {
  type: "form",
  name: "plain form five",
  htmlText: `
    <div>
      <form style="background-color: bgColor; padding: 1rem;">
        <div style="margin-bottom: 1rem;">
          <label for="inputField" style="color: secondaryColor;">Type something here:</label>
          <input id="inputField" placeholder="Type something here" style="border-radius: 0.5rem; border: 2px solid primaryColor; padding: 0.5rem; outline: none;">
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="checkbox" id="checkbox">
          <label for="checkbox" style="color: primaryColor;">I am a checkbox</label>
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="radio" id="radio">
          <label for="radio" style="color: primaryColor;">I am a radio</label>
        </div>
        <button style="border: none; background-color: secondaryColor; color: bgColor; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Submit
        </button>
      </form>
    </div>
  `,
  },
  
  //TITLES
  
  {
    type: "title",
    name: "jdb test title",
    htmlText: `
    <div>
    <h1 style="
        fontSize: 32px;
        color: primaryColor;
        font-weight: bold;
        text-align: center;
        margin: 20px 0;
        underline: secondaryColor;
        box-shadow: 2rem 2rem 2rem tertiaryColor;
       "
      >
    Your Website Title
  </h1>
  <div>
  `,
  },
{
  type: "title",
  name: "text shadow",
  htmlText: `
    <h1 style="
      fontSize: 32px;
      color: primaryColor;
      font-weight: bold;
      text-align: left;
      margin: 10px 0;
      text-shadow: 2px 2px 4px secondaryColor;
    ">
      Your Website Title
    </h1>
  `,
  htmlStyle: {
    fontSize: "32px",
    color: `${primaryColor}`,
    fontWeight: "bold",
    textAlign: "left",
    margin: "10px 0",
    textShadow: `2px 2px 4px ${secondaryColor}`,
  },
  },
  {
    type: "title",
    name: "text uppercase",
    htmlText: `
      <h1 style="
        fontSize: 32px;
        color: primaryColor;
        fontWeight: bold;
        textAlign: left;
        margin: 10px 0;
        textShadow: 2px 2px secondaryColor;
        text-transform: uppercase;
      ">
        Your Website Title
      </h1>`,
    htmlStyle: {
      backgroundColor: bgColor,
      boxSizing: "border-box",
      gridRow: 1,
      gridColumn: "1 / 3",
      fontSize: "32px",
      color: `${primaryColor}`,
      fontWeight: "bold",
      textAlign: "right",
      margin: "20px 0",
      textTransform: "uppercase",
      letterSpacing: "2px",
      textDecoration: `underline + ${secondaryColor}`,
    },
  },
  {
  type: "title",
  name: "neon style",
  htmlText: `
    <h1 style="
      font-size: 32px;
      color: primaryColor;
      text-shadow:
        0 0 5px secondaryColor,
        0 0 20px secondaryColor,
        0 0 40px secondaryColor,
        0 0 80px secondaryColor;
    ">
      Your Website Title
    </h1>
  `,
  htmlStyle: {
    fontSize: "32px",
      color: `${primaryColor}`,
      textShadow: `
        0 0 5px ${secondaryColor},
        0 0 20px ${secondaryColor},
        0 0 40px ${secondaryColor},
        0 0 80px ${secondaryColor}
      `,
  },
},
{
  type: "title",
  name: "underline-style",
  htmlText: `
    <h1 style="
      font-size: 32px;
      color: primaryColor;
      text-decoration: underline;
    ">
      Your Website Title
    </h1>
  `,
  htmlStyle: {
    fontSize: "32px",
    color: `${primaryColor}`,
    textDecoration: "underline",
  },
},
{
  type: "title",
  name: "italic-style",
  htmlText: `
    <h1 style="
      font-size: 32px;
      color: primaryColor;
      font-style: italic;
    ">
      Your Website Title
    </h1>
  `,
  htmlStyle: {
    fontSize: "32px",
    color: `${primaryColor}`,
    fontStyle: "italic",
  },
},

//BUTTONS
{
  type: "button",
  name: "default-button",
  htmlText: `
    <button style="
      background-color: primaryColor;
      color: white;
      font-size: 16px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    ">
      Click Me
    </button>
  `,
  htmlStyle: {
    backgroundColor: `${primaryColor}`,
    color: "white",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
},
{
  type: "button",
  name: "outline-button",
  htmlText: `
    <button style="
      background-color: transparent;
      color: primaryColor;
      font-size: 16px;
      padding: 10px 20px;
      border: 2px solid primaryColor;
      border-radius: 5px;
      cursor: pointer;
    ">
      Click Me
    </button>
  `,
  htmlStyle: {
    backgroundColor: "transparent",
    color: `${primaryColor}`,
    fontSize: "16px",
    padding: "10px 20px",
    border: `2px solid ${primaryColor}`,
    borderRadius: "5px",
    cursor: "pointer",
  },
},
{
  type: "button",
  name: "rounded-button",
  htmlText: `
    <button style="
      background-color: primaryColor;
      color: white;
      font-size: 16px;
      padding: 10px 20px;
      border: none;
      border-radius: 25px;
      cursor: pointer;
    ">
      Click Me
    </button>
  `,
  htmlStyle: {
    backgroundColor: `${primaryColor}`,
    color: "white",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
  },
},
{
  type: "button",
  name: "hover-button",
  htmlText: `
    <button style="
      background-color: primaryColor;
      color: white;
      font-size: 16px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    ">
      Click Me
    </button>
  `,
  htmlStyle: {
    backgroundColor: `${primaryColor}`,
    color: "white",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
},
{
  type: "button",
  name: "disabled-button",
  htmlText: `
    <button style="
      background-color: primaryColor;
      color: white;
      font-size: 16px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: not-allowed;
      opacity: 0.5;
    " disabled>
      Click Me
    </button>
  `,
  htmlStyle: {
    backgroundColor: `${primaryColor}`,
    color: "white",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
    opacity: 0.5,
  },
}


];

module.exports = components;
