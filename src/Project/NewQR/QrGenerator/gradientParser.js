export function parseLinearGradient(gradientString) {
  // Regex patterns to identify gradient types and properties
  const linearAngleRegex = /linear-gradient\((\d+deg)/;
  const radialRegex = /radial-gradient\(/;
  const rgbaRegex = /rgba?\((\d+\.?\d*),\s?(\d+\.?\d*),\s?(\d+\.?\d*),?\s?(\d*\.?\d+)?\)\s+(\d*\.?\d+)%/g;
  const hexRegex = /#([a-f0-9]{6}|[a-f0-9]{3})\s+(\d*\.?\d+)%/ig;

  let match;
  const colorStops = [];
  let angleInDegrees = 0; // Default angle in degrees for linear gradients
  let angleInRadians = 0;
  let type = 'linear'; // Default gradient type

  // Detect gradient type
  if (radialRegex.test(gradientString)) {
    type = 'radial';
  } else if (linearAngleRegex.test(gradientString)) {
    type = 'linear';
    // Extracting angle in degrees for linear gradients
    const angleMatch = linearAngleRegex.exec(gradientString);
    if (angleMatch) {
      angleInDegrees = parseFloat(angleMatch[1]); // Convert to number
      // Convert angle from degrees to radians and adjust for inversion
      angleInRadians = (angleInDegrees + 270) * (Math.PI / 180); // Adjust angle if needed
      // Ensure the angle stays within the 0 to 2π range
      angleInRadians = angleInRadians % (2 * Math.PI);
    }
  }

  // Extracting color stops
  while ((match = rgbaRegex.exec(gradientString)) !== null) {
    const color = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${match[4] ?? 1})`;
    const position = parseFloat(match[5]) / 100; // Convert percentage to decimal
    colorStops.push({ offset: position, color });
  }

  while ((match = hexRegex.exec(gradientString)) !== null) {
    const color = `#${match[1]}`;
    const position = parseFloat(match[2]) / 100; // Convert percentage to decimal
    colorStops.push({ offset: position, color });
  }

  // Set default stops if none are available
  if (colorStops.length === 0) {
    colorStops.push({ offset: 0, color: 'red' });
    colorStops.push({ offset: 1, color: 'blue' });
  }

  // Return the gradient data including the type
  return {
    type: type,
    stops: colorStops,
    angle: type === 'linear' ? angleInRadians : undefined // Only return angle for linear gradients
  };
}