export function getPageTitle(title: String) {
  if (!title) {
    return "miniui";
  }
  return `miniui-${title}`;
}
