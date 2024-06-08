
export function importAllImages() {
  const context = require.context('/public/Light', false, /\.(png|jpe?g|svg)$/);
    const images = context.keys().map(context);
  return images;
}
