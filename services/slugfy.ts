const slugfy = (slug: string) => {
  return slug.toLowerCase().split(" ").join("-");
};

export default slugfy;
