// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/**
 * **Additional steps: Update your metro config**
 *
 * We use the sbmodern resolver field in order to resolve the modern version of storybook packages.
 * Doing this removes the polyfills that ship * in commonjs modules and fixes multiple long standing issues such as the promises never resolving bug and more (caused by corejs promises polyfill).
 *
 * @see docs https://github.com/storybookjs/react-native#additional-steps-update-your-metro-config
 */
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolverMainFields.unshift('sbmodern');

module.exports = defaultConfig;
