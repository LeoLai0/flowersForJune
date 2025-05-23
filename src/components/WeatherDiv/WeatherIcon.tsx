import React, { useState } from 'react';

interface WeatherIconProps {
  icon: string | undefined,
}
export const WeatherIcon: React.FC<WeatherIconProps> = ({icon}) => {
  const [loaded, setLoaded] = useState<Boolean>(false);

  return (
    <div
      style={{ display: loaded ? 'block': 'none' }}
      className="col-span-1 m-auto"
    >
      <img
        src={icon}
        alt="current-weather-visual"
        onLoad={() => setLoaded(true)}
        className="h-[50px] w-[50px]"
      />
    </div>
  );
}