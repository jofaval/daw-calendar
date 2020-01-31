class View {
  constructor() {}

  createElement(tag, className) {
    return $(`<${tag} class="${className}"></${tag}>`);
  }
}
