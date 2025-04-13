type Style = 'plain' | 'markdownv2' | 'html';

interface FormatOptions {
  style?: Style;
  emoji?: string | false;
}

export function formatMessage(
  lines: string[],
  options: FormatOptions = { style: 'plain', emoji: false }
): { text: string; parse_mode?: 'MarkdownV2' | 'HTML' } {
  const { style = 'plain', emoji = false } = options;

  let content = lines.join('\n');

  if (emoji) {
    content = `${emoji} ${content}`;
  }

  let text: string;
  let parse_mode: 'MarkdownV2' | 'HTML' | undefined;

  switch (style) {
    case 'markdownv2':
      text = content.replace(/([*_`\[\]()~>#+=|{}.!\\-])/g, '\\$1');
      parse_mode = 'MarkdownV2';
      break;

    case 'html':
      text = content
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/__(.+?)__/g, '<i>$1</i>')
        .replace(/`(.+?)`/g, '<code>$1</code>');
      parse_mode = 'HTML';
      break;

    default:
      text = content;
      break;
  }

  return { text, parse_mode };
}
