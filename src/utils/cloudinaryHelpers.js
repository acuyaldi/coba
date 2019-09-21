export const getCloudinaryPublicId = (str) => {
  console.log(str);
  let publicId = str;
  const url = publicId.lastIndexOf('/');
  const extension = publicId.lastIndexOf('.');
  publicId = publicId.substr(url, extension);
  publicId = publicId.substr(1, publicId.lastIndexOf('.') - 1);
  return publicId;
}