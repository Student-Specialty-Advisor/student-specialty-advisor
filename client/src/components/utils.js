const check = (v) => {
  return v === "" ? null : v;
};

const isValidEmail = (email) => {
  if (
    email.substring(email.indexOf("@") + 1) !== possibleEmail[0] &&
    email.substring(email.indexOf("@") + 1) !== possibleEmail[1]
  ) {
    return false;
  }
  return true;
};

const possibleEmail = ["medtech.tn", "smu.tn"];
const invalidPassword = { keyPattern: { password: 1 } };
const invalidEmail = { keyPattern: { email: 1 } };
const emptyInput = { keyPattern: { empty: 1 } };

module.exports = {
  check: check,
  invalidEmail: invalidEmail,
  invalidPassword: invalidPassword,
  emptyInput: emptyInput,
  isValidEmail: isValidEmail,
};
