import {
	useAccessibilityInfo,
	useDeviceOrientation, useDimensions
} from '@react-native-community/hooks';
import * as React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import create from './create';
import TailwindContext from './tailwind-context';
import { Utilities } from './types';

interface Props {
	utilities: Utilities;
	colorScheme?: ColorSchemeName;
	children?: React.ReactNode | React.ReactNode[]
}

const TailwindProvider: React.FC<Props> = ({
	utilities,
	colorScheme: overrideColorScheme,
	children
}) => {
	const colorScheme = useColorScheme() ?? 'light';
	const {width, height} = useDimensions().window;
	const {reduceMotionEnabled: reduceMotion} = useAccessibilityInfo();
	const orientation = useDeviceOrientation().portrait
		? 'portrait'
		: 'landscape';

	const tailwind = React.useMemo(() => {
		return create(utilities, {
			colorScheme: overrideColorScheme ?? colorScheme,
			width,
			height,
			reduceMotion: Boolean(reduceMotion),
			orientation
		});
	}, [
		utilities,
		colorScheme,
		overrideColorScheme,
		width,
		height,
		reduceMotion,
		orientation
	]);

	return (
		<TailwindContext.Provider value={tailwind}>
			{children}
		</TailwindContext.Provider>
	);
};

export default TailwindProvider;
