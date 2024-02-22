export function parseLinearGradient(linearGradient) {
  const angleRegex = /linear-gradient\((\d+deg)/;
  const rgbaRegex = /rgba?\((\d+\.?\d*),\s?(\d+\.?\d*),\s?(\d+\.?\d*),?\s?(\d*\.?\d+)?\)\s+(\d*\.?\d+)%/g;
  const hexRegex = /#([a-f0-9]{6}|[a-f0-9]{3})\s+(\d*\.?\d+)%/ig;

  let match;
  const colorStops = [];
  let angleInDegrees = 0; // Default angle in degrees

  // Extracting angle in degrees
  const angleMatch = angleRegex.exec(linearGradient);
  if (angleMatch) {
    angleInDegrees = parseFloat(angleMatch[1]); // Remove 'deg' and convert to number
  }

  // Convert angle from degrees to radians
  // Convert angle from degrees to radians and adjust for inversion
let angleInRadians = (angleInDegrees + 270) * (Math.PI / 180); // Add 180 degrees to rotate

// Ensure the angle stays within the 0 to 2π range
angleInRadians = angleInRadians % (2 * Math.PI);

  // Extracting color stops
  while ((match = rgbaRegex.exec(linearGradient)) !== null) {
    const color = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${match[4] ?? 1})`;
    const position = parseFloat(match[5]) / 100; // Convert percentage to decimal
    colorStops.push({ offset: position, color });
  }

  while ((match = hexRegex.exec(linearGradient)) !== null) {
    const color = `#${match[1]}`;
    const position = parseFloat(match[2]) / 100; // Convert percentage to decimal
    colorStops.push({ offset: position, color });
  }

  // Set default stops if none are available
  if (colorStops.length === 0) {
    colorStops.push({ offset: 0, color: 'red' });
    colorStops.push({ offset: 1, color: 'blue' });
  }

  return {
    stops: colorStops,
    angle: angleInRadians
  };
}
