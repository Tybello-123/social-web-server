let serverUrl;
if (process.env.NODE_ENV === "production") {
  //change production url to the deployment url on netlify 
  serverUrl = "<production-url>";
} else {
  serverUrl = "http://localhost:8080";
}

const content = document.getElementById("content");

const createLink = (link) => {
  // create an element for link title
  const linkTitle = document.createElement("a");
  linkTitle.classList.add("linkTitle");
  linkTitle.href = link.url;
  linkTitle.appendChild(document.createTextNode(link.title));

  //create an element for link url
  const linkUrl = document.createElement("span");
  linkUrl.classList.add("linkUrl");
  linkUrl.appendChild(document.createTextNode(link.url));

  //create an h4 element for title and url
  const linkUrlText = document.createElement("h4");
  linkUrlText.classList.add("linkHeadline");
  linkUrlText.appendChild(linkTitle);
  linkUrlText.appendChild(linkUrl);

  //create the link author element
  const linkAuthor = document.createElement("span");
  linkAuthor.classList.add("linkAuthor");
  linkAuthor.appendChild(
    document.createTextNode(`Submitted by ${link.author}`)
  );

  //create link element
  const linkEl = document.createElement("div");
  linkEl.classList.add("link");

  linkEl.appendChild(linkUrlText);
  linkEl.appendChild(linkAuthor);

  //create button div second div in the wrapper
  const buttonDiv = document.createElement("div");

  //create button element
  const delButton = document.createElement("button");
  delButton.classList.add("button");
  delButton.innerHTML = "delete";
  delButton.id = "del-btn";
  buttonDiv.appendChild(delButton);

  const linkWrapper = document.createElement("div");
  linkWrapper.classList.add("linkWrap");

  //append divs to the wrapper

  linkWrapper.appendChild(linkEl);
  linkWrapper.appendChild(buttonDiv);

  //delete links
  delButton.addEventListener("click", () => {
    content.removeChild(linkWrapper);
  });

  return linkWrapper;
};

//create and return a DOM input element
//parameters name,placeholder and input size

const createInputElement = (name, placeholder, size) => {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.setAttribute("name", name);
  inputElement.setAttribute("placeholder", placeholder);
  inputElement.setAttribute("size", size);
  inputElement.setAttribute("required", "true");
  inputElement.classList.add("form-control");
  return inputElement;
};

//capture submitting of link separate to creating the form element
const submitLink = (e) => {
  // Cancel default form behavior
  e.preventDefault();

  // Create a FormData object, passing the form as a parameter
  const formData = new FormData(e.target);
  // Send link data to the server with an aynchronous POST request
  fetch(`${serverUrl}/links`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((newLink) => {
      // Add new link to page, replacing form
      //the new link parameter replaces the link paramenter in the creatLink function created first
      const newLinkElement = createLink(newLink);
      content.replaceChild(newLinkElement, e.target);

      // Create info message indicating success
      const infoElement = document.createElement("div");
      infoElement.classList.add("alert");
      infoElement.classList.add("alert-success");
      infoElement.textContent = `The link ${newLink.title} has been succesfully added!`;
      content.insertBefore(infoElement, newLinkElement);
      // Remove info message after 2 seconds
      setTimeout(() => {
        content.removeChild(infoElement);
      }, 2000);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Create and return a form for submitting a new link
const createLinkForm = () => {
  // Create input fields for link properties by calling rhthe input element function and pass in parameters

  const titleElement = createInputElement("title", "Enter link title", 40);
  const urlElement = createInputElement("url", "Enter link URL", 40);
  const authorElement = createInputElement("author", "Enter author", 20);
  // Create submit button
  const submitElement = document.createElement("input");
  submitElement.type = "submit";
  submitElement.value = "Add link";
  submitElement.classList.add("btn");
  submitElement.classList.add("btn-primary");

  // Create link submission form
  const linkFormElement = document.createElement("form");
  linkFormElement.classList.add("linkForm");
  linkFormElement.classList.add("form-inline");

  linkFormElement.appendChild(titleElement);
  linkFormElement.appendChild(urlElement);
  linkFormElement.appendChild(authorElement);
  linkFormElement.appendChild(submitElement);

  // Handle form submission
  linkFormElement.addEventListener("submit", submitLink);

  return linkFormElement;
};

//after a new link has been created fetch all the links from the server

fetch(`${serverUrl}/api/links`)
  .then((response) => response.json())
  .then((links) => {
    links.forEach((link) => {
      const linkElement = createLink(link);
      content.appendChild(linkElement);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

//after sending to the server send the response back to the user
// and display on the screen
const submitButton = document.getElementById("submitButton");

const handleClick = () => {
  //disable submit button
  submitButton.disabled = true;

  //create link submission form and assingn it to a variable

  const formElement = createLinkForm();

  //add form on the first page before the first link in the content Div
  content.insertBefore(formElement, document.querySelector(".linkWrap"));

  // Handle form submission to the display of the ui and submissions handling
  formElement.addEventListener("submit", handleFormSubmission);
};

const handleFormSubmission = (e) => {
  e.preventDefault();

  //once a link is submitted enable the submit button again

  submitButton.disabled = false;
  //let it run the handle click function
  submitButton.addEventListener("click", handleClick);
};

submitButton.addEventListener("click", handleClick);
