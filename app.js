// Debug line, for having certain aspects logged to console durng development
const debug = false;

// Import third party modules
const inquirer = require("inquirer");

// Import local modules
const {
    Cat,
    Dog,
    Parrot,
    Dragon,
    Dolphin,
} = require("./cyberPet");

// Array for typeOfPetInquirer, should be analogous
// to the imported pets from the cyberPet module above
potentialPets = [{
        key: "A",
        name: "Cat",
        value: "cat",
    },
    {
        key: "B",
        name: "Dog",
        value: "dog",
    },
    {
        key: "C",
        name: "Parrot",
        value: "parrot",
    },
    {
        key: "D",
        name: "Dragon",
        value: "dragon",
    },
    {
        key: "E",
        name: "Dolphin",
        value: "dolphin",
    },
]

try {
    let myPet = "";
    let options = [];

    const start = async (callback) => {
        //Create first inquirer prompt, to set the type of pet
        const typeOfPet = await inquirer.prompt({
            type: "list",
            name: "typeOfPet",
            message: "What kind of pet would you like?",
            choices: potentialPets
        });
        // Output of above:
        // { typeOfPet: 'cat' }
        // or
        // { typeOfPet: 'dog' }
        // Two ways to access this: typeOfPet["typeOfPet"] 
        // or
        // typeOfPet.typeOfPet

        if (debug) {
            console.log(typeOfPet)
        }

        // Create second inquirer prompt, to set the name of the pet
        const petName = await inquirer.prompt({
            type: "input",
            name: "nameOfPet",
            message: `What are you going to call your new ${typeOfPet.typeOfPet}?`,
        });

        // Check the type of pet and create new pet based on result
        if (typeOfPet.typeOfPet === "cat") {
            myPet = new Cat(petName.nameOfPet);
            options = [{
                    key: "A",
                    name: "Give Food",
                    value: "feed"
                },
                {
                    key: "B",
                    name: "Give Water",
                    value: "water",
                },
                {
                    key: "C",
                    name: "Play with Wool",
                    value: "playWool"
                },
                {
                    key: "D",
                    name: "Let Sleep",
                    value: "sleep",
                }
            ];
        } else if (typeOfPet.typeOfPet === "dog") {
            myPet = new Dog(petName.nameOfPet);
            options = [{
                    key: "A",
                    name: "Give Food",
                    value: "feed"
                },
                {
                    key: "B",
                    name: "Give Water",
                    value: "water",
                },
                {
                    key: "C",
                    name: "Play Ball",
                    value: "playBall"
                },
                {
                    key: "D",
                    name: "Walk",
                    value: "walk",
                }
            ];
        } else if (typeOfPet.typeOfPet === "parrot") {
            myPet = new Parrot(petName.nameOfPet);
            options = [{
                    key: "A",
                    name: "Give Food",
                    value: "feed"
                },
                {
                    key: "B",
                    name: "Give Water",
                    value: "water",
                },
                {
                    key: "C",
                    name: "Let Fly",
                    value: "fly"
                },
                {
                    key: "D",
                    name: "Give Puzzle",
                    value: "puzzle",
                }
            ];
        } else if (typeOfPet.typeOfPet === "dragon") {
            myPet = new Dragon(petName.nameOfPet);
            options = [{
                    key: "A",
                    name: "Give Food",
                    value: "feed"
                },
                {
                    key: "B",
                    name: "Give Water",
                    value: "water",
                },
                {
                    key: "C",
                    name: "Ride",
                    value: "ride"
                },
                {
                    key: "D",
                    name: "Horde Gold",
                    value: "gold",
                }
            ];
        } else if (typeOfPet.typeOfPet === "dolphin") {
            myPet = new Dolphin(petName.nameOfPet);
            options = [{
                    key: "A",
                    name: "Give Food",
                    value: "feed"
                },
                {
                    key: "B",
                    name: "Give Water",
                    value: "water",
                },
                {
                    key: "C",
                    name: "Let Swim in the Sea",
                    value: "swim"
                },
                {
                    key: "D",
                    name: "Perform Tricks",
                    value: "tricks",
                }
            ];
        }
        timer()

        callback(game)
    }

    const restartGame = () => {
        // Placeholder function for the moment, while I work out how to implement this properly
        myPet = "";
        options = [];
        start();
    }
    const timer = async () => {
        // Timer: Every minute, decrease the pets stats
        await setInterval(() => {
            if (!myPet.decreaseStats()) {
                // This is a placeholder for the moment, as I would like to offer the end user an option to restart the game
                console.log(`${myPet.name}'s health has gotten too low, we're taking them away.`);
                process.exit(0)
            }
        }, 60000);

    }

    const game = async (callback) => {
        const activity = await inquirer.prompt({
            type: "list",
            name: "whatActivity",
            message: `What do you want to do with ${myPet.name}?`,
            choices: options,
        });

        if (debug) {
            console.log(activity.whatActivity)
            console.log(options);
        }

        // Check what activity was chosen.
        switch (activity.whatActivity) {
            case "feed":
                myPet.eat();
                break;
            case "drink":
                myPet.drink();
                break;
            case "playWool":
                myPet.playWool();
                break;
            case "sleep":
                myPet.sleep();
                break;
            case "playBall":
                myPet.playBall();
                break;
            case "walk":
                myPet.walk();
                break;
            case "fly":
                myPet.fly();
                break;
            case "puzzle":
                myPet.puzzle();
                break;
            case "gold":
                myPet.gold();
                break;
            case "ride":
                myPet.ride();
                break;
            case "swim":
                myPet.swim();
                break;
            case "tricks":
                myPet.tricks();
                break;

        }


        callback(game)
    }

    start(game);

} catch (error) {
    console.log("Error fetching data! ", error)
}