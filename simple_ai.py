import math
import random

# --- Helper Functions for Math ---
# We use these because we aren't using external libraries like Numpy

def sigmoid(x):
    """The activation function. turns numbers into probabilities between 0 and 1."""
    return 1 / (1 + math.exp(-x))

def sigmoid_derivative(x):
    """Used to calculate how much to adjust weights during training."""
    return x * (1 - x)

def dot_product(v1, v2):
    """Calculates the dot product of two vectors (lists)."""
    return sum(x*y for x, y in zip(v1, v2))

# --- The Neural Network Class ---

class BasicAI:
    def __init__(self):
        # Initialize weights with random values between -1 and 1
        # We have 2 inputs, 2 hidden neurons, and 1 output
        
        # Weights from Input Layer to Hidden Layer
        self.weights_input_hidden = [
            [random.uniform(-1, 1), random.uniform(-1, 1)], # Weights for Hidden Neuron 1
            [random.uniform(-1, 1), random.uniform(-1, 1)]  # Weights for Hidden Neuron 2
        ]
        
        # Weights from Hidden Layer to Output Layer
        self.weights_hidden_output = [random.uniform(-1, 1), random.uniform(-1, 1)]
        
        # Biases (extra adjustable values to help the network learn)
        self.bias_hidden = [random.uniform(-1, 1), random.uniform(-1, 1)]
        self.bias_output = random.uniform(-1, 1)

    def think(self, inputs):
        """
        Forward Propagation: Pass inputs through the network to get a prediction.
        """
        # Step 1: Calculate Hidden Layer values
        self.hidden_layer_activation = []
        for i in range(2): # For each hidden neuron
            # Sum inputs * weights + bias
            activation = dot_product(inputs, self.weights_input_hidden[i]) + self.bias_hidden[i]
            # Apply sigmoid to squash result between 0 and 1
            self.hidden_layer_activation.append(sigmoid(activation))
            
        # Step 2: Calculate Output Layer value
        output_activation = dot_product(self.hidden_layer_activation, self.weights_hidden_output) + self.bias_output
        self.final_output = sigmoid(output_activation)
        
        return self.final_output

    def train(self, inputs, expected_output):
        """
        Backpropagation: Adjust weights based on the error.
        """
        # 1. First, make a guess
        self.think(inputs)
        
        # 2. Calculate Output Error (Expected - Actual)
        output_error = expected_output - self.final_output
        # Calculate the "Delta" (how much we need to change the output)
        output_delta = output_error * sigmoid_derivative(self.final_output)
        
        # 3. Calculate Hidden Layer Error
        # How much did each hidden neuron contribute to the error?
        hidden_errors = [
            output_delta * self.weights_hidden_output[0],
            output_delta * self.weights_hidden_output[1]
        ]
        hidden_deltas = [
            hidden_errors[0] * sigmoid_derivative(self.hidden_layer_activation[0]),
            hidden_errors[1] * sigmoid_derivative(self.hidden_layer_activation[1])
        ]
        
        # 4. Update Weights and Biases (Gradient Descent)
        # Learning rate controls how fast we learn (too high is unstable, too low is slow)
        learning_rate = 0.5 
        
        # Update Hidden-to-Output weights
        for i in range(2):
            self.weights_hidden_output[i] += self.hidden_layer_activation[i] * output_delta * learning_rate
        self.bias_output += output_delta * learning_rate
        
        # Update Input-to-Hidden weights
        for i in range(2): # For each hidden neuron
            for j in range(2): # For each input
                self.weights_input_hidden[i][j] += inputs[j] * hidden_deltas[i] * learning_rate
            self.bias_hidden[i] += hidden_deltas[i] * learning_rate

# --- Main Execution Block ---

if __name__ == "__main__":
    # 1. Create the AI
    my_ai = BasicAI()
    
    print("Initial Training begins... (This takes a few seconds)")
    
    # 2. The Training Data (XOR Pattern)
    # Inputs: [0, 0] -> Expected: 0
    # Inputs: [0, 1] -> Expected: 1
    # Inputs: [1, 0] -> Expected: 1
    # Inputs: [1, 1] -> Expected: 0
    training_set = [
        ([0, 0], 0),
        ([0, 1], 1),
        ([1, 0], 1),
        ([1, 1], 0)
    ]
    
    # 3. Train loop (Practice 10,000 times)
    epochs = 10000
    for epoch in range(epochs):
        # Pick a random training example
        inputs, expected = random.choice(training_set)
        my_ai.train(inputs, expected)
        
        # Print progress every 1000 times
        if (epoch % 2000) == 0:
            print(f"Epoch {epoch}: Learning...")

    print("Training Complete!\n")

    # 4. Test the AI
    print("Testing the AI on the logic:")
    print(f"Input [0, 0] -> AI Prediction: {my_ai.think([0, 0]):.4f} (Target: 0)")
    print(f"Input [0, 1] -> AI Prediction: {my_ai.think([0, 1]):.4f} (Target: 1)")
    print(f"Input [1, 0] -> AI Prediction: {my_ai.think([1, 0]):.4f} (Target: 1)")
    print(f"Input [1, 1] -> AI Prediction: {my_ai.think([1, 1]):.4f} (Target: 0)")
    
    print("\nNote: Values close to 0 mean 'False', values close to 1 mean 'True'.")