import marked from 'marked';

export const parseMarkdown = (markdown) => {
  const renderer = new marked.Renderer();

  // Customize the renderer if needed
  renderer.heading = (text, level) => {
    return `<h${level} class="markdown-heading">${text}</h${level}>`;
  };

  // Convert markdown to HTML
  const htmlContent = marked(markdown, { renderer });

  return htmlContent;
};