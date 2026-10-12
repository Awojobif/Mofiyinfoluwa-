export const PROJECTS = [
  { id: 'mailmint', name: 'MailMint', path: '#/projects/mailmint' },
  { id: 'poise', name: 'Poise', path: '#/projects/poise' },
];

export function getProjectNavigation(currentId) {
  const index = PROJECTS.findIndex((p) => p.id === currentId);
  const prev = index > 0 ? PROJECTS[index - 1] : null;
  const next = index >= 0 && index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null;

  return {
    prev,
    next,
    home: '#/',
  };
}
