import { geolocationValidate } from "../component/Geolocation/geolocationValidate"

test.each([
  {
    data: "51.50851, -0.12572",
    expected: '[51.50851, -0.12572]',
  },
  {
    data: "51.50851,-0.12572",
    expected: '[51.50851, -0.12572]',
  },
  {
    data: "[51.50851, -0.12572]",
    expected: '[51.50851, -0.12572]'
  },
])("correct working of function parseCoordinates", ({ data, expected }) => {
  expect(geolocationValidate(data)).toEqual(expected);
});