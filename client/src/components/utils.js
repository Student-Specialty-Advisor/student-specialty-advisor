const check = (v) => {
  return v === "" ? null : v;
};

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: name === "Deleted" ? "darkred" : stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${
      name.split(" ")[1] === undefined || name.split(" ")[1][0] === undefined
        ? name.split(" ")[0][name.split(" ")[0].length - 1].toUpperCase()
        : name.split(" ")[1][0]
    }`,
  };
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
  stringToColor: stringToColor,
  stringAvatar: stringAvatar,
};
