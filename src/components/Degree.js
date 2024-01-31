function WeatherTemperatureIcon({
  tempValue,
  unit,
  iconNumber,
  iconHeight,
  iconWidth,
  tempValueTextSize,
  unitPosition,
  imgStyles,
  tempValueStyles,
}) {
  return (
    <div className="flex flex-row items-end">
      <img
        style={imgStyles}
        className={`h-[${iconHeight}] w-[${iconWidth}]`}
        src={`https://www.accuweather.com/images/weathericons/${iconNumber}.svg`}
      />
      <div style={tempValueStyles} className={`text-[${tempValueTextSize}]`}>
        <span>
          {tempValue}°
          <span
            className={`opacity-50 text-[${tempValueTextSize}] relative left-[${unitPosition}]`}
          >
            {unit}
          </span>
        </span>
      </div>
    </div>
  );
}

export default WeatherTemperatureIcon;
