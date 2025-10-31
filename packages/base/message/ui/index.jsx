import './index.css';

// Funktion som gör radbrytningar samt gör mailen klickbar och inte dubbel
const formatMessage = (text) => {
  // Matcha markdown-liknande mail: [text](mailto:email), detta fick jag från chatGPT.
  const markdownMailRegex = /\[([^\]]+)\]\(mailto:([^)]+)\)/g;

  // Dela texten på nya rader
  return text.split('\n').map((line, i) => {
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownMailRegex.exec(line)) !== null) {
      // Text före länken
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      // Själva länken
      parts.push(
        <a key={i + match.index} href={`mailto:${match[2]}`} className="message__link">
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    // Text efter sista match
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return <span key={i}>{parts.length ? parts : line}<br /></span>;
  });
}

export const Message = ({ text, role }) => {
  return (
    <article className={`message message--${ role === 'user' ? 'user' : 'assistant' }`}>
      <section className="message__bubble">
        <span className="message__sender">{ role }</span>
        <p className="message__content">
          {formatMessage(text)}
        </p>
      </section>
    </article>
  )
}
