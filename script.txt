

// Write - Your - Code - Here

const openCustomAlert = () => {
    //show a list of options to be taken by the user using startMenu function
    var startMenu = [
    "Quit the program.","Show the list of links.","Add a new link.","Remove an existing link."
    ]
  
  //for each option in the array append it to the message along with it's index keep appending them
   let message = "";
   startMenu.forEach((option,index) => {
    message += index + " - " + option + "\n" 
   })
  
  //get the users input by displaying all the options from message
   let userInput = window.prompt("Choose an option:" + "\n" + message);
  
  //if userinput is not == null convert the input to an an integer(number)
   if(userInput !== null){
      let selectedOption = parseInt(userInput);
  //if it is 1 call the show links function
      if(selectedOption === 1){
       showLinks();
      }else if(selectedOption === 2){
        //if it is 2 call the show links function
        addlink();
      }
      else if(selectedOption === 3){
         //if it is 3 call the show links function
        removeLink();
      }
      else{
        console.log("wrong input");
      }
   }else{
     console.log("user cancelled the input");
   }
   
  }
  
  //initialize links as an empty array for dynamic progrmming and no hard coding
     const links = [];
  
  //when a user enters 1 the show links function is called
     const showLinks = () => { 
      //the message has a title of "List of links \n\n" that the users input will be appended to
      let message = "List of links \n\n"
  
  //check if the links array is empty and show an error message
      if (links.length === 0) {
       window.alert("no links have been added yet");
       openCustomAlert();
       return;
    } 
  //for every link that is going to be added to the links array append it to the existing message so that the links can be updated      
      links.forEach((link,index) => {
            message += `${index + 1} . title: ${link.title} ,url: (${link.url}) ,author: ${link.author}\n`
      })
  
  //show the message on an alert window
       window.alert(message);
  //open the start menu again     
       openCustomAlert();
     
  }
  
  
  
  //when a user enters the number 2 call the add link fucntion
  const addlink = () => {
   //prompt the user for the title,url and author
    let title = prompt("enter a title");
    let url = prompt("enter a url");
    let author = prompt("enter a author");
  
     //check if the url is a url that  does not start with http pr https) 
    if(url && !url.startsWith("http:/") && !url.startsWith("https://")){
      url =  "http:/" + url;
       
    }
    
    //create a newlink with title, url and author
    let newLink = {title,url,author};
    //add the newlink to the links array
    links.push(newLink);
    //show links which them shows the show links message and then back to the start menu
    showLinks();
   
  
  }
  
  const removeLink = () => {
    //if the links array is empty show they are no links to remove
    if(links.length === 0){
      window.alert('no links to remove');
      console.log('no links to remove');
      openCustomAlert();
      return;
    }
    
    //get the user to put in the index / number of the array link that they want to remove
    let linkIndex = prompt("enter the appropriate link index");
  
  //if the linkindex is not equal to nill or an empty string 
    if(linkIndex !== null && linkIndex !== ""){
  
      //turn that linkindex to an integer
       linkIndex = parseInt(linkIndex);
  
  //check if all the user inputs any of these numbers or something that is not a number
       if(isNaN(linkIndex) || linkIndex < 1 || linkIndex > links.length){
           window.alert("invalid link index");
           return
       }
  
  // if not then remove one link from the link array the minus one means zero indexing so if a user enters 1-1 = 0
    links.splice(linkIndex - 1,1);
   //show available links which then calls start menu
   showLinks();
  
  
    }else{
      //if user cancels the input show the start menu again
    
      console.log("user cancelled the input");
      openCustomAlert();
      
    }
  
  }
  
  openCustomAlert();
  
  
  
  
  
  