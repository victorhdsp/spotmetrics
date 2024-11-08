/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	setupFilesAfterEnv: ["<rootDir>/test/helpers/setup.ts"],
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
};
