const loginInfoURL = "https://localhost:7239/api/RequestHandling/postLoginInfo"; //http://localhost:5198
const signupInfoURL =
  "https://localhost:7239/api/RequestHandling/postSignupInfo";
const saveListURL = "https://localhost:7239/api/RequestHandling/saveListData";
const loadAllListsURL =
  "https://localhost:7239/api/RequestHandling/getAllLists"; //requires userid
const loadSingleListURL =
  "https://localhost:7239/api/RequestHandling/loadSpecificList"; //requires userid + listname
const deleteListURL = "https://localhost:7239/api/RequestHandling/deleteList"; //requires userid + listname
const fetchUserInfoURL =
  "https://localhost:7239/api/RequestHandling/fetchUserInfo"; //requires userid
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
  const loginSubmit = document.getElementById("loginSubmit");
  const signupSubmit = document.getElementById("signupSubmit");
  const toggleAnim = document.querySelector(".removeAnim");
  const toggleMusic = document.querySelector(".toggleMusic");
  const loadLists = document.querySelector(".loadLists");

  const saveListSubmit = document.getElementById("saveListNameSubmit");
  const loadButton = document.getElementById("loadButton");

  const profileButton = document.getElementById("profile");
  const profileEdit = document.getElementById("profileEdit");

  logoutButton.style.display = "none";
  profileButton.style.display = "none";

  if (localStorage.getItem("userId") != null) {
    loginButton.style.display = "none";
    signupButton.style.display = "none";
    logoutButton.style.display = "block";

    enableButtons();
    profileButton.style.display = "block";
  }

  //const profileModal = document.querySelector(".profileModal");
  //var profModal = new bootstrap.Modal(profileModal, {});
  // var myModal = new bootstrap.Modal(
  //   document.getElementById("profileModal"),
  //   options
  // );

  const profileBtn = document.getElementById("profile");

  const useridInfo = document.getElementById("userid");
  const emailInfo = document.getElementById("email");
  const usernameInfo = document.getElementById("username");
  const nameSide = document.getElementById("nameSide");
  const roleSide = document.getElementById("roleSide");

  profileBtn.addEventListener("click", async function () {
    userId = localStorage.getItem("userId");
    let result = await fetchUserInfo(userId);
    console.log(result);
    useridInfo.innerText = userId;
    emailInfo.innerText = result[0].email;
    usernameInfo.innerText = result[0].username;
    nameSide.innerText = result[0].displayName;
    roleSide.innerText = result[0].role;
  });

  addButton.addEventListener("click", function () {
    const itemName = document.getElementById("input1").value;
    const itemDesc = document.getElementById("input2").value;
    if (itemName.trim() === "" || itemDesc.trim() === "") {
      alert("Please enter a value for both fields.");
      return;
    }
    const li = document.createElement("li");
    const p = document.createElement("p");
    li.setAttribute("id", "nameList");
    li.appendChild(document.createTextNode(itemName));
    p.setAttribute("id", "descList");
    p.appendChild(document.createTextNode(itemDesc));
    p.className = "descList";
    itemList.appendChild(li);
    li.appendChild(p);
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
    if (img.src.match("icons/iconPlay.png")) {
      img.src = "icons/iconPause.png";
      document.querySelector(".audioControls").style.visibility = "visible";
      document.getElementById("music").play();
    } else {
      img.src = "icons/iconPlay.png";
      document.querySelector(".audioControls").style.visibility = "hidden";
      document.getElementById("music").pause();
    }
  });

  toggleAnim.addEventListener("click", function () {
    var img = document.getElementById("removeAnim");
    if (img.src.match("icons/iconPauseAnim.png")) {
      document.getElementById("body").style.backgroundImage =
        "url('images/bgStatic.png')";
      document.getElementById("body").style.backgroundSize = "100%";
      img.src = "icons/iconPlayAnim.png";
    } else {
      img.src = "icons/iconPauseAnim.png";
      document.getElementById("body").style.backgroundImage =
        "url('images/bgGif.gif')";
      document.getElementById("body").style.backgroundSize = "100%";
    }
  });

  loadButton.addEventListener("click", async function () {
    userId = localStorage.getItem("userId");
    const res = await loadAllLists(userId);
    let length = res.length;
    for (let i = 0; i < length; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "loadSpecificList";
      btn.setAttribute("data-bs-dismiss", "modal");
      btn.setAttribute("onclick", "clearList()");
      btn.setAttribute("id", `${res[i].listName}`);
      btn.innerText = `${res[i].listName}, ${res[i].timeCreated}`;
      const x = document.createElement("button");
      x.type = "button";
      x.className = "deleteList";
      x.setAttribute("id", `${res[i].listName}`);
      x.setAttribute("data-bs-dismiss", "modal");
      loadLists.appendChild(btn);
      loadLists.appendChild(x);
    }
    const loadTargetListButtons =
      document.querySelectorAll(".loadSpecificList");
    loadTargetListButtons.forEach(function (btn) {
      btn.addEventListener("click", async function () {
        userId = localStorage.getItem("userId");
        listName = btn.getAttribute("id");
        const listData = await loadSingleList(userId, listName);
        if (itemList === null) {
          for (let i = 0; i < listData[0].nameData.length; i++) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            li.setAttribute("id", "nameList");
            li.appendChild(document.createTextNode(listData[0].nameData[i]));
            p.setAttribute("id", "descList");
            p.appendChild(document.createTextNode(listData[0].descData[i]));
            p.className = "descList";
            itemList.appendChild(li);
            li.appendChild(p);
          }
        } else {
          itemList.innerHTML = null;
          for (let i = 0; i < listData[0].nameData.length; i++) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            li.setAttribute("id", "nameList");
            li.appendChild(document.createTextNode(listData[0].nameData[i]));
            p.setAttribute("id", "descList");
            p.appendChild(document.createTextNode(listData[0].descData[i]));
            p.className = "descList";
            itemList.appendChild(li);
            li.appendChild(p);
          }
        }
      });
    });
    const deleteListBTN = document.querySelectorAll(".deleteList");
    deleteListBTN.forEach(function (x) {
      x.addEventListener("click", async function () {
        userId = localStorage.getItem("userId");
        listName = x.getAttribute("id");
        //console.log(userId, listName);
        const response = await deleteSingleList(userId, listName);
        //console.log();
      });
    });
  });
  profileEdit.addEventListener("click", function () {
    redirectToProfile();
  });

  //dark/light mode

  ////////////////////////////////
  //REPLACE WITH CCS FILE LATER//
  //////////////////////////////

  appearanceMode.addEventListener("click", function () {
    var img = document.getElementById("appearanceButton");
    if (img.src.match("icons/iconLight.png")) {
      img.src = "icons/iconDark.png";
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
      document.getElementById("loginSubmit").style.color = "#33a7ff";
      document.getElementById("loginCancel").style.color = "#33a7ff";
      document.getElementById("signupSubmit").style.color = "#33a7ff";
      document.getElementById("signupCancel").style.color = "#33a7ff";
      document.querySelector(".removeAnim").style.display = "none";
    } else {
      img.src = "icons/iconLight.png";
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
      document.getElementById("loginSubmit").style.color = "#18d5e2be";
      document.getElementById("loginCancel").style.color = "#18d5e2be";
      document.getElementById("signupSubmit").style.color = "#18d5e2be";
      document.getElementById("signupCancel").style.color = "#18d5e2be";
      document.querySelector(".removeAnim").style.display = "flex";
    }
  });
  signupSubmit.addEventListener("click", function () {
    const username = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput2").value;
    const password = document.getElementById("passwordTemplate").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const displayName = document.getElementById("displayNameField").value;
    const role = document.getElementById("roleField").value;
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirm.trim() === "" ||
      displayName.trim() === "" ||
      role.trim() === ""
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
    signup(username, email, password, id, displayName, role);
    clearForm();
  });
  loginSubmit.addEventListener("click", function () {
    email = document.getElementById("emailInput").value;
    password = document.getElementById("passwordInput").value;
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    login(email, password).then((result) => {
      if (result !== null) {
        logoutButton.style.display = "block";
        loginButton.style.display = "none";
        signupButton.style.display = "none";
        localStorage.setItem("userId", result);
        enableButtons();
        clearForm();
      } else {
        document.querySelector(".failed").style.display = "block";
      }
      logoutButton.style.display = "block";
      clearForm();
    });
  });
  logoutButton.addEventListener("click", function () {
    signOut();
  });
  saveListSubmit.addEventListener("click", function () {
    saveList();
    clearForm();
  });
};
function clearForm() {
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput2").value = "";
  document.getElementById("passwordTemplate").value = "";
  document.getElementById("passwordConfirm").value = "";
  document.getElementById("listNameInput").value = "";
}
async function login(email, password) {
  try {
    const response = await axios({
      method: "post",
      url: loginInfoURL,
      data: { email: email, password: password },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Logged in successfully.");
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function signup(username, email, password, id, displayName, role) {
  const data = {
    username: username,
    email: email,
    password: password,
    userId: id,
    displayName: displayName,
    role: role,
  };
  await axios({
    method: "post",
    url: signupInfoURL,
    data: JSON.stringify(data),
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
async function loadAllLists(userId) {
  let resp = await axios({
    method: "post",
    url: loadAllListsURL,
    data: {
      userId: userId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        console.log("NO RESPONSE");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return resp;
}
function signOut() {
  localStorage.clear();
  window.location.reload();
}

async function saveList() {
  const nameData = [];
  const descData = [];
  const listItems = document.querySelectorAll(".itemList");

  listItems.forEach((item) => {
    const itemFullList = item.innerText.split("\n\n");
    for (let i = 0; i < itemFullList.length; i++) {
      if (i % 2 === 0) {
        nameData.push(itemFullList[i]);
      } else {
        descData.push(itemFullList[i]);
      }
    }
  });
  const data = {
    listName: document.getElementById("listNameInput").value,
    nameData: nameData,
    descData: descData,
    userId: localStorage.getItem("userId"),
  };
  await axios({
    method: "post",
    url: saveListURL,
    data: JSON.stringify(data),
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
async function loadSingleList(userId, listName) {
  let listResp = await axios({
    method: "post",
    url: loadSingleListURL,
    data: {
      userId: userId,
      listName: listName,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        console.log("NO RESPONSE");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return listResp;
}
async function deleteSingleList(userId, listName) {
  let res = await axios({
    method: "delete",
    url: deleteListURL,
    data: {
      userId: userId,
      listName: listName,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        console.log("NO RESPONSE");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
}
async function fetchUserInfo(userId) {
  let resp = await axios({
    method: "post",
    url: fetchUserInfoURL,
    data: {
      userId: userId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response) {
        return response.data;
      } else {
        console.log("NO RESPONSE");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return resp;
}
function redirectToMaps() {
  window.location.href = "about.html";
}
function redirectToProfile() {
  window.location.href = "profile.html";
}
function clearScreen() {
  document.getElementById("result").value = "";
}

// This function display values
function display(value) {
  document.getElementById("result").value += value;
}

// This function evaluates the expression and returns result
function calculate() {
  var p = document.getElementById("result").value;
  var q = eval(p);
  document.getElementById("result").value = q;
}
function enableButtons() {
  saveButton.disabled = false;
  saveButton.className = "saveButton";
  loadButton.disabled = false;
  loadButton.className = "loadButton";
}

function clearList() {
  const loadLists = document.querySelector(".loadLists");
  loadLists.innerHTML = "";
}
function redirectToWeather() {
  window.location.href = "weather.html";
}
