const maxLength = {
  name: 16,
  email: 200,
  phone: 12,
  text: 2000,
};

export const validation = (key: string, value: string) => {
  if (value === "") {
    switch (key) {
      case "name":
        return "名前を入力してください";
      case "email":
        return "メールアドレスを入力してください";
      case "phone":
        return "電話番号を入力してください";
      case "product":
        return "製品を選択してください";
      case "text":
        return "お問い合わせ内容を入力してください";
    }
  } else {
    switch (key) {
      case "name":
        if (value.length > maxLength.name) {
          return `${maxLength.name}文字以下で入力してください`;
        }
        break;
      case "email":
        if (value.length > maxLength.email) {
          return `${maxLength.email}文字以下で入力してください`;
        }
        break;
      case "phone":
        if (value.length > maxLength.phone) {
          return `${maxLength.phone}文字以下で入力してください`;
        }
        break;
      case "text":
        if (value.length > maxLength.text) {
          return `${maxLength.text}文字以下で入力してください`;
        }
        break;
      default:
        break;
    }
  }
  if (key === "email") {
    const regex =
      /^([\w!#$%&'*+\-/=?^`{|}~]+(\.[\w!#$%&'*+\-/=?^`{|}~]+)*|"([\w!#$%&'*+\-/=?^`{|}~. ()<>[\]:;@,]|\\[\\"])+")@(([a-zA-Z\d-]+\.)+[a-zA-Z]+|\[(\d{1,3}(\.\d{1,3}){3}|IPv6:[\da-fA-F]{0,4}(:[\da-fA-F]{0,4}){1,5}(:\d{1,3}(\.\d{1,3}){3}|(:[\da-fA-F]{0,4}){0,2}))\])$/;
    if (!regex.test(value)) {
      return "正しい形式で入力してください";
    }
  }
  return "";
};
