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
    <html>
    <div class="navbar" style="background-color: bgColor">
    <a href="#home">Home</a>
    <a href="#news">News</a>
    <div class="dropdown">
      <button class="dropbtn">Dropdown 
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div> 
  </div>
  </html>
  `,
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
          listStyleType: "none",
          height: "100%",
          margin: "0",
          paddingLeft: "1rem",
          color: "#FFFFFF",
          width: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textDecoration: "none",
        },

        dropdownContent: {
          display: "none",
          position: "absolute",
          minWidth: "160px",
          boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
          zIndex: "1",
        },
        "dropdownContent a": {
          float: "none",
          color: "black",
          padding: "12px 16px",
          textDecoration: "none",
          display: "block",
          textAlign: "left",
        },
        "dropdown:hover .dropdownContent": {
          display: "block",
        },
      },
    },
  },
  {
    type: "navbar",
    name: "dropdown nav bar",
    htmlText: `
    <style>
    .dropdownNav {
      // width: 100%;
      // height: 100%;
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: primaryColor;
      // display: flex;
      // justify-content: space-between;
    }
    
    #drop-li {
      float: left;
    }
    
    #drop-li a, .dropbtn {
      display: inline-block;
      color: white;
      text-align: center;
      padding: 1.1rem;
      text-decoration: none;
    }
    
   #drop-li a:hover, .dropdown:hover .dropbtn {
      background-color: tertiaryColor;
    }
    
   #drop-li > .dropdown {
      display: inline-block;
    }
    
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }
    .dropdownNav .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      text-align: left;
    }
    
    .dropdown-content a:hover {background-color: primaryColor; color: white;}
    
    .dropdown:hover .dropdown-content {
      display: block;
    }
    </style>
    <body>
    
    <ul class="dropdownNav">
      <li id="drop-li"><a href="#home">Home</a></li>
      <li id="drop-li"><a href="#news">News</a></li>
      <li class="dropdown" id="drop-li">
        <a href="javascript:void(0)" class="dropbtn">Dropdown</a>
        <div class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </li>
    </ul>
    
    </body>
    </html>
  `,
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
        font-size: calc(32px + 1vw);
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
    font-size: calc(32px + 1vw);
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
      font-size: calc(32px + 1vw);
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
    font-size: calc(32px + 1vw);
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
    font-size: calc(32px + 1vw);
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
    font-size: calc(32px + 1vw);
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 7vw;
      height: 3.5vh;
      background-color: 0;
      color: primaryColor;
      font-size: calc(12px+.5vw);
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
  },
  {
    type: "card",
    name: "product card",
    htmlText: `
    <style>
    .card {
      min-height: 40vh;
      max-height: 100%
      max-width: 15vw;
      border: 2px solid primaryColor;
      background-color: bgColor;
      border-radius: 6px;
      padding: 4px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      box-sizing: content-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .card > img{

      max-height: 30vh;
      max-width: 100%;
      aspect-ratio: 1/1;
      flex: 1 1 100%;
      flex-wrap: wrap;
      justify-content: center;
      box-shadow: 1px 1px 1rem secondaryColor;
      margin: 1rem .5rem;
    }
    
    .cardcontent{
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      font-size: calc(8px + 0.5vw);

    }
    
    .action-items {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: .5rem;

    }

    .button {
      font-size: calc(4px + 0.5vw);
      justify-content: space-evenly;
      align-items: center;
      background-color: tertiaryColor;
      border: 1px solid secondaryColor;
      color: white;
      padding: 4px;
      margin: 4px;
      border-radius: 5px;
    }
    .button:hover{
      background-color: bgColor;
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
    name: "product card two",
    htmlText: `
      <style>
        .card {
          min-height: 40vh;
          max-height: 100%;
          max-width: 15vw;
          border: 2px solid primaryColor;
          background-image: linear-gradient(to right, secondaryColor, tertiaryColor);
          border-radius: 6px;
          padding: 4px;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
  
        .card > img {
          max-height: 30vh;
          max-width: 100%;
          aspect-ratio: 1/1;
          flex: 1 1 100%;
          flex-wrap: wrap;
          justify-content: center;
          box-shadow: 1px 1px 1rem bgColor;
          margin: 1rem 0.5rem;
        }
  
        .cardcontent {
          flex-grow: 1;
          text-align: center;
          justify-content: center;
          font-size: calc(12px + 0.5vw);
        }
  
        .action-items {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin-top: .5rem;
        }
  
        .button {
          font-size: calc(8px + 0.5vw);
          justify-content: space-evenly;
          align-items: center;
          background-color: 0;
          border: 1px solid secondaryColor;
          color: white;
          padding: 4px;
          margin: 4px;
          border-radius: 5px;
        }
      </style>
  
      <div class="card">
        <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png" />
  
        <div class="cardcontent">
          Here's some fun text about whatever item you're putting in here!
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
    name: "product card three",
    htmlText: `
      <style>
        .card {
          min-height: 40vh;
          max-height: 100%;
          max-width: 15vw;
          border: 2px solid primaryColor;
          background-image: linear-gradient(45deg, secondaryColor, tertiaryColor);
          border-radius: 6px;
          padding: 4px;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
    
        .card > img {
          max-height: 30vh;
          max-width: 100%;
          aspect-ratio: 1/1;
          flex: 1 1 100%;
          flex-wrap: wrap;
          justify-content: center;
          box-shadow: 1px 1px 1rem bgColor;
          margin: 1rem 0.5rem;
        }
    
        .cardcontent {
          flex-grow: 1;
          text-align: center;
          justify-content: center;
          font-size: calc(12px + 0.5vw);
        }
    
        .action-items {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin-top: .5rem;
        }
    
        .button {
          font-size: calc(8px + 0.5vw);
          justify-content: space-evenly;
          align-items: center;
          background-color: tertiaryColor;
          border: 1px solid secondaryColor;
          color: white;
          padding: 4px;
          margin: 4px;
          border-radius: 5px;
        }
        .button:hover{
          background-color: bgColor;
        }
      </style>
    
      <div class="card">
        <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png" />
    
        <div class="cardcontent">
          Here's some fun text about whatever item you're putting in here!
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
    name: "product card four",
    htmlText: `
      <style>
        .card {
          min-height: 40vh;
          max-height: 100%;
          max-width: 15vw;
          border: 2px solid primaryColor;
          background-image: linear-gradient(235deg, secondaryColor, tertiaryColor);
          border-radius: 6px;
          padding: 4px;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
  
        .card > img {
          max-height: 30vh;
          max-width: 100%;
          aspect-ratio: 1/1;
          flex: 1 1 100%;
          flex-wrap: wrap;
          justify-content: center;
          box-shadow: 1px 1px 1rem primaryColor;
          margin: 1rem 0.5rem;
        }
  
        .cardcontent {
          flex-grow: 1;
          text-align: center;
          justify-content: center;
          font-size: calc(12px + 0.5vw);
        }
  
        .action-items {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin-top: .5rem;
    
        }
    
        .button {
          font-size: calc(4px + 0.5vw);
          justify-content: space-evenly;
          align-items: center;
          background-color: tertiaryColor;
          border: 1px solid primaryColor;
          color: white;
          padding: 4px;
          margin: 4px;
          border-radius: 5px;
        }
        .button:hover{
          background-color: 0;
        }
        
      </style>
  
      <div class="card">
        <img src="https://cdn-5f3056b4c1ac191bfcc58755.closte.com/wp-content/uploads/woocommerce-placeholder-600x600.png" />
  
        <div class="cardcontent">
          Here's some fun text about whatever item you're putting in here!
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
    name: "shopping card",
    htmlText: `
      <style>
        .card {
          box-sizing: border-box;
          min-height: 30vh;
          max-height: 100%;
          max-width: 20vw;
          border: 2px solid primaryColor;
          background-color: bgColor;
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
          max-height: 50%;
          max-width: 100%;
          object-fit: cover;
          border-radius: 10px;
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
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
        }
        .button:hover{
          box-sizing: border-box;
          padding: 6.5px 16px;
          background-color: bgColor;
          border: 2px solid tertiaryColor
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
    name: "Shopping Card 2",
    htmlText: `
      <style>
        .card {
          min-height: 30vh;
          max-height: 100%;
          max-width: 20vw;
          border: 2px solid primaryColor;
          background-color: bgColor;
          border-radius: 10px;
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
          max-height: 50%;
          max-width: 100%;
          object-fit: cover;
          border-radius: 10px;
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
          font-size: 14px;
          background-color: tertiaryColor;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
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
    type: "sideNav",
    name: "Side Nav",
    htmlText: `
    <style>
    .sidebar {
      margin: 0;
      padding: 0;
      min-width: 10vw;
      background-color: bgColor;
      height: 100%;
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
    </style>
    <div class="sidebar">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
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
          height: 100%;
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
          color: white;
        }
      </style>
  
      <div class="sidebar">
        <a class="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
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
          width: 200px;
          background-color: bgColor;
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
          border-bottom: 2px solid secondaryColor;
          color: white;
        }
      </style>
  
      <div class="sidebar">
      <a class="active" href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#portfolio">Portfolio</a>
      <a href="#gallery">Gallery</a>
      <a href="#blog">Blog</a>
      <a href="#shop">Shop</a>
      <a href="#events">Events</a>
      <a href="#team">Team</a>
      <a href="#faq">FAQ</a>
      <a href="#pricing">Pricing</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#contact-us">Contact Us</a>
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
          height: 100%;
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
          color: bgColor;
          background-color: primaryColor;
        }
  
        .sidebar a.active {
          color: bgColor;
          background-color: secondaryColor;
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
          top: 0;
          left: 100%;
          margin-top: -1px;
          min-width: 10vw;
          background-color: bgColor;
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
          color: tertiaryColor;
        }
  
        .sidebar .dropdown:hover .dropdown-content {
          display: block;
        }
      </style>
  
      <div class="sidebar">
        <a class="active" href="#home">Home</a>
        <a href="#news">News</a>
        <div class="dropdown">
          <a class="has-dropdown" href="#contact">Contact</a>
          <div class="dropdown-content">
            <a href="#">Sublink 1</a>
            <a href="#">Sublink 2</a>
          </div>
        </div>
        <a href="#about">About</a>
        <a href="#blog">Blog</a>
        <a href="#testimonials">Testimonials</a>
      </div>
    `,
  },
];

module.exports = components;
