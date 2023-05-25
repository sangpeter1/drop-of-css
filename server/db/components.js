const components = [
  {
    type: "navbar",
    name: "plain nav bar",
    htmlText: `
      <ul className="navbar">
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
      </ul>`
  },
  {
    type: "form",
    name: "plain form", 
    htmlText: `
      <form>
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
    `
  },

]

module.exports = components;