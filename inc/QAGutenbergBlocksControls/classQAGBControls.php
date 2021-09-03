<?php

class QAndAFrontEndControls {
    // As argument, we need a path to the main block js file to register the block
    // We need a callback function to add to the registration (for every block)
        // The callback function needs attributes as arguments to render the initial markup in the frontend (with its respective dataset)
        // It might be good to place a permissions callback (Might not be necesary in this phase, since no user can modify the DB yet)
    // We need to register a rest route, but that might be a part of another class (all blocks in one?)
        // The rest toute needs a callback to know what content to render when called
        // Is optional, but we can localize the route to make things easier for future development
}