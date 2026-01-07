
const dotenv = require("dotenv")
    // requires dotenv package

dotenv.config()
    // loads environment variables from .env file

const mongoose = require("mongoose")
    // imports mongoose library

const Part = require("./models/part.js")
    // imports the part model to this file

const prompt = require('prompt-sync')()
// imports the prompt-sync package

// ____________________________________________________________________

mongoose.connect(process.env.MONGODB_URI)
    // connects to the database using secret string from .env file

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
    // logs connection status to terminal on start; an event listener

// ____________________________________________________________________

console.log(`Welcome to the Warehouse Management Service`)
console.log(``)

const displayActions = async () => {
    while (true) {
        console.log(`Please select an action from below (1-5)`)
        console.log(``)
        console.log(`1. Create a part`)
        console.log(`2. View all parts`)
        console.log(`3. Update a part`)
        console.log(`4. Delete a part`)
        console.log(`5. Quit the service`)
        console.log(``)
        const action = prompt(`Which action (#) shall we complete today?`)

            // A while-true loop will allow continuous execution of this program
            // until the manager decides to select 'quit'.


        switch (action) {

            case `1`:

                const partData = {
                    name: prompt(`Part name: `),
                    qty: prompt(`Part qty: `),
                }

                const part = await Part.create(partData)
                console.log(`New part: `, part)

                break

            // Case 1 allows the manager to create new parts in the database.
            // ** note that part IDs are generated automatically **


            case `2`:

                const allParts = await Part.find({})
                console.log(`These are all the parts in inventory: `)
                console.log(``)
                console.log(allParts)
                break 

            // Case 2 is a simple option to list all parts currently stored in the database.


            case `3`:

                const updateID = prompt(`Enter your part's ID to update: `)
                const updatedPart = await Part.findByIdAndUpdate(
                    updateID,
                    {
                        name: prompt(`Update part name here: `),
                        qty: prompt(`Update part qty here: `)
                    },
                    {new: true}
                )
                console.log(`This part, ${updatedPart}, has been updated.`)
                break

            // Case 3 allows the manager to update part info via ID.


            case `4`: 

                const deleteID = prompt(`To delete a part, enter its ID here: `)
                const deletedPart = await Part.findByIdAndDelete(deleteID)

                if (deletedPart) {
                    console.log(`This part, ${deletedPart}, has been deleted.`)

                } else {
                    console.log(`This ID does not match an existing part.`)
                }
                break

            // Case 4 allows the manager to delete parts from the database via ID.


            case `5`: 

                await mongoose.disconnect()
                console.log(`You are now exiting the Warehouse Management System.`)
                return

            // Case 5 quits the app. 


            default: 

                console.log(`This database only recognizes actions 1-5.`)
                console.log(`Please enter a valid number: 1-5.`)
            
            // // The catch-all option which informs the manager 
            // // that an invalid action number has been selected.


        }
    }
}

displayActions()

// calls the main function