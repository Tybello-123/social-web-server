// Represent a link
class Link {
  constructor(title, url, author) {
    let absoluteUrl = url;
    // Check if url starts with "http://" or "https://"
    if (
      !absoluteUrl.startsWith("http://") &&
      !absoluteUrl.startsWith("https://")
    ) {
      // If not, add "http://" at the beginning
      absoluteUrl = `http://${absoluteUrl}`;
    }

    // Add data properties
    this.title = title;
    this.author = author;
    this.url = absoluteUrl;
  }

  // Describe the link as a string
  toString() {
    return `${this.title} (${this.url}). Author: ${this.author}`;
  }
}


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
  content.appendChild(linkWrapper);

  

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






// Initial links array
const links = [];

links.push(new Link("Hacker News", "https://news.ycombinator.com", "Baptiste"));
links.push(new Link("Reddit", "https://reddit.com", "Thomas"));
links.push(new Link("Boing Boing", "boingboing.net", "Daniel"));



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

links.forEach(link => {
  const linkElement =   createLink(link);
  content.appendChild(linkElement);
});





// let choice;
// // Main program loop
// // Display options until the user chooses to quit
// while (choice !== "0") {
//   let choices = "\n1 : Show links";
//   choices += "\n2 : Add a link";
//   choices += "\n3 : Remove a link";
//   choices += "\n0 : Quit";
//   choice = prompt(`Choose an option: ${choices}`);

//   switch (choice) {
//     case "1": {
//       if (links.length > 0) {
//         // Show each link in an alert window
//         for (let i = 0; i < links.length; i++) {
//           alert(`${i + 1}: ${links[i].toString()}`);
//         }
//       } else {
//         alert("No links to display!");
//       }
//       break;
//     }
//     case "2": {
//       // Input link properties
//       const title = prompt("Enter the link title:");
//       const url = prompt("Enter the link url:");
//       const author = prompt("Enter the link author:");
//       // Add new link to array
//       links.push(new Link(title, url, author));
//       break;
//     }
//     case "3": {
//       if (links.length > 0) {
//         // Input link index (must be between 1 and the number of links)
//         let index = -1;
//         const maxIndex = links.length;
//         while (index < 1 || index > links.length) {
//           index = Number(
//             prompt(`Enter the index of the link to be removed (between 1 and ${maxIndex}):`)
//           );
//         }
//         // Remove selected link from array
//         links.splice(index - 1, 1);
//       } else {
//         alert("No links to remove!");
//       }
//       break;
//     }
//   }
// }
// alert("See you later!");