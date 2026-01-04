import secrets
import string

# --- Expanded Word Pools (100 words each) ---
ADJECTIVES = [
    "Able", "Acid", "Aged", "Agile", "Ajar", "Alert", "Alive", "Amber", "Angry", "Arid",
    "Azure", "Bare", "Basic", "Black", "Blond", "Blue", "Bold", "Bony", "Brave", "Brief",
    "Bright", "Broad", "Brown", "Calm", "Cheap", "Chief", "Clean", "Clear", "Cold", "Cool",
    "Curly", "Damp", "Dark", "Dead", "Deep", "Dense", "Dim", "Dirty", "Dizzy", "Dry",
    "Dull", "Dusty", "Eager", "Early", "Easy", "Elite", "Empty", "Even", "Fair", "Fancy",
    "Fast", "Fat", "Fine", "Firm", "Flat", "Foul", "Fresh", "Full", "Funny", "Glad",
    "Gold", "Good", "Grand", "Gray", "Great", "Green", "Grey", "Grim", "Hard", "Hasty",
    "Heavy", "High", "Hollow", "Hot", "Huge", "Icy", "Inane", "Ivory", "Jolly", "Kind",
    "Large", "Last", "Late", "Lean", "Light", "Limp", "Lively", "Long", "Loud", "Low",
    "Lucky", "Mad", "Mean", "Meek", "Mellow", "Mild", "Minty", "Moist", "Mute", "Near"
]

NOUNS = [
    "Actor", "Apple", "Area", "Army", "Atom", "Aunt", "Ball", "Bank", "Base", "Bird",
    "Boat", "Book", "Box", "Boy", "Bread", "City", "Cloud", "Coin", "Corn", "Crow",
    "Cup", "Desk", "Dog", "Door", "Dot", "Drum", "Duck", "Dust", "Ear", "Edge",
    "Egg", "End", "Eye", "Face", "Fact", "Farm", "Fear", "Feet", "Fire", "Fish",
    "Flag", "Food", "Foot", "Fork", "Frog", "Game", "Gas", "Gate", "Girl", "Goat",
    "Gold", "Hair", "Hand", "Hat", "Hill", "Home", "Hope", "Horn", "Horse", "Host",
    "Hour", "Ice", "Idea", "Iron", "Item", "Jar", "Job", "Key", "Knee", "Knife",
    "Lake", "Lamp", "Leaf", "Leg", "Life", "Line", "List", "Log", "Luck", "Map",
    "Meal", "Meat", "Mile", "Milk", "Mind", "Mist", "Moon", "Name", "Neck", "Net",
    "News", "Night", "Node", "Noise", "Note", "Oil", "Page", "Park", "Path", "Pear"
]

VERBS = [
    "Acts", "Adds", "Asks", "Bake", "Beats", "Begs", "Bends", "Bite", "Blows", "Boils",
    "Burns", "Buys", "Calls", "Chew", "Chops", "Claps", "Clean", "Climb", "Cooks", "Cuts",
    "Dash", "Digs", "Dips", "Does", "Draws", "Drink", "Drive", "Drops", "Eats", "Ends",
    "Falls", "Feeds", "Feels", "Fills", "Finds", "Fits", "Flies", "Gave", "Gets", "Gives",
    "Goes", "Grows", "Hangs", "Has", "Hears", "Helps", "Hides", "Hits", "Holds", "Hops",
    "Hugs", "Jumps", "Keeps", "Kicks", "Kills", "Knit", "Knows", "Lasts", "Laugh", "Leads",
    "Leaps", "Learns", "Left", "Lends", "Lets", "Lifts", "Likes", "Lives", "Looks", "Loves",
    "Makes", "Means", "Meets", "Melts", "Moves", "Needs", "Nods", "Opens", "Owns", "Picks",
    "Plays", "Pulls", "Puts", "Quits", "Races", "Reads", "Rests", "Rides", "Rings", "Rise",
    "Runs", "Says", "Sees", "Sells", "Sends", "Sets", "Sings", "Sits", "Skips", "Sleeps"
]

ADVERBS = [
    "Aloft", "Anew", "Away", "Badly", "Barely", "Below", "Briefy", "Bright", "Calmly", "Cheaply",
    "Cleanly", "Clear", "Close", "Daily", "Deeply", "Dimly", "Direct", "Duly", "Early", "Easily",
    "Evenly", "Fairly", "Far", "Fast", "Firmly", "First", "Fondly", "Fully", "Gently", "Gladly",
    "Greatly", "Hardly", "Highly", "Hourly", "Inward", "Justly", "Kindly", "Lastly", "Lately", "Lighty",
    "Loosly", "Loudly", "Lowly", "Mainly", "Meekly", "Merely", "Mildly", "Mostly", "Nearly", "Neatly",
    "Newly", "Nicely", "Nightly", "Noble", "Noisy", "Often", "Only", "Openly", "Oraly", "Out",
    "Partly", "Past", "Plain", "Poorly", "Prior", "Purely", "Quickly", "Quiet", "Rarely", "Readily",
    "Really", "Right", "Rough", "Rudely", "Sadly", "Safe", "Scant", "Sharp", "Short", "Shrill",
    "Silly", "Simply", "Slowly", "Small", "Smooth", "Softly", "Soon", "Sound", "Stiff", "Still",
    "Sure", "Sweet", "Tamely", "Thinly", "Third", "Tidy", "Tight", "Today", "Truly", "Twice"
]

def generate_strong_memorable_password():
    # Pick one word from each category using secrets (cryptographically secure)
    phrase_parts = [
        secrets.choice(ADJECTIVES),
        secrets.choice(NOUNS),
        secrets.choice(VERBS),
        secrets.choice(ADVERBS)
    ]
    
    # Join with a separator
    passphrase = "-".join(phrase_parts)
    
    # Add complexity for modern site requirements
    number = secrets.randbelow(90) + 10 # Random number between 10-99
    symbol = secrets.choice("!@#$%^&*")
    
    return f"{passphrase}{number}{symbol}"

# --- Generate 5 examples ---
print("--- YOUR NEW SECURE PASSWORDS ---")
for _ in range(5):
    print(generate_strong_memorable_password())