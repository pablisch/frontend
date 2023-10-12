export const formExtractor = (formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const username = formData.get("username");
  const dob = formData.get("dob");

  console.log('name:', name);
  console.log('email:', email);
  console.log('username:', username);
  console.log('dob:', dob);

  if (!name || !email || !username || !dob) {
    console.log('Missing form data');
    return null;
  }

  const formDataProcessed = {
    name,
    email,
    username,
    dob
  }
  console.log('formDataProcessed:', formDataProcessed);
  
  return formDataProcessed;
};

export default formExtractor;