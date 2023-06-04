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
      navbar: "border: 10px solid red",
      backgroundColor: bgColor,
      boxSizing: "content-box",
      display: "grid",
      gridAutoFlow: "row",
      gridColumn: "1/3",
      gridRow: 2,
      fontSize: "1.2rem",
      color: primaryColor,
      textAlign: "center",
      margin: 0,
      height: "100%",
      width: "100%",
      verticalAlign: "center",
      letterSpacing: "2px",
      listStyle: "none",
      borderBottom: `5px solid ${tertiaryColor}`,
      textDecoration: `underline ${secondaryColor}`,
      subStyleOne: `"background-color: secondaryColor; list-style-type: none; height: 100%; margin: 0; padding-left: 1rem; color: #FFFFFF; width: auto; display: flex; flex-direction: row; align-items: center; text-decoration: none"`,
    },
    extraCSSForTemplateOutput: ` 

    .dropdown-content {
        display: none;
        position: absolute;
        // background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }
      
      .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
      }
      
      .dropdown:hover .dropdown-content {
        display: block;
      }`,
  },
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
    name: "plain form",
    htmlText: `
    <div>
      <form style="backgroundColor: bgColor">
        <input 
          placeholder='type something here'
          style="border-radius: .5rem; border:2px solid primaryColor"
        />
        <div>
          <input type="checkbox">
          <label> I am a check box </label> 
        </div>
        <div>
          <input type="radio">
          <label> I am a radio </label>
        </div>
        <button style="border: .5rem dotted secondaryColor"> Submit </button>
      </form>
    </div>
    `,
  },
  {
    type: "form",
    name: "plain form two",
    htmlText: `
    <div>
      <form style="backgroundColor: bgColor">
        <input 
          placeholder='type something here'
          style="border-radius: .5rem; border:2px solid primaryColor"
        />
        <div>
          <input type="checkbox">
          <label> I am a check box </label> 
        </div>
        <div>
          <input type="radio">
          <label> I am a radio </label>
        </div>
        <button style="border: .5rem dashed secondaryColor"> Submit </button>
      </form>
    </div>
    `,
  },
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
        fontWeight: bold;
        textAlign: left;
        margin: 10px 0;
        textShadow: 2px 2px secondaryColor;
    ">
      Your Website Title
    </h1>
  `,
    htmlStyle: {
      fontSize: "32px",
      color: { primaryColor },
      fontWeight: "bold",
      textAlign: "left",
      margin: "10px 0",
      textShadow: `2px 2px ${secondaryColor}`,
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
      color: primaryColor,
      fontWeight: "bold",
      textAlign: "right",
      margin: "20px 0",
      textTransform: "uppercase",
      letterSpacing: "2px",
      textDecoration: `underline + ${secondaryColor}`,
    },
  },
];

module.exports = components;
