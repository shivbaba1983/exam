# ThinkWalkTalkEnglish React component

## Files
- `ThinkWalkTalkEnglish.tsx` — React + TypeScript component with cleaned, short English practice content.
- `ThinkWalkTalkEnglish.scss` — responsive styling.

## Add to your app
1. Copy both files into the same folder in your React TypeScript project.
2. Make sure Sass is installed: `npm install sass`
3. Import and render the component:

```tsx
import ThinkWalkTalkEnglish from './ThinkWalkTalkEnglish/ThinkWalkTalkEnglish';

function App() {
  return <ThinkWalkTalkEnglish />;
}

export default App;
```

The component includes expandable lessons, searchable text, practice-completion tracking for the current page session, daily-life sentence examples, and a 7-day challenge. It uses no additional UI libraries.
