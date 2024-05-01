export function range(start, end, step = 1) {
  const seq = [];
  
  for (let i = start; i < end; i += step) {
    seq.push(i);
  }
  
  return seq;
}