/* eslint-disable */

import { dateEl } from './variables.js';
import { DateTime } from './luxon.js';

const displayDate = () => {
  const currentDate = DateTime.now();
  dateEl.innerHTML = currentDate.toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS
  );
};
export { displayDate };
