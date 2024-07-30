module.exports = {
	testEnvironment: "jest-environment-jsdom",
	setupFilesAfterEnv: ["./src/setupTests.ts"],
	setupFiles: ["./jest.setup.js"],
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
	},
	transform: {
		"^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
	},
	transformIgnorePatterns: ["/node_modules/"],
};
