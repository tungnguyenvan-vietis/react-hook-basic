import React, { useState, useEffect } from "react";
import useClock from "../../hooks/useClock";

Clock.propTypes = {};

function Clock() {
	const { timeString } = useClock();

	return <p style={{ fontSize: "40px" }}>{timeString}</p>;
}

export default Clock;
