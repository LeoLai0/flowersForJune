import React from 'react';
interface WeatherTempProps {
  current_temperature: number | undefined,
  min_temperature: number | undefined,
  max_temperature: number | undefined,
}

export const WeatherTemp: React.FC<WeatherTempProps> = ({ 
  current_temperature,
  min_temperature,
  max_temperature,
}) => {
  return (
    <div className="text-xl font-medium leading-none flex flex-row items-end">
      <div>
        {current_temperature}°c &nbsp;
      </div>
      <div className="text-xs text-black/40">
        (Min: {min_temperature}°c | Max: {max_temperature}°c)
      </div>
    </div>
  )
}