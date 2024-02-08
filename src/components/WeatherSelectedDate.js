function WeatherDaybyDay() {
  return (
    <>
      <div className="bg-white shadow-sm p-[12px]  w-[632px] m-8">
        <div className="border-b-[1px] flex flex-row justify-between pb-2">
          <p className="text-[14px] opacity-[0.6] bottom-3">Day</p>
          <p className="opacity-[0.6] text-{14px}">2/1</p>
        </div>

        <div className="flex flex-row gap-2 items-center text-[84px] ">
          <img
            className={`h-[88px] w-[88px]`}
            src={`https://www.accuweather.com/images/weathericons/${3}.svg`}
          />
          12
        </div>

        <p className="align-bottom">cloudy</p>
      </div>

      <div className="bg-white shadow-sm p-[12px]  w-[632px] m-8">
        <div className="border-b-[1px] flex flex-row justify-between pb-2">
          <p className="text-[14px] opacity-[0.6] bottom-3">Night</p>
          <p className="opacity-[0.6] text-{14px}">2/1</p>
        </div>

        <div className="flex flex-row gap-2 items-center text-[84px] ">
          <img
            className={`h-[88px] w-[88px]`}
            src={`https://www.accuweather.com/images/weathericons/${3}.svg`}
          />
          14
        </div>

        <p className="align-bottom"> Rainy</p>
      </div>
    </>
  );
}

export default WeatherDaybyDay;
