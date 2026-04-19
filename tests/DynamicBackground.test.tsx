import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import DynamicBackground from '../src/components/DynamicBackground';
import React from 'react';

describe('DynamicBackground Component', () => {
  it('renders no emojis if person is unmapped', () => {
    const { container } = render(<DynamicBackground person="Unknown" />);
    // container is empty if null returned
    expect(container.firstChild).toBeNull();
  });

  it('renders emojis for Milo', () => {
    const { container } = render(<DynamicBackground person="Milo 🐱" />);
    const spans = container.querySelectorAll('.floating-emoji');
    expect(spans.length).toBe(8); // Renders exactly 8 floated emojis
    
    // one of the cats should be rendered
    const textContent = Array.from(spans).map(s => s.textContent);
    expect(textContent).toContain('🐾');
  });
});
