const check = (v) => {
  return v === "" ? null : v;
};
const possibleEmail = ["medtech.tn", "smu.tn"];
const invalidPassword = { keyPattern: { password: 1 } };
const invalidEmail = { keyPattern: { email: 1 } };
const emptyInput = { keyPattern: { empty: 1 } };

module.exports = {
  check: check,
  possibleEmail: possibleEmail,
  invalidEmail: invalidEmail,
  invalidPassword: invalidPassword,
  emptyInput: emptyInput,
};
