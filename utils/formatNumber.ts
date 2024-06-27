export function fnum(x: number) {
  if (x < 1000000000) {
    return (x / 1000000).toFixed(2) + "Mn";
  } else if (x < 1000000000000) {
    return (x / 1000000000).toFixed(2) + "Bn";
  } else return (x / 1000000000).toFixed(2) + "Bn";
}
