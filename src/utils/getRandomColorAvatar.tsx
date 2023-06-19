const colorClassList = [
  'accountSilver',
  'accountPink',
  'accountPurple',
  'accountGreen',
  'accountTeal',
  'accountLightBlue',
  'accountBlue',
  'accountOrange',
  'accountYellow',
  'accountRed'
];

export const getRandomColorAvatar = () => {
  return colorClassList[Math.floor(Math.random() * colorClassList.length)];
}