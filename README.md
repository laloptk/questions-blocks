=== ESNext ===
Contributors: Eduardo Sanchez
Tags: block
Tested up to: 5.7.0
Stable tag: 0.0.2
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Questions and Answers plugin

## Description

This is a WordPress plugin that is still in the making. The plan is to create several question and answer blocks. The editor should be able to place questions with a respective right answer, and the user should be able to respond to those questions in the frontend of the website.

The planned blocks, until now, are the following:

1. True or false question
1. Multiple choice (with a single answer) question
1. Multiple choice (with several answers) question
1. "Fill the blank spaces" question
1. Question from an image, video or document (This might be redundand because we can give the option to place a media file to all questions)

**NOTE**: This plugin will probably have more block types than the described above.

The code for the backend part of the blocks is ready, in the front end, only the True/False block is vailable for the moment.

## Planned development phases

In this first phase of the development of the plugin, there will not be an interaction with the database. The idea is to create the question blocks first and make them availeble for the editors to create posts or pages where they can quizz people in general with no need for the user to be logged in to answer the questions.

In a second phase, a custom post type will be created to allow editors to build quizzes or even simple surveys. That CPT will only allow the most basic core blocks (Headings and paragraphs, maybe blockquotes) and also all the question blocks. In this phase, a new block will be created, and that block will extract the questions blocks from a CPT and insert all those blocks elsewhere in the website (pages, posts or other CPT's).

The third phase will connect the blocks with the database: When a logged in user answers a quizz or a survey, the answers will be saved in the database so the admin of the website can see who answered what. Also a system for evaluating the accuracy of the user responding answers will be created. I haven't decided yet if the information will be stored in the users meta or in a new database table.

## TO DO (first phase)

1. ~~Refactor the "True or false" block (The Edit.js and frontend.js) to extract reusable functions and components, and make those components and function available to the other blocks.~~
1. ~~Check and improve the architecture of the plugin. I'm happy with the current architecture, but there is some inconsistencies and other things that can be better.~~
1. ~~Once 1 and 2 are ready, start building the other question blocks.~~
1. Write the code for the front end part of the blocks

## Installation

As said before, the plugin is in the making but you can install it and the "True or false" block will work.

1. Upload the plugin files to the `/wp-content/plugins/questions-and-answers` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

## Start development

Once the plugin is installed, you only need to go to the plugin's root folder (in the terminal) and run `npm i` followed by `npm start`.
