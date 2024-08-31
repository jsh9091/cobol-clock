/*
 * MIT License
 *
 * Copyright (c) 2024 Joshua Horvath
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import clock from "clock";
import * as document from "document";
import { today as activity, minuteHistory } from "user-activity";
import { me as appbit } from "appbit";
import { battery } from "power";

// Update the clock every minute
clock.granularity = "minutes";

const dateLabel = document.getElementById("dateLabel");
const hourLabel = document.getElementById("hourLabel");
const minuteLabel = document.getElementById("minuteLabel");
const amPmLabel = document.getElementById("amPmLabel");
const stepsLabel = document.getElementById("stepsLabel");
const floorsLabel = document.getElementById("floorsLabel");
const batteryLabel = document.getElementById("batteryLabel");

battery.onchange = (charger, evt) => {
  updateBatteryLabel();
};

/**
 * Updates the GUI for battery percentage. 
 * An asterisk next to the percentage indicates that the watch is being charged. 
 */
function updateBatteryLabel() {
  if (battery.charging) {
    batteryLabel.text = battery.chargeLevel + "*.";
  } else {
    batteryLabel.text = battery.chargeLevel + ".";
  }
}

clock.ontick = (evt) => {
    updateDateField(evt);
    updateTimeGroup(evt);
    updateExerciseFields();
    updateBatteryLabel();
}

/**
 * Sets current date in GUI. 
 * @param {*} evt 
 */
function updateDateField(evt) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = dayNames[evt.date.getDay()];
  let month = monthNames[evt.date.getMonth()];
  let dayOfMonth = evt.date.getDate();
  let year = evt.date.getUTCFullYear();

  dateLabel.text =
    `${day}` + " " + `${month}` + " " + `${dayOfMonth}` + ", " + `${year}`;
}

/**
 * Updates the current time display values in GUI. 
 * @param {*} evt 
 */
function updateTimeGroup(evt) {
  // get time information from API
  let todayDate = evt.date;
  let rawHours = todayDate.getHours();

  // 12 hour format
  let hours = rawHours % 12 || 12;

  let mins = todayDate.getMinutes();
  let displayMins = zeroPad(mins);

  // display time on main clock
  hourLabel.text = `${hours}`;
  minuteLabel.text = `${displayMins}`;

  // AM / PM indicator
  amPmLabel.text = rawHours >= 12 ? '"PM".' : '"AM".';
}

/**
 * Front appends a zero to an integer if less than ten.
 * @param {*} i 
 * @returns 
 */
function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

/**
 * Updates exercise fields in the GUI. 
 */
function updateExerciseFields() {
  if (appbit.permissions.granted("access_activity")) {
    stepsLabel.text = activity.adjusted.steps;
    floorsLabel.text = activity.adjusted.elevationGain;
  } else {
    stepsLabel.text = "----";
    floorsLabel.text = "----";
  }
}
