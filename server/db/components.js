let bgColor;
let primaryColor;
let secondaryColor;

const components = [
  {
    type: "navbar",
    name: "plain nav bar",
    htmlText: `
      <ul style="list-style: none;">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
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
        </li>
      </ul>`,
  },
  {
    type: "form",
    name: "plain form",
    htmlText: `
      <form style={{backgroundColor: {bgColor}}}>
        <input placeholder='type something here'/>
        <div>
          <input type="checkbox">
          <label> I am a check box </label> 
        </div>
        <div>
          <input type="radio">
          <label> I am a radio </label>
        </div>
        <button> Submit </button>
      </form>
    `,
  },
  {
    type: "form",
    name: "plain form",
    htmlText: `
      <form style={{backgroundColor: {primaryColor}}}>
        <input placeholder='type something here'/>
        <div>
          <input type="checkbox">
          <label> I am a check box </label> 
        </div>
        <div>
          <input type="radio">
          <label> I am a radio </label>
        </div>
        <button> Submit </button>
      </form>
    `,
  },
  {
    type: "title",
    name: "main title",
    htmlText: `
    <h1 style={{
        fontSize: '32px',
        color: {primaryColor},
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0',
        borderBottom: "{secondaryColor} 2px solid"
      }}>
    Your Website Title
  </h1>
  );
  `,
  },
  {
    type: "title",
    name: "text shadow",
    htmlText: `
    <h1 style={{
        fontSize: '32px',
        color: {primaryColor},
        fontWeight: 'bold',
        textAlign: 'left',
        margin: '10px 0',
        textShadow:"2px 2px {secondaryColor}",
      }}>
    Your Website Title
  </h1>
  );
  `,
  },
  {
    type: "title",
    name: "text uppercase",
    htmlText: `<h1
      >
        Your Website Title
      </h1>`,
    htmlStyle: {
      backgroundColor: { bgColor },
      boxSizing: "border-box",
      gridRow: 1,
      gridColumn: "1 / 3",
      fontSize: "32px",
      color: { primaryColor },
      fontWeight: "bold",
      textAlign: "right",
      margin: "20px 0",
      textTransform: "uppercase",
      letterSpacing: "2px",
      textDecoration: "underline" + { secondaryColor },
    },
  },
];

module.exports = components;
