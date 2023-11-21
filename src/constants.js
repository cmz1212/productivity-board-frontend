import { differenceInCalendarDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const URL = process.env.REACT_APP_BACKEND_URL;

function refreshCurPage() {
  window.location.reload();
}

function changeTimeZone(date, timeZone) {
  if (!date) {
      console.warn("The date provided is null or undefined.");
      return null;
  }

  const options = {
    timeZone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  if (typeof date === 'string') {
      return new Date(date).toLocaleString('en-US', options);
  }

  return date.toLocaleString('en-US', options);
}

function getDaysDifferenceWithTimeZone(startDateString, endDateString, timeZone) {

  if (!startDateString || !endDateString || !timeZone) {
    return null;
  }

  // Convert dates to the given time zone
  const zonedStartDate = utcToZonedTime(new Date(startDateString), timeZone);
  const zonedEndDate = utcToZonedTime(new Date(endDateString), timeZone);

  // Calculate the difference in days
  const daysDifference = differenceInCalendarDays(zonedEndDate, zonedStartDate);
  const roundedDifference = parseInt(Math.round(daysDifference), 10);

  return roundedDifference;
}

const modalStyles1 = {
  content: {
    width: "475px",
    height: "550px",
    paddingBottom: '0px',
    display: "block",
    backgroundColor: "#f0f9ff",
    border: "2px solid #072f49",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const modalStyles2 = {
  content: {
      width: "450px",
      height: "540px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#f0f9ff",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
  },
};

const modalStyles3 = {
  content: {
      width: "640px",
      height: "420px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#f0f9ff",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflowY: 'auto',
  },
};

const modalStyles4 = {
  content: {
      width: "853px",
      height: "730px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#f0f9ff",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: '0.93em',
      overflowY: 'auto',
  },
};

const modalStyles5 = {
  content: {
      width: "490px",
      height: "490px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#f0f9ff",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: '0.93em'
  },
};

const modalStyles6 = {
  content: {
      width: "410px",
      height: "490px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#f0f9ff",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
  },
};

export { URL, refreshCurPage, changeTimeZone, getDaysDifferenceWithTimeZone, modalStyles1, modalStyles2, modalStyles3, modalStyles4, modalStyles5, modalStyles6 };