# Capstone Project 1

Fetch current weather forecast in any US city of up to 7 days in advance, with the default being Huntsville Alabama
where the largest NASA center is located!

## Setup instructions

1. Clone the repo using ``git clone https://github.com/maxpeterkaya/capstone_project1``.
2. Install all dependencies by running ``pnpm i``, or ``npm install`` if you're just using npm.
3. Run the project by executing ``npm run dev``.

## APIs Used

The API that is being utilized is [open-meteo](https://open-meteo.com/).

- ``https://api.open-meteo.com/v1/forecast`` is used for retrieving weather data based on coordinate location.
- ``https://geocoding-api.open-meteo.com/v1/search`` is used to retrieve the coordinates of a user-input city in the US.
  The API supports a number of other countries but due to project simplicity I chose to avoid the extra user-input for
  ease of use.

## Challenges

Designing the flow of elements and trying to organize everything neatly to look polished. I've usually always had luck
with setting dark mode through the ``dark`` class with TailwindCSS but it just wouldn't work at all, maybe because this
time I'm not using a component library.