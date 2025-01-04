// Clear console logs for a clean output
console.clear();

let contentTitle;

// Logs for debugging cookies
console.log(document.cookie);

// Function to dynamically create accessories sections
function dynamicAccessoriesSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("rs " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

// Main container for accessories
let containerAccessories = document.getElementById("containerAccessories");

// Fetching data from the backend
let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status == 200) {
      contentTitle = JSON.parse(this.responseText);

      // Display cart counter if available
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        let badgeElement = document.getElementById("badge");
        if (badgeElement) {
          badgeElement.innerHTML = counter;
        } else {
          console.error("Badge element not found!");
        }
      }

      // Display only accessories
      for (let i = 0; i < contentTitle.length; i++) {
        if (contentTitle[i].isAccessory) {
          console.log(contentTitle[i]);
          containerAccessories.appendChild(
            dynamicAccessoriesSection(contentTitle[i])
          );
        }
      }
    } else {
      console.log("Backend call failed!");
    }
  }
};

// API endpoint for data
httpRequest.open(
  "GET",
  "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
  true
);
httpRequest.send();
