const loginInfoURL = "https://localhost:7239/api/RequestHandling/postLoginInfo"; //http://localhost:5198
const signupInfoURL =
  "https://localhost:7239/api/RequestHandling/postSignupInfo";

//list input handling buttons
// const addButton = document.querySelector(".addButton");
// const removeButton = document.querySelector(".removeButton");
// const editButton = document.querySelector(".editButton");
// const itemIDselector = document.querySelector(".idBox");

// let numberOfItems = document.querySelectorAll(".itemList").length;
// let itemListFull = document.querySelectorAll(".itemList");

// //header buttons
// const appearanceMode = document.querySelector(".appearanceButton");
// const loginButton = document.querySelector(".loginButton");
// const signupButton = document.querySelector(".signupButton");
// const logoutButton = document.querySelector(".signoutButton");
// const loginSubmit = document.querySelector(".loginSubmit");
// const signupSubmit = document.querySelector(".signupSubmit");

// //modals
// const loginModal = document.querySelector(".loginModal");
// const signupModal = document.querySelector(".signupModal");

var isConnected = false;

window.onload = function () {
  const addButton = document.querySelector(".addButton");
  const removeButton = document.querySelector(".removeButton");
  const editButton = document.querySelector(".editButton");
  var numberOfItems = document.querySelectorAll(".itemList").length;
  var itemListFull = document.querySelectorAll(".itemList");
  const itemIDselector = document.querySelector(".idBox");
  const appearanceMode = document.querySelector(".appearanceButton");
  const loginModal = document.querySelector(".loginModal");
  const signupModal = document.querySelector(".signupModal");
  const loginButton = document.querySelector(".loginButton");
  const signupButton = document.querySelector(".signupButton");
  const logoutButton = document.querySelector(".signoutButton");
  const loginSubmit = document.querySelector(".loginSubmit");
  const signupSubmit = document.querySelector(".signupSubmit");
  const toggleAnim = document.querySelector(".removeAnim");
  const toggleMusic = document.querySelector(".toggleMusic");

  const saveButton = document.querySelector(".saveButton");
  const loadButton = document.querySelector(".loadButton");

  logoutButton.style.display = "none";

  addButton.addEventListener("click", function () {
    const itemName = document.getElementById("input1").value;
    const itemDesc = document.getElementById("input2").value;
    if (itemName.trim() === "" || itemDesc.trim() === "") {
      alert("Please enter a value for both fields.");
      return;
    }
    if (
      numberOfItems === 1 &&
      itemListFull[0].children[0].children[0].innerText ===
        "placeholderItemDesc"
    ) {
      const li = document.getElementById("nameList");
      const p = document.getElementById("descList");
      li.innerHTML = itemName;
      p.innerHTML = itemDesc;
      li.appendChild(p);
      numberOfItems++;
    } else {
      const li = document.createElement("li");
      const p = document.createElement("p");
      li.id = "nameList";
      p.id = "descList";
      p.className = "descList";
      li.innerHTML = itemName;
      p.innerHTML = itemDesc;
      itemList.appendChild(li);
      li.appendChild(p);
      numberOfItems++;
    }
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input1").focus();
  });
  document.getElementById("input2").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      document.querySelector(".addButton").click();
    }
  });
  removeButton.addEventListener("click", function () {
    const index = itemIDselector.value - 1;
    if (index < 0 || index >= itemListFull[0].children.length) {
      alert("The selected line number is out of range and does not exist.");
      return;
    }
    itemListFull[0].children[index].remove();
  });

  editButton.addEventListener("click", function () {
    const itemName = document.getElementById("input1").value;
    const itemDesc = document.getElementById("input2").value;
    const index = itemIDselector.value - 1;
    if (itemName.trim() === "" || itemDesc.trim() === "") {
      alert("Please enter a value for both fields.");
      return;
    }
    if (index < 0 || index >= itemListFull[0].children.length) {
      alert("Invalid index");
      return;
    }
    itemListFull[0].children[index].innerHTML =
      itemName + '<p class="descList" id="descList">' + itemDesc + "</p>";
  });

  toggleMusic.addEventListener("click", function () {
    var img = document.getElementById("toggleMusic");
    if (img.src.match("images/musicOff.png")) {
      img.src = "images/musicOn.png";
      document.querySelector(".audioControls").style.visibility = "visible";
      document.getElementById("music").play();
    } else {
      img.src = "images/musicOff.png";
      document.querySelector(".audioControls").style.visibility = "hidden";
      document.getElementById("music").pause();
    }
  });

  toggleAnim.addEventListener("click", function () {
    var img = document.getElementById("removeAnim");
    if (img.src.match("images/7.png")) {
      document.getElementById("body").style.backgroundImage =
        "url('images/bgStatic.png')";
      document.getElementById("body").style.backgroundSize = "100%";
      img.src = "images/8.png";
    } else {
      img.src = "images/7.png";
      document.getElementById("body").style.backgroundImage =
        "url('images/bgGif.gif')";
      document.getElementById("body").style.backgroundSize = "100%";
    }
  });

  //dark/light mode
  appearanceMode.addEventListener("click", function () {
    var img = document.getElementById("appearanceButton");
    if (img.src.match("images/5.png")) {
      img.src = "images/6.png";
      document.getElementById("body").style.backgroundImage =
        "url('images/bgAlt.png')";
      document.getElementById("body").style.backgroundSize = "100%";
      document.getElementById("inputList").style.backgroundColor = "#c700009a";
      document.querySelector(".headers").style.backgroundColor = "#c700009a";
      document.getElementById("input1").style.backgroundColor = "#c700009a";
      document.getElementById("input1").style.color = "#24277b";
      document.getElementById("input2").style.backgroundColor = "#c700009a";
      document.getElementById("input2").style.color = "#24277b";
      document.getElementById("nameList").style.color = "#24277b";
      document.getElementById("descList").style.color = "#4d51cb";
      document.getElementById("saveButton").style.color = "#24277b";
      document.getElementById("loadButton").style.color = "#24277b";
      document.getElementById("webpageTitle").style.color = "#24277b";
      document.getElementById("desc").style.color = "#24277b";
      document.getElementById("desc").style.background =
        "linear-gradient(135deg, transparent 10%, #c700009a 35%, #c700009a 65%, transparent 90%)";
      document.getElementById("loginButton").style.color = "#33a7ff";
      document.getElementById("signupButton").style.color = "#33a7ff";
      document.getElementById("signoutButton").style.color = "#33a7ff";
      document.querySelector(".addButton").style.background =
        "linear-gradient(45deg, transparent 15%, #c700009a 10%)";
      document.querySelector(".addButton").style.color = "#24277b";
      document.querySelector(".editButton").style.background =
        "linear-gradient(0, transparent 0, #c700009a 0%)";
      document.querySelector(".editButton").style.color = "#24277b";
      document.querySelector(".removeButton").style.background =
        "linear-gradient(315deg, transparent 15%, #c700009a 10%)";
      document.querySelector(".removeButton").style.color = "#24277b";
      document.querySelector(".idBox").style.color = "#24277b";
      document.querySelector(".idBox").style.backgroundColor = "#c700009a";
      document.querySelector(".footer").style.color = "black";
      document.getElementById("loginModalHeader").style.backgroundColor =
        "#800000c4";
      document.getElementById("loginModalBody").style.backgroundColor =
        "#c700009a";
      document.getElementById("loginModalFooter").style.backgroundColor =
        "#800000c4";
      document.getElementById("signupModalHeader").style.backgroundColor =
        "#800000c4";
      document.getElementById("signupModalBody").style.backgroundColor =
        "#c700009a";
      document.getElementById("signupModalFooter").style.backgroundColor =
        "#800000c4";
      document.querySelector(".loginSubmit").style.color = "#33a7ff";
      document.querySelector(".loginCancel").style.color = "#33a7ff";
      document.querySelector(".signupSubmit").style.color = "#33a7ff";
      document.querySelector(".signupCancel").style.color = "#33a7ff";
      document.querySelector(".removeAnim").style.display = "none";
      document.querySelector(".toggleMusic").style.marginRight = "49.4%";
    } else {
      img.src = "images/5.png";
      document.getElementById("body").style.backgroundImage =
        "url('images/bgGif.gif')";
      document.getElementById("body").style.backgroundSize = "100%";
      document.getElementById("inputList").style.backgroundColor = "#24277b9a";
      //
      // document.getElementById("inputList").classList.toggle("light");
      //
      document.getElementById("headers").style.backgroundColor = "#0e105886";
      document.getElementById("input1").style.backgroundColor = "#24277bd9";
      document.getElementById("input1").style.color = "#ffee00";
      document.getElementById("input2").style.backgroundColor = "#24277bd9";
      document.getElementById("input2").style.color = "#ffee00";
      document.getElementById("nameList").style.color = "#ffee00";
      document.getElementById("descList").style.color = "#00eff6";
      document.getElementById("saveButton").style.color = "#ffee00";
      document.getElementById("loadButton").style.color = "#ffee00";
      document.getElementById("webpageTitle").style.color = "#ffee00";
      document.getElementById("desc").style.color = "#ffee00";
      document.getElementById("desc").style.background =
        "linear-gradient(135deg, transparent 10%, #831faa 35%, #831faa 65%, transparent 90%)";
      document.getElementById("loginButton").style.color = "#ffee00";
      document.getElementById("signupButton").style.color = "#ffee00";
      document.getElementById("signoutButton").style.color = "#ffee00";
      document.querySelector(".addButton").style.background =
        "linear-gradient(45deg, transparent 15%, rgba(36, 39, 123, 0.9) 10%)";
      document.querySelector(".addButton").style.color = "#ffee00";
      document.querySelector(".editButton").style.background =
        "linear-gradient(0, transparent 0, rgba(36, 39, 123, 0.9) 0%)";
      document.querySelector(".editButton").style.color = "#ffee00";
      document.querySelector(".removeButton").style.background =
        "linear-gradient(315deg, transparent 15%, rgba(36, 39, 123, 0.85) 10%)";
      document.querySelector(".removeButton").style.color = "#ffee00";
      document.querySelector(".idBox").style.color = "#ffee00";
      document.querySelector(".idBox").style.backgroundColor =
        "rgba(36, 39, 123, 0.9)";
      document.querySelector(".footer").style.color = "#ffee00";
      document.getElementById("loginModalHeader").style.backgroundColor =
        "#24277b";
      document.getElementById("loginModalBody").style.backgroundColor =
        "#363986";
      document.getElementById("loginModalFooter").style.backgroundColor =
        "#24277b";
      document.getElementById("signupModalHeader").style.backgroundColor =
        "#24277b";
      document.getElementById("signupModalBody").style.backgroundColor =
        "#363986";
      document.getElementById("signupModalFooter").style.backgroundColor =
        "#24277b";
      document.querySelector(".loginSubmit").style.color = "#18d5e2be";
      document.querySelector(".loginCancel").style.color = "#18d5e2be";
      document.querySelector(".signupSubmit").style.color = "#18d5e2be";
      document.querySelector(".signupCancel").style.color = "#18d5e2be";
      document.querySelector(".removeAnim").style.display = "flex";
      document.querySelector(".toggleMusic").style.marginRight = "0";
    }
  });
  signupSubmit.addEventListener("click", function () {
    const username = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput2").value;
    const password = document.getElementById("passwordTemplate").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirm.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 32; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    signup(username, email, password, id);
    clearForm();
  });
  loginSubmit.addEventListener("click", function () {
    email = document.getElementById("emailInput").value;
    password = document.getElementById("passwordInput").value;
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    //login(email, password);
    result = login(email, password);
    if (result !== null) {
      logoutButton.style.display = "block";
      loginButton.style.display = "none";
      signupButton.style.display = "none";
      localStorage.setItem("userId", result);
      //hideModal();
      console.log(localStorage);
      clearForm();
    } else {
      document.querySelector(".failed").style.display = "block";
    }
    logoutButton.style.display = "block";
    //let md = document.getElementById("loginModal");
    //md.setAttribute("class", "modal fade hide");
    //md.setAttribute("display", "none");
    //loginSubmit.setAttribute("data-bs-dismiss", "modal");
    //console.log(md.innerHTML);
    //hideModal();
    clearForm();
  });
  logoutButton.addEventListener("click", function () {
    signOut();
  });
  saveButton.addEventListener("click", function () {
    //const list = document.getElementById("itemList");
    //console.log(list.innerHTML);
    saveList();
  });
};
function clearForm() {
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput2").value = "";
  document.getElementById("passwordTemplate").value = "";
  document.getElementById("passwordConfirm").value = "";
}
async function login(email, password) {
  await axios({
    method: "post",
    url: loginInfoURL,
    data: { email: email, password: password },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Logged in successfully.");
        console.log(response.data);
        //return response.data;
      } else {
        //document.querySelector(".failed").style.visibility = "visible";
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
async function signup(username, email, password, id) {
  await axios({
    method: "post",
    url: signupInfoURL,
    data: {
      username: username,
      email: email,
      password: password,
      userId: id,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Account created successfully. Please login to continue.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function signOut() {
  localStorage.clear();
  window.location.reload();
}
// function hideModal() {
//   let modal = document.querySelector(".modal fade");
//   $(modal).modal("hide");
// }

async function saveList() {
  const itemArray = [];
  const descArray = [];
  const listItems = document.querySelectorAll(".itemList");

  listItems.forEach((item) => {
    const itemFullList = item.innerText.split("\n\n"); // split each item and its description
    listItems.forEach((item) => {
      for (let i = 0; i < itemFullList.length; i++) {
        if (i % 2 === 0) {
          itemArray.push(itemFullList[i]);
        } else {
          descArray.push(itemFullList[i]);
        }
      }
    });
  });

  await axios({
    method: "post",
    url: saveListURL,
    data: {
      itemNameList: itemArray,
      itemDescList: descArray,
      userId: localStorage.getItem("userId"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        alert("List saved successfully.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// async function saveList() {
//   const list = [];
//   const listItems = document.querySelectorAll(".itemList");
//   listItems.forEach((item) => {
//     list.push(item.innerText);
//   });
//   console.log(list);
//   await axios({
//     method: "post",
//     url: saveListURL,
//     data: {
//       list: list,
//       userId: localStorage.getItem("userId"),
//     },
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         alert("List saved successfully.");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
