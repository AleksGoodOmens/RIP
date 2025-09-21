import { render, screen } from '@testing-library/react';

import { VariablesGuide } from './VariablesGuide';

interface TextProps {
  as?: React.ElementType;
  variant?: string;
  children?: React.ReactNode;
}

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      'variablesGuide.title': 'Variables Guide',
      'variablesGuide.intro': 'Introduction to variables',
      'variablesGuide.howToUse': 'How to Use Variables',
      'variablesGuide.syntaxTitle': 'Syntax',
      'variablesGuide.syntaxDescription': 'Variable syntax description',
      'variablesGuide.usagePlacesTitle': 'Where to Use Variables',
      'variablesGuide.usagePlaces.url': 'URL: ',
      'variablesGuide.usagePlaces.headers': 'Headers: ',
      'variablesGuide.usagePlaces.body': 'Body: ',
      'variablesGuide.examplesTitle': 'Examples',
      'variablesGuide.examples.urlExample': 'URL Example: ',
      'variablesGuide.examples.headerExample': 'Header Example: ',
      'variablesGuide.examples.bodyExample': 'Body Example: ',
      'variablesGuide.featuresTitle': 'Features',
      'variablesGuide.features.storage': 'Storage feature',
      'variablesGuide.features.autoload': 'Autoload feature',
      'variablesGuide.features.lazyLoad': 'Lazy load feature',
      'variablesGuide.tipsTitle': 'Tips',
      'variablesGuide.tips.naming': 'Naming tips',
      'variablesGuide.tips.confidential': 'Confidentiality tips',
      'variablesGuide.tips.validation': 'Validation tips',
      'variablesGuide.conclusion': 'Conclusion text',
    };
    return translations[key] || key;
  }),
}));

jest.mock('@/components', () => ({
  Text: ({ children, as: Component = 'div', ...props }: TextProps) => (
    <Component {...props}>{children}</Component>
  ),
}));

describe('VariablesGuide', () => {
  it('renders the component with all sections', async () => {
    const Component = await VariablesGuide();
    render(Component);

    expect(screen.getByText('Variables Guide')).toBeInTheDocument();

    expect(screen.getByText('Introduction to variables')).toBeInTheDocument();

    expect(screen.getByText('How to Use Variables')).toBeInTheDocument();

    expect(screen.getByText('Syntax')).toBeInTheDocument();
    expect(screen.getByText('Variable syntax description')).toBeInTheDocument();
    expect(screen.getByText('{{variable_name}}')).toBeInTheDocument();

    expect(screen.getByText('Where to Use Variables')).toBeInTheDocument();
    expect(screen.getByText(/URL:/)).toBeInTheDocument();
    expect(screen.getByText(/Headers:/)).toBeInTheDocument();
    expect(screen.getByText(/Body:/)).toBeInTheDocument();

    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(screen.getByText(/URL Example:/)).toBeInTheDocument();
    expect(screen.getByText(/Header Example:/)).toBeInTheDocument();
    expect(screen.getByText(/Body Example:/)).toBeInTheDocument();

    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Storage feature')).toBeInTheDocument();
    expect(screen.getByText('Autoload feature')).toBeInTheDocument();
    expect(screen.getByText('Lazy load feature')).toBeInTheDocument();

    expect(screen.getByText('Tips')).toBeInTheDocument();
    expect(screen.getByText('Naming tips')).toBeInTheDocument();
    expect(screen.getByText('Confidentiality tips')).toBeInTheDocument();
    expect(screen.getByText('Validation tips')).toBeInTheDocument();

    expect(screen.getByText('Conclusion text')).toBeInTheDocument();
  });

  it('displays code examples correctly', async () => {
    const Component = await VariablesGuide();
    render(Component);

    expect(screen.getByText('{{variable_name}}')).toBeInTheDocument();
    expect(
      screen.getByText(/https:\/\/api\.example\.com\/{{resource}}\/{{id}}/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Authorization: Bearer {{api_token}}/)).toBeInTheDocument();
    expect(screen.getByText(/Content-Type: {{APPLICATION_JSON}}/)).toBeInTheDocument();
  });
});
