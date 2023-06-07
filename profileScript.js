function redirectToHome() {
  window.location.href = "index.html";
}
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const cancelBtn = document.getElementById("cancelBtn");
const fetchUserInfoURL =
  "https://localhost:7239/api/RequestHandling/fetchUserInfo";
const updateUserInfoURL =
  "https://localhost:7239/api/RequestHandling/updateInfo";

window.onload = async function () {
  let email = document.getElementById("email");
  let username = document.getElementById("username");
  let displayName = document.getElementById("displayName");
  let role = document.getElementById("role");
  let userid = document.getElementById("userid");
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("foo");
  let userInfo = await fetchUserInfo(uid);
  email.innerHTML = userInfo[0].email;
  username.innerText = userInfo[0].username;
  displayName.innerText = userInfo[0].displayName;
  role.innerText = userInfo[0].role;
  userid.innerText = uid;

  var inputFields = document.querySelectorAll(".inputField");
  var existingInfo = document.querySelectorAll(".existingValue");

  editBtn.addEventListener("click", function () {
    editBtn.style.display = "none";
    saveBtn.style.display = "flex";
    cancelBtn.style.display = "flex";
    var length = inputFields.length;
    for (var i = 0; i < length; i++) {
      inputFields[i].style.display = "block";
      existingInfo[i].style.display = "none";
    }
  });
  cancelBtn.addEventListener("click", function () {
    editBtn.style.display = "flex";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
    var length = inputFields.length;
    for (var i = 0; i < length; i++) {
      inputFields[i].style.display = "none";
      existingInfo[i].style.display = "block";
    }
  });
  saveBtn.addEventListener("click", async function () {
    emailInput = document.getElementById("emailInput").value;
    usernameInput = document.getElementById("usernameInput").value;
    displayNameInput = document.getElementById("displayNameInput").value;
    roleInput = document.getElementById("roleInput").value;
    if (
      emailInput.trim() === "" ||
      usernameInput.trim() === "" ||
      displayNameInput.trim() === "" ||
      roleInput.trim() === ""
    ) {
      alert("Please fill all required fields");
      return;
    }
    editBtn.style.display = "flex";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
    var length = inputFields.length;
    for (var i = 0; i < length; i++) {
      inputFields[i].style.display = "none";
      existingInfo[i].style.display = "block";
    }
    var response = await updateUserInfo(
      uid,
      emailInput,
      usernameInput,
      displayNameInput,
      roleInput
    );
    console.log(response);
  });
};
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
async function updateUserInfo(
  userId,
  newEmail,
  newUsername,
  newDisplayName,
  newRole
) {
  let resp = await axios({
    method: "put",
    url: updateUserInfoURL,
    data: {
      userId: userId,
      email: newEmail,
      username: newUsername,
      displayName: newDisplayName,
      role: newRole,
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
