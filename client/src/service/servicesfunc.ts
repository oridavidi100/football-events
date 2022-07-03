export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
export const postions = [
  'GK',
  'LB',
  'CB',
  'RB',
  'LWB',
  'CDM',
  'RWB',
  'LM',
  'CM',
  'RM',
  'CAM',
  'LW',
  'LF',
  'LC',
  'RF',
  'RW',
  'ST',
];
