"use client";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div>
      <CountUp
        decimals={2}
        prefix="$"
        duration={2.75}
        separator=","
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
