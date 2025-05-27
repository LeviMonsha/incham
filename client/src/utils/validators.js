export const validateName = (name) => {
  const nameRegex = /^[a-zA-Zа-яА-Я]{2,15}$/;
  if (!nameRegex.test(name)) {
    return "Имя должно содержать от 2 до 15 символов";
  }
  return null;
};

export const validateSurname = (surname) => {
  const nameRegex = /^[a-zA-Zа-яА-Я]{2,15}$/;
  if (!nameRegex.test(surname)) {
    return "Фамилия должна содержать от 2 до 15 символов";
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Некорректный email";
  }
  return null;
};

export const validateLogin = (login) => {
  if (login.length < 6) {
    return "Логин должен содержать не менее 6 символов";
  }
  return null;
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Пароль должен содержать не менее 8 символов";
  }
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[@#$!%*?&]/.test(password);

  if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) {
    return "Пароль должен содержать не менее 8 символов, включая прописные, строчные буквы, цифры и символы";
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Пароли не совпадают";
  }
  return null;
};

export const validateAgreement = (agreement) => {
  if (!agreement) {
    return "Необходимо принять правила";
  }
  return null;
};

export const validateIsAdult = (isAdult) => {
  if (isAdult === "") {
    return "Необходимо подтвердить возраст";
  }
  return null;
};

export const validateIsMale = (isMale) => {
  if (isMale == null) {
    return "Необходимо выбрать пол";
  }
  return null;
};
