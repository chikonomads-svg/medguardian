// Web stub for react-native-gesture-handler
const React = require('react');
const RN = require('react-native');

const State = { UNDETERMINED: 0, FAILED: 1, BEGAN: 2, CANCELLED: 3, ACTIVE: 4, END: 5 };
const Directions = { RIGHT: 1, LEFT: 2, UP: 4, DOWN: 8 };

const GestureHandlerRootView = ({ children, style, ...props }) =>
    React.createElement(RN.View, { style, ...props }, children);

const gestureHandlerRootHOC = (Component) => Component;

const Swipeable = RN.View;
const DrawerLayout = RN.View;

// Gesture handler button components
const RawButton = RN.TouchableOpacity;
const BaseButton = RN.TouchableOpacity;
const RectButton = RN.TouchableOpacity;
const BorderlessButton = RN.TouchableOpacity;

const TouchableHighlight = RN.TouchableHighlight;
const TouchableNativeFeedback = RN.TouchableOpacity;
const TouchableOpacity = RN.TouchableOpacity;
const TouchableWithoutFeedback = RN.TouchableWithoutFeedback;

const ScrollView = RN.ScrollView;
const FlatList = RN.FlatList;

const PanGestureHandler = RN.View;
const TapGestureHandler = RN.View;
const LongPressGestureHandler = RN.View;
const PinchGestureHandler = RN.View;
const RotationGestureHandler = RN.View;
const FlingGestureHandler = RN.View;
const NativeViewGestureHandler = RN.View;
const ForceTouchGestureHandler = RN.View;

const Gesture = {
    Pan: () => ({ onStart: () => { }, onUpdate: () => { }, onEnd: () => { } }),
    Tap: () => ({ onStart: () => { }, onEnd: () => { } }),
    LongPress: () => ({ onStart: () => { }, onEnd: () => { } }),
    Pinch: () => ({ onStart: () => { }, onUpdate: () => { }, onEnd: () => { } }),
    Rotation: () => ({ onStart: () => { }, onUpdate: () => { }, onEnd: () => { } }),
    Fling: () => ({ onStart: () => { }, onEnd: () => { } }),
    Race: (...args) => args[0],
    Simultaneous: (...args) => args[0],
    Exclusive: (...args) => args[0],
};

const GestureDetector = ({ children }) => children;

module.exports = {
    __esModule: true,
    default: {},
    State,
    Directions,
    GestureHandlerRootView,
    gestureHandlerRootHOC,
    Swipeable,
    DrawerLayout,
    RawButton,
    BaseButton,
    RectButton,
    BorderlessButton,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    FlatList,
    PanGestureHandler,
    TapGestureHandler,
    LongPressGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    FlingGestureHandler,
    NativeViewGestureHandler,
    ForceTouchGestureHandler,
    Gesture,
    GestureDetector,
};
