import { differenceInCalendarDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const URL = process.env.REACT_APP_BACKEND_URL;

const customStyles = {
    content: {
      width: "500px",
      height: "600px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#b9e6fd",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

const customStyles2 = {
  content: {
      width: "500px",
      height: "700px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#b9e6fd",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
  },
};

const customStyles3 = {
  content: {
      width: "750px",
      height: "420px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#b9e6fd",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
  },
};

const customStyles4 = {
  content: {
      width: "800px",
      height: "700px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#b9e6fd",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: '0.93em'
  },
};

const customStyles5 = {
  content: {
      width: "800px",
      height: "500px",
      paddingBottom: '0px',
      display: "block",
      backgroundColor: "#b9e6fd",
      border: "2px solid #072f49",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: '0.93em'
  },
};

function changeTimeZone(date, timeZone) {
  if (!date) {
      console.warn("The date provided is null or undefined.");
      return null; // or return a default value if desired
  }

  const options = {
      timeZone,
      day: '2-digit',   // display day in 2-digit format
      month: 'short',   // display month in short form (e.g., "Jan")
      year: 'numeric',  // display year in full form (e.g., "2023")
      hour: '2-digit',   // display hour in 2-digit format
      minute: '2-digit', // display minute in 2-digit format
      hour12: true,      // use AM/PM format
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

  return daysDifference;
}

function refreshCurPage() {
  window.location.reload();
}

export { URL, customStyles, customStyles2, customStyles3, customStyles4, customStyles5, changeTimeZone, getDaysDifferenceWithTimeZone, refreshCurPage };