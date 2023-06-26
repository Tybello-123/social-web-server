const serverUrl = "http://localhost:8080";


const content = document.getElementById("content");

const createLink = link => {
  
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
linkAuthor.appendChild(document.createTextNode(`Submitted by ${link.author}`));
    
  
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
   //append div of links to content element
  // content.appendChild(linkWrapper);

  

  //delete links  
  delButton.addEventListener("click", () => {
   content.removeChild(linkWrapper);
 })

return linkWrapper;

}

//create and return a DOM input element 
//parameters name,placeholder and input size



//create a form first
const form = document.createElement("form");
form.classList.add("linkForm");
//append form to content element
content.appendChild(form);

//append the input elements into the 
const inputTitle = document.createElement("input");
inputTitle.type="text";
inputTitle.placeholder="Enter the link title";
inputTitle.setAttribute= "required";

const inputUrl = document.createElement("input");
inputUrl.type="text";
inputUrl.placeholder="Enter the link Url";
inputUrl.setAttribute= "required";


const inputAuthor = document.createElement("input");
inputAuthor.type="text";
inputAuthor.placeholder="Enter the link Author";
inputAuthor.setAttribute= "required";


const button = document.createElement("button");
button.classList.add("btn-primary");
button.type = "submit";
button.textContent = "Add Link"


form.appendChild(inputTitle);
form.appendChild(inputUrl);
form.appendChild(inputAuthor);
form.appendChild(button); 







form.addEventListener('submit',(e) => {
    e.preventDefault();
  
  if (!inputTitle.validity.valid || !inputUrl.validity.valid || !inputAuthor.validity.valid) {
    console.log("Invalid input");
    return;
  }
  
if(links.length > 0){

  const newLink = new Link (
    inputTitle.value,
    inputUrl.value,
    inputAuthor.value
  )
//Add new link to page
  const newLinkElement = createLink(newLink);

  const infoElement = document.createElement("div");

  
  inputTitle.value = "";
  inputUrl.value = "";
  inputAuthor.value = "";
}
   
})



//after sending to the server send the response back to the user
// and display on the screen

fetch("http://localhost:3000/api/articles")
.then(response => response.json())
.then(links => {
  links.forEach(link => {
    const linkElement =   createLink(link);
    content.appendChild(linkElement);
  })
})
.catch(err => {
  console.log(err.message);
})



