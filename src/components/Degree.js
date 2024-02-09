function Degree({ tempValue, unit, unitPosition }) {
  return (
    <div className="flex flex-row items-end font-light">
      <span>
        {tempValue}°
        <span
          style={{
            left: { unitPosition },
            fontSize: '50%',
          }}
          className={`opacity-50 relative `}
        >
          {unit}
        </span>
      </span>
    </div>
  );
}

export default Degree;
