import React from 'react';

const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'];

const parseNode = (node: Node, key: number): React.ReactNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    const tagName = element.tagName.toLowerCase();

    if (ALLOWED_TAGS.includes(tagName)) {
      const props: { [key: string]: unknown } = { key };

      if (tagName === 'a') {
        props.href = element.getAttribute('href');
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
      }

      return React.createElement(
        tagName,
        props,
        Array.from(element.childNodes).map((child, childKey) => parseNode(child, childKey)),
      );
    }
  }

  return null;
};

export const parseHtml = (html: string): React.ReactNode[] => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.body.childNodes).map((node, index) => parseNode(node, index));
};
