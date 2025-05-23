import React from 'react';

interface WeatherMessageProps {
  message: string,
}

export const WeatherMessage: React.FC<WeatherMessageProps> = ({message}) => {
  return(
    <div className="text-xs font-light text-black/50 tracking-wide">
      {message}
    </div>
  )
}