// Web stub for react-native-reanimated
const useSharedValue = (init) => ({ value: init });
const useAnimatedStyle = (fn) => fn();
const withTiming = (val) => val;
const withSpring = (val) => val;
const withRepeat = (val) => val;
const withSequence = (...args) => args[args.length - 1];
const withDelay = (_, val) => val;
const useAnimatedGestureHandler = () => ({});
const Easing = { linear: (v) => v, ease: (v) => v, bezier: () => (v) => v, in: (v) => v, out: (v) => v };
const runOnJS = (fn) => fn;
const runOnUI = (fn) => fn;
const interpolate = (v) => v;
const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend' };
const cancelAnimation = () => { };
const makeMutable = (init) => ({ value: init });
const useAnimatedRef = () => ({ current: null });

const createAnimatedComponent = (Component) => Component;

const Animated = {
    View: require('react-native').View,
    Text: require('react-native').Text,
    ScrollView: require('react-native').ScrollView,
    Image: require('react-native').Image,
    FlatList: require('react-native').FlatList,
    createAnimatedComponent,
};

module.exports = {
    __esModule: true,
    default: Animated,
    ...Animated,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withRepeat,
    withSequence,
    withDelay,
    useAnimatedGestureHandler,
    Easing,
    runOnJS,
    runOnUI,
    interpolate,
    Extrapolation,
    cancelAnimation,
    makeMutable,
    useAnimatedRef,
    createAnimatedComponent,
};
