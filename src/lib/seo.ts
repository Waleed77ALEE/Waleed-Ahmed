export const generateImageAltText = (title: string, category: string): string => {
  const safeTitle = title ? title.trim() : 'Image';
  const safeCategory = category ? category.trim() : 'Service';
  return `Waleed Khan Afridi - ${safeTitle} - ${safeCategory} Professional Digital Service`;
};
