import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { parseHtml } from './parseHtml';

describe(parseHtml.name, () => {
  it('should parses simple HTML correctly', () => {
    const html = '<p>hello</p><p><strong>world</strong>!</p>';
    const result = parseHtml(html);
    render(result as ReactNode);

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('world')).toHaveStyle('font-weight: bold');
  });

  it('should handle links correctly', () => {
    const html = '<a href="https://example.com">Link</a>';
    const result = parseHtml(html);
    render(result as ReactNode);

    const link = screen.getByText('Link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should ignore disallowed tags', () => {
    const html = '<p>Safe</p><script>alert("unsafe")</script>';
    const result = parseHtml(html);
    render(result as ReactNode);

    expect(screen.getByText('Safe')).toBeInTheDocument();
    expect(screen.queryByText('alert("unsafe")')).not.toBeInTheDocument();
  });
});
