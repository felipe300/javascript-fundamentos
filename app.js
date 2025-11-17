const form = {
  username: "Felipe",
  email: "fake@mail.com",
  age: 44,
  password: "changeme",
};

function validate({ username, age, email, password }) {
  try {
    isValidUsername(username);
    isValidEmail(email);
    isValidAge(age);
    isValidPassword(password);

    console.log("All data is ok!");
  } catch (error) {
    console.error("Error: Error to validate:", error.message);
  }
}

function isValidUsername(username) {
  if (username === null) {
    throw new Error(`Username is null: ${JSON.stringify(form.username)}.`);
  }

  if (username === undefined) {
    throw new Error(`Username is undefined: ${JSON.stringify(form.username)}.`);
  }

  if (username.length === 0) {
    throw new Error(`Username is can not be empty: ${JSON.stringify(form.username)}.`);
  }
}

function isValidAge(age) {
  if (age === null) {
    throw new Error(`Username is null: ${JSON.stringify(form.age)}.`);
  }

  if (age === undefined) {
    throw new Error(`Username is undefined: ${JSON.stringify(form.age)}.`);
  }

  if (age <= 18) {
    throw new Error(`Age is bellow 18 years old: ${JSON.stringify(form.age)}.`);
  }

  if (age >= 99) {
    throw new Error(`Age is above 18 years old: ${JSON.stringify(form.age)}.`);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (typeof email !== "string") {
      throw new Error(`Email is not a string (type: ${typeof email})`);
    }
    if (!emailRegex.test(email)) {
      throw new Error(`Email "${email}" has an invalid format.`);
    }
  } catch (error) {
    console.log("Invalid email: ", error);
    return email;
  }
}

function isValidPassword(password) {
  if (typeof password !== "string") {
    throw new Error("Password must be a string.");
  }

  const length = password.length;

  if (length < 6) {
    throw new Error(
      `Password is too short. It must be at least 6 characters long, but it has ${length}.`,
    );
  }

  if (length > 12) {
    throw new Error(
      `Password is too long. It must be at most 12 characters long, but it has ${length}.`,
    );
  }
}
validate(form);
