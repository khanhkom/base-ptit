import React from 'react';

import Svg, { Path } from 'react-native-svg';

import R from '@assets/R';

const FaceID = (props: any) => {
  const { type, width, color } = props;

  switch (type) {
    case 'TouchID':
      return (
        <Svg width={width} height={width} viewBox="0 0 512 512">
          <Path
            d="M237 11.1c-32.9 2.9-63.5 11.3-92.5 25.4-17.5 8.5-26.9 14.7-28.9 18.9-3.4 7.3-.8 14.7 6.2 17.8 5.6 2.5 7.3 2.1 19.9-5.3 26.2-15.5 59.6-26.4 91.5-29.8 5.4-.6 17.4-1.1 26.8-1.1 9.4 0 21.4.5 26.8 1.1 32.5 3.5 66.5 14.9 93 31.2 9.4 5.7 14.4 6.6 19.4 3.3 5.1-3.3 7.2-11.4 4.6-17.2-2.4-5.3-27.5-19.5-49-27.8-18.8-7.2-37.2-11.9-59.8-15.1-13.4-1.9-44.4-2.6-58-1.4z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M236.8 71c-56.8 5.1-107.6 29-148.2 69.6-10.9 10.9-23.3 25.6-30.7 36.5-5.4 8-6.2 13.7-2.7 18.9 4.5 6.6 14.2 7.7 19.3 2.2 1.3-1.5 5.9-7.4 10.2-13.2 10.1-13.8 32.9-36.6 46.7-46.8 29.6-21.8 61.7-34.7 98.6-39.7 12.3-1.7 38.7-1.9 51.5-.5 60.7 6.9 116.8 38.8 150.8 85.4 4 5.5 8.6 11.4 10.3 13.2 8 8.5 21.4 2.7 21.4-9.2 0-4.9-5.1-13.3-17.8-29-30.9-38.4-79-68.4-129.8-80.9-23.6-5.8-57-8.5-79.6-6.5z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M240.5 130.1c-58 5.9-109.7 37.8-139.7 86.1-27.7 44.6-35.6 102.6-22.7 166.7 1.1 5.7 3.6 15.8 5.5 22.5 2.7 9.9 3.9 12.6 6.4 14.8 5.3 4.9 12.6 4.9 17.4.2 4.6-4.7 4.9-8.5 1.7-20.4-7.7-27.8-10.2-43.4-10.8-69.5-.6-23.8.7-36.8 5.7-55.9 15.3-59.1 60.7-102 122.7-115.8 13.4-3 49.1-3.3 62.3-.5 52.1 11.1 92.4 41.9 115.5 88.2 7.3 14.6 11.3 26.1 14.6 41.5 1.9 8.5 2.3 13.8 2.3 27.5l.1 17-3.6 7.5c-6.2 12.8-14.9 20.6-27.7 24.9-12 4.1-27.9 2-38.5-5-8.9-5.9-16.8-16.4-19.6-26.4-.6-2.2-1.6-9-2.1-15.1-1.5-17.6-6.3-30.4-15.9-42.4-9.1-11.3-20.1-19-33.2-23.5-10.9-3.6-27.7-4.6-38.4-2.1-25.8 6-47.7 28.7-54 55.9-7 30.4 3.2 75.2 25.5 112.2 13.6 22.5 34.6 44 57.5 58.8 14.9 9.6 43.9 22.4 53 23.4 3.1.4 4.8-.1 7.5-1.9 4.3-2.9 6-6.1 6-11.3 0-5.9-2.9-9.9-8.7-12-34-12.4-54.3-25-73.6-45.5-9.2-9.7-17.9-21.9-24.5-34-11.2-20.5-19.2-49.7-19.2-69.3.1-31.7 25.1-55.7 53.1-50.9 10.3 1.8 17.3 5.5 25 13.1 10.2 10.2 12.5 16.4 14.8 38.7 1.9 18.8 9.3 33.7 23.1 46.7 19.2 18.1 46.1 24 71.3 15.6 20.4-6.7 37.7-24.5 45.4-46.4 2.7-7.6 2.8-8.8 2.8-26.5 0-28.8-5.6-53.5-18-79.5-27.3-56.9-79.5-96-141.5-106-12.1-1.9-35.9-2.6-47.5-1.4z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M244.5 189c-24.6 3.2-49.5 14.2-69.4 30.7-42.7 35.5-56.5 95.9-37.5 164.9 9.3 34 26.4 67.8 46.5 91.9 13 15.6 19.6 20.2 26.5 18.9 10.8-2 13.8-17.2 4.8-24-5-3.9-17.8-19.3-24.6-29.9-12.6-19.4-24-46.2-29.6-69.5-4.7-19.2-5.6-27-5.6-46 0-20.4 2.1-32.2 8.1-47.3 12.4-30.9 41.7-54.7 76.3-61.9 7.7-1.6 12-1.9 23-1.5 16.2.6 25.5 2.8 38.9 9.3 12.8 6.1 20 11.4 30.6 22.6 17.6 18.5 27.8 42 29.1 67.3.7 12.3 1.7 15.7 5.5 18.9 6.1 5.1 14.8 3.9 19-2.6 1.9-3 2-4.3 1.5-15.3-1.1-26.2-8.3-48.4-23.1-70.6-18.1-27.2-46.8-46.6-79.5-54-9.9-2.2-30.4-3.2-40.5-1.9z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M250.2 310.4c-3.7 3.4-3.7 3.5-4.1 12.6-.8 23.2 8.8 53.7 24.4 77 6.2 9.2 20 23.4 28 28.7 21.1 14.1 44.3 20.3 75.8 20.3 23.1-.1 30.1-1 33.8-4.6 7.5-7.2 4.8-19.6-4.8-22.3-1.7-.5-6.3-.5-10.4 0-25.6 2.9-51-.6-69.4-9.5-17.2-8.5-30.1-22.3-40.1-43.1-6.9-14.3-10.2-26.8-11.3-42-.4-6.7-1.4-13.1-2-14.3-1.9-3.5-7.1-6.2-11.9-6.2-3.4 0-4.9.6-8 3.4z"
            fill={color ?? R.colors.primaryColor}
          />
        </Svg>
      );
    case 'FaceID':
      return (
        <Svg width={width} height={width} viewBox="0 0 512 512">
          <Path
            d="M84.2 24.6c-29.9 6.5-53.4 30.5-59.6 60.6-1.3 6.3-1.6 15.4-1.6 50.8v43h31.9l.3-44.8.3-44.7 3.7-7.8c5-10.3 12.2-17.5 22.5-22.5l7.8-3.7 44.8-.3 44.7-.3V23l-44.2.1c-33.6.1-45.8.4-50.6 1.5zM333 39v15.9l44.8.3 44.7.3 7.8 3.7c10.3 5 17.5 12.2 22.5 22.5l3.7 7.8.3 44.7.3 44.8H489v-43.4c0-46.7-.4-51.3-5.4-63.8-9.8-24.1-31.2-42-56.8-47.2-6.3-1.3-15.4-1.6-50.8-1.6h-43v16zM147 194v16h32v-32h-32v16zM333 194v16h32v-32h-32v16zM162.5 302.1c-6.6 4.9-12.1 9.3-12.3 9.7-.3 1 11.3 13.9 17.8 19.8 34.8 31.3 86.2 41.6 131 26.4 15.7-5.4 33.6-15.9 45.5-26.8 5.3-4.9 17.5-18.3 17.5-19.2 0-.3-5.6-4.7-12.4-9.8l-12.5-9.3-9.3 9.4c-19.3 19.5-40.7 29.2-67.3 30.4-29.3 1.3-54-8.4-75.3-29.5-5.7-5.6-10.4-10.2-10.5-10.2-.1 0-5.6 4.1-12.2 9.1zM23 376.4c0 46.7.4 51.3 5.4 63.8 9.8 24.1 31.2 42 56.8 47.2 6.3 1.3 15.4 1.6 50.8 1.6h43v-31.9l-44.7-.3-44.8-.3-7.8-3.7c-10.3-5-17.5-12.2-22.5-22.5l-3.7-7.8-.3-44.8-.3-44.7H23v43.4zM456.8 377.7l-.3 44.8-3.7 7.8c-5 10.3-12.2 17.5-22.5 22.5l-7.8 3.7-44.7.3-44.8.3V489h43.4c46.7 0 51.3-.4 63.8-5.4 24.1-9.8 42-31.2 47.2-56.8 1.3-6.3 1.6-15.4 1.6-50.8v-43h-31.9l-.3 44.7z"
            fill={color ?? R.colors.primaryColor}
          />
        </Svg>
      );

    default:
      return (
        <Svg width={width} height={width} viewBox="0 0 512 512">
          <Path
            d="M237 11.1c-32.9 2.9-63.5 11.3-92.5 25.4-17.5 8.5-26.9 14.7-28.9 18.9-3.4 7.3-.8 14.7 6.2 17.8 5.6 2.5 7.3 2.1 19.9-5.3 26.2-15.5 59.6-26.4 91.5-29.8 5.4-.6 17.4-1.1 26.8-1.1 9.4 0 21.4.5 26.8 1.1 32.5 3.5 66.5 14.9 93 31.2 9.4 5.7 14.4 6.6 19.4 3.3 5.1-3.3 7.2-11.4 4.6-17.2-2.4-5.3-27.5-19.5-49-27.8-18.8-7.2-37.2-11.9-59.8-15.1-13.4-1.9-44.4-2.6-58-1.4z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M236.8 71c-56.8 5.1-107.6 29-148.2 69.6-10.9 10.9-23.3 25.6-30.7 36.5-5.4 8-6.2 13.7-2.7 18.9 4.5 6.6 14.2 7.7 19.3 2.2 1.3-1.5 5.9-7.4 10.2-13.2 10.1-13.8 32.9-36.6 46.7-46.8 29.6-21.8 61.7-34.7 98.6-39.7 12.3-1.7 38.7-1.9 51.5-.5 60.7 6.9 116.8 38.8 150.8 85.4 4 5.5 8.6 11.4 10.3 13.2 8 8.5 21.4 2.7 21.4-9.2 0-4.9-5.1-13.3-17.8-29-30.9-38.4-79-68.4-129.8-80.9-23.6-5.8-57-8.5-79.6-6.5z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M240.5 130.1c-58 5.9-109.7 37.8-139.7 86.1-27.7 44.6-35.6 102.6-22.7 166.7 1.1 5.7 3.6 15.8 5.5 22.5 2.7 9.9 3.9 12.6 6.4 14.8 5.3 4.9 12.6 4.9 17.4.2 4.6-4.7 4.9-8.5 1.7-20.4-7.7-27.8-10.2-43.4-10.8-69.5-.6-23.8.7-36.8 5.7-55.9 15.3-59.1 60.7-102 122.7-115.8 13.4-3 49.1-3.3 62.3-.5 52.1 11.1 92.4 41.9 115.5 88.2 7.3 14.6 11.3 26.1 14.6 41.5 1.9 8.5 2.3 13.8 2.3 27.5l.1 17-3.6 7.5c-6.2 12.8-14.9 20.6-27.7 24.9-12 4.1-27.9 2-38.5-5-8.9-5.9-16.8-16.4-19.6-26.4-.6-2.2-1.6-9-2.1-15.1-1.5-17.6-6.3-30.4-15.9-42.4-9.1-11.3-20.1-19-33.2-23.5-10.9-3.6-27.7-4.6-38.4-2.1-25.8 6-47.7 28.7-54 55.9-7 30.4 3.2 75.2 25.5 112.2 13.6 22.5 34.6 44 57.5 58.8 14.9 9.6 43.9 22.4 53 23.4 3.1.4 4.8-.1 7.5-1.9 4.3-2.9 6-6.1 6-11.3 0-5.9-2.9-9.9-8.7-12-34-12.4-54.3-25-73.6-45.5-9.2-9.7-17.9-21.9-24.5-34-11.2-20.5-19.2-49.7-19.2-69.3.1-31.7 25.1-55.7 53.1-50.9 10.3 1.8 17.3 5.5 25 13.1 10.2 10.2 12.5 16.4 14.8 38.7 1.9 18.8 9.3 33.7 23.1 46.7 19.2 18.1 46.1 24 71.3 15.6 20.4-6.7 37.7-24.5 45.4-46.4 2.7-7.6 2.8-8.8 2.8-26.5 0-28.8-5.6-53.5-18-79.5-27.3-56.9-79.5-96-141.5-106-12.1-1.9-35.9-2.6-47.5-1.4z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M244.5 189c-24.6 3.2-49.5 14.2-69.4 30.7-42.7 35.5-56.5 95.9-37.5 164.9 9.3 34 26.4 67.8 46.5 91.9 13 15.6 19.6 20.2 26.5 18.9 10.8-2 13.8-17.2 4.8-24-5-3.9-17.8-19.3-24.6-29.9-12.6-19.4-24-46.2-29.6-69.5-4.7-19.2-5.6-27-5.6-46 0-20.4 2.1-32.2 8.1-47.3 12.4-30.9 41.7-54.7 76.3-61.9 7.7-1.6 12-1.9 23-1.5 16.2.6 25.5 2.8 38.9 9.3 12.8 6.1 20 11.4 30.6 22.6 17.6 18.5 27.8 42 29.1 67.3.7 12.3 1.7 15.7 5.5 18.9 6.1 5.1 14.8 3.9 19-2.6 1.9-3 2-4.3 1.5-15.3-1.1-26.2-8.3-48.4-23.1-70.6-18.1-27.2-46.8-46.6-79.5-54-9.9-2.2-30.4-3.2-40.5-1.9z"
            fill={color ?? R.colors.primaryColor}
          />
          <Path
            d="M250.2 310.4c-3.7 3.4-3.7 3.5-4.1 12.6-.8 23.2 8.8 53.7 24.4 77 6.2 9.2 20 23.4 28 28.7 21.1 14.1 44.3 20.3 75.8 20.3 23.1-.1 30.1-1 33.8-4.6 7.5-7.2 4.8-19.6-4.8-22.3-1.7-.5-6.3-.5-10.4 0-25.6 2.9-51-.6-69.4-9.5-17.2-8.5-30.1-22.3-40.1-43.1-6.9-14.3-10.2-26.8-11.3-42-.4-6.7-1.4-13.1-2-14.3-1.9-3.5-7.1-6.2-11.9-6.2-3.4 0-4.9.6-8 3.4z"
            fill={color ?? R.colors.primaryColor}
          />
        </Svg>
      );
  }
};

export default FaceID;