import * as tf from '@tensorflow/tfjs';

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

class AntColonyOptimizer {
  private numCities: number;
  private pheromones: number[][];
  private distances: number[][];
  private numAnts: number;
  private iterations: number;
  private alpha: number;
  private beta: number;
  private evaporationRate: number;

  constructor(
    distances: number[][],
    numAnts: number,
    iterations: number,
    alpha: number,
    beta: number,
    evaporationRate: number,
  ) {
    this.distances = distances;
    this.numCities = distances.length;
    this.pheromones = Array.from({ length: this.numCities }, () => Array(this.numCities).fill(1));
    this.numAnts = numAnts;
    this.iterations = iterations;
    this.alpha = alpha;
    this.beta = beta;
    this.evaporationRate = evaporationRate;
  }

  public run() {
    let bestPath: number[] = [];
    let bestDistance = Infinity;

    for (let iteration = 0; iteration < this.iterations; iteration++) {
      const paths: number[][] = [];
      const distances: number[] = [];

      for (let ant = 0; ant < this.numAnts; ant++) {
        const path = this.buildPath();
        const distance = this.calculateDistance(path);

        paths.push(path);
        distances.push(distance);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestPath = path;
        }
      }

      this.updatePheromones(paths, distances);
    }

    console.log(`Best Path: ${bestPath}`);
    console.log(`Best Distance: ${bestDistance}`);
  }

  private buildPath(): number[] {
    const visited = Array(this.numCities).fill(false);
    const path: number[] = [];
    let currentCity = Math.floor(Math.random() * this.numCities);
    path.push(currentCity);
    visited[currentCity] = true;

    for (let i = 1; i < this.numCities; i++) {
      const nextCity = this.selectNextCity(currentCity, visited);
      path.push(nextCity);
      visited[nextCity] = true;
      currentCity = nextCity;
    }

    return path;
  }

  private selectNextCity(currentCity: number, visited: boolean[]): number {
    const probabilities: number[] = [];

    for (let city = 0; city < this.numCities; city++) {
      if (!visited[city]) {
        const pheromone = Math.pow(this.pheromones[currentCity][city], this.alpha);
        const heuristic = Math.pow(1 / this.distances[currentCity][city], this.beta);
        probabilities[city] = pheromone * heuristic;
      } else {
        probabilities[city] = 0;
      }
    }

    const total = probabilities.reduce((sum, prob) => sum + prob, 0);
    const randomValue = Math.random() * total;

    let cumulative = 0;
    for (let city = 0; city < this.numCities; city++) {
      cumulative += probabilities[city];
      if (cumulative >= randomValue) {
        return city;
      }
    }
    return 0; // Fallback
  }

  private calculateDistance(path: number[]): number {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += this.distances[path[i]][path[i + 1]];
    }
    distance += this.distances[path[path.length - 1]][path[0]]; // Return to start
    return distance;
  }

  private updatePheromones(paths: number[][], distances: number[]) {
    // Evaporate pheromones
    for (let i = 0; i < this.numCities; i++) {
      for (let j = 0; j < this.numCities; j++) {
        this.pheromones[i][j] *= 1 - this.evaporationRate;
      }
    }

    // Add pheromones based on paths
    for (let i = 0; i < this.numAnts; i++) {
      const path = paths[i];
      const distance = distances[i];

      for (let j = 0; j < path.length - 1; j++) {
        const cityA = path[j];
        const cityB = path[j + 1];
        this.pheromones[cityA][cityB] += 1 / distance;
        this.pheromones[cityB][cityA] += 1 / distance; // Symmetric
      }
      // Return to start
      const cityA = path[path.length - 1];
      const cityB = path[0];
      this.pheromones[cityA][cityB] += 1 / distance;
      this.pheromones[cityB][cityA] += 1 / distance; // Symmetric
    }
  }
}

// Example distance matrix (symmetric)
const distances = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
];

const aco = new AntColonyOptimizer(distances, 10, 1000, 1, 5, 0.5);
aco.run();
