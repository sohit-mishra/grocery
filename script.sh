#!/usr/bin/env bash
clear
echo "Starting Script..."
echo "Installing devDependencies..."
npm install eslint@8.18.0 prettier@1.17.0 --save-dev 
npm install husky@7.0.0 --save-dev 
npm install lint-staged@12.5.0 --save-dev 
npm install commitizen@4.2.4 --save-dev 
npm install @commitlint/config-conventional@16.2.4 @commitlint/cli@16.3.0 --save-dev 
npm install -g cz-conventional-changelog@3.3.0

npm install @typescript-eslint/eslint-plugin@5.30.0 --save-dev
npm install @typescript-eslint/parser@5.30.0 --save-dev
npm install eslint-config-prettier@8.5.0 --save-dev
npm install eslint-plugin-prettier@4.1.0 --save-dev

echo "Generating .czrc ... "
cat <<EEE > .czrc
 {
  "path": "./node_modules/cz-conventional-changelog"
}
EEE

echo "Generating .commitlintrc ... "
cat <<EEE > .commitlintrc
{
  "extends": [
    "@commitlint/config-conventional"
  ]
}
EEE

echo "Generating .lintstagedrc ... "
cat <<EEE > .lintstagedrc
{
  "*.{js,ts}": [
    "eslint --fix",
    "prettier --write ."
  ],
  "*.{css,less,scss,html,json,jsx}": [
    "prettier --write ."
  ]
}
EEE

echo "Generating .eslintrc.js ... "
cat <<EEE > .eslintrc.js
module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'no-console': ['error'],
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-var-requires': 0,
	},
};
EEE

echo "Initialize commitizen..."
npx commitizen init cz-conventional-changelog --save-dev --save-exact --force

echo "Initialize husky..."
npx husky install
node node_modules/husky/lib/bin add .husky/prepare-commit-msg "exec < /dev/tty && node_modules/.bin/cz --hook || true"
node node_modules/husky/lib/bin add .husky/commit-msg "node_modules/.bin/commitlint --edit"
node node_modules/husky/lib/bin add .husky/pre-commit "node_modules/.bin/lint-staged"


git add .
git reset eslint-node-v14.sh
git clean -f
# git commit --no-verify -m 'feat: eslint added'