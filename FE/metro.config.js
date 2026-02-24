const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix react-native-reanimated and gesture-handler on web
config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (platform === 'web') {
        // Stub out reanimated on web with a no-op
        if (moduleName === 'react-native-reanimated') {
            return {
                filePath: require.resolve('./web-stubs/reanimated-stub.js'),
                type: 'sourceFile',
            };
        }
        if (moduleName === 'react-native-gesture-handler') {
            return {
                filePath: require.resolve('./web-stubs/gesture-handler-stub.js'),
                type: 'sourceFile',
            };
        }
    }
    return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
