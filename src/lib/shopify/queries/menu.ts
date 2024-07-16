export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
        submenu: items {
          title
          url
        }
      }
    }
  }
`;
