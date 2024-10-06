import * as tf from '@tensorflow/tfjs';

const greeting: string = 'Hello, TypeScript with Node.js and Yarn!';
console.log(greeting);

// Create a 3D tensor (2x2x2)
const tensor3d = tf.tensor3d([
  [
    [1, 2],
    [3, 4],
  ],
  [
    [5, 6],
    [7, 8],
  ],
]);

// Print the 3D tensor
tensor3d.print(); // Output: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
