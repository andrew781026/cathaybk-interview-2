// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 80, // 超過 80 個字元就換行
  tabWidth: 2, // 程式碼縮排 2 個空格
  useTabs: false, // 不使用 tab，預設使用空格
  semi: true, // 語句結尾加上分號
  singleQuote: true, // 使用單引號，預設使用雙引號
  quoteProps: 'as-needed', // 預設 'as-needed'，只有在屬性名稱包含特殊字元或空格時才會使用雙引號。否則，它將使用單引號。
  trailingComma: 'es5', // 在物件或陣列最後一個元素後面加上逗號
  bracketSpacing: true, // 在物件的左右括號間加上空格
  arrowParens: 'always', // 箭頭函式只有一個參數時，也需要括號
  endOfLine: 'lf', // 換行符號，預設 lf
};

export default config;
