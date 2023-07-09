import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// * Utility Functions

// => create user profile
export const updateUserName = async (user, name) => {
  await supabase
    .from('users')
    .update({
      full_name: name,
    })
    .eq('id', user.id);
};
// => create update profile avatar
export const updateUserAvatar = async (user, avatarUrl) => {
  await supabase.from('profiles').upsert({
    id: user.id,
    avatar_url: avatarUrl,
  });
};

// => Get Image Src attribute assinable link from image in bucket!
// get public bucket file url for browser view
// https://projectRef.supabase.in/storage/v1/object/filePath/fileName.png
// projectUrl/storage/v1/public/filepathUrl
export const getPublicUrl = (fileUrl) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`;
const sample = `--https://hjqtglhztxzfhnteptxu.supabase.co/storage/v1/object/sign/avatars/1660413568025_FB_IMG_16588521730040454.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzE2NjA0MTM1NjgwMjVfRkJfSU1HXzE2NTg4NTIxNzMwMDQwNDU0LmpwZyIsImlhdCI6MTY2Njc1MzU5MCwiZXhwIjoxOTgyMTEzNTkwfQ.nPwH27a0z5TCuRNBqcrpmIUZUKkBXdgq0nZ2JqA45A8`;

// using a hacky way, direct browser view link
// export const getDirectUrl = (fileUrl) => {
//   const trimmedURL = fileUrl.split('avatars/');
//   const directUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/sign/avatars/${trimmedURL}?token=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
//   return directUrl;
// }

// using signedUrl method
export const getSignedUrl = async (bucketName, url) => {
  const trimmedURL = url.split('avatars/');
  // console.log('trim', trimmedURL[1]);
  const { data: signedURL, error } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(trimmedURL[1], 3600);
  if (error) {
    console.log('Error: ', error.message);
  } else {
    // console.log('signedURL', signedURL);
    return signedURL.signedURL;
  }
};

// using download method
export const getImageFromUrl = async (path) => {
  const trimmedPath = path.split('avatars/');
  // console.log('trim', trimmedPath);
  const { data, error } = await supabase.storage
    .from('avatars')
    .download(trimmedPath);
  if (error) {
    console.log('Error: ', error.message);
  } else {
    return URL.createObjectURL(data);
  }
};
