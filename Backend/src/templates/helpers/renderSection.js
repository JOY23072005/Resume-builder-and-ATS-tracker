export const renderSection = (
  title,
  content
) => {

  if (!content.trim()) return "";

  return `
    <section>

      <h2>
        ${title}
      </h2>

      ${content}

    </section>
  `;

};