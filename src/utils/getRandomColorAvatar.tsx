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

/**
 * A function that returns a random class with an account color. Returns a string
 * @returns colorClassList
 * @example
 * const randomColorAvatar = getRandomColorAvatar();

   console.log(randomColorAvatar); // Output: accountTeal
*/

export const getRandomColorAvatar = (): string => {
  return colorClassList[Math.floor(Math.random() * colorClassList.length)];
}